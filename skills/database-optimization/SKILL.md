# Database Optimization Skill

**Status:** Active | **Domain:** High-Performance Databases

---

## Indexing Strategies

### Index Types
```sql
-- B-Tree (default) - good for equality and range queries
CREATE INDEX idx_users_email ON users(email);

-- Partial index - only index active users
CREATE INDEX idx_active_users ON users(created_at) WHERE status = 'active';

-- Composite index - order matters!
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- GIN index - for JSONB, arrays, full-text search
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- BRIN index - for large, naturally ordered tables
CREATE INDEX idx_logs_timestamp ON logs USING BRIN(created_at);
```

### Index Best Practices
```sql
-- EXPLAIN ANALYZE to check query plans
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE user_id = 123 
AND created_at > '2024-01-01';

-- Covering index (includes all columns needed)
CREATE INDEX idx_orders_covering ON orders(user_id, created_at) 
INCLUDE (total, status);

-- Remove unused indexes
SELECT 
  schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes 
WHERE idx_scan = 0 
AND indexrelname NOT LIKE 'pg_toast%'
ORDER BY pg_relation_size(indexrelid) DESC;
```

---

## Query Optimization

### N+1 Problem Solutions
```typescript
// BAD: N+1 queries
const users = await db.users.findAll();
for (const user of users) {
  user.orders = await db.orders.findByUserId(user.id); // N queries!
}

// GOOD: Single JOIN query
const usersWithOrders = await db.query(`
  SELECT u.*, o.id as order_id, o.total
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.id
  WHERE u.status = 'active'
`);

// GOOD: Bulk fetch with IN clause
const userIds = users.map(u => u.id);
const orders = await db.orders.findByUserIds(userIds); // 1 query
const ordersByUser = groupBy(orders, 'user_id');
```

### Pagination Strategies
```typescript
// Offset pagination (slow on large tables)
const page1 = await db.query(`
  SELECT * FROM orders 
  ORDER BY created_at DESC 
  LIMIT 20 OFFSET 0
`);

const page2 = await db.query(`
  SELECT * FROM orders 
  ORDER BY created_at DESC 
  LIMIT 20 OFFSET 20  -- Gets slower as offset grows!
`);

// Cursor pagination (fast, consistent)
const page1 = await db.query(`
  SELECT * FROM orders 
  WHERE created_at <= $1
  ORDER BY created_at DESC, id DESC
  LIMIT 20
`, [cursor]);

// Last item's created_at becomes next cursor
const nextCursor = page1[page1.length - 1]?.created_at;
```

### Query Refactoring
```sql
-- BAD: SELECT *
SELECT * FROM users WHERE status = 'active';

-- GOOD: Only needed columns
SELECT id, email, name FROM users WHERE status = 'active';

-- BAD: Functions on indexed columns (prevents index usage)
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- GOOD: Index the expression or use case-insensitive collation
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- BAD: OR conditions
SELECT * FROM orders WHERE user_id = 1 OR status = 'pending';

-- GOOD: UNION ALL
SELECT * FROM orders WHERE user_id = 1
UNION ALL
SELECT * FROM orders WHERE status = 'pending';
```

---

## Connection Management

### Pool Configuration
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  // Core settings
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  
  // Pool sizing (adjust based on your workload)
  min: 5,           // Always keep 5 connections ready
  max: 20,          // Maximum 20 connections
  
  // Timeouts
  connectionTimeoutMillis: 2000,  // Fail fast if can't connect
  idleTimeoutMillis: 30000,       // Close idle connections after 30s
  
  // Health check
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
});

// Monitor pool
pool.on('connect', () => console.log('New client connected'));
pool.on('acquire', () => console.log('Client acquired from pool'));
pool.on('remove', () => console.log('Client removed from pool'));

// Graceful shutdown
process.on('SIGTERM', async () => {
  await pool.end();
});
```

### Query Timeouts
```typescript
async function queryWithTimeout(
  sql: string, 
  params: any[], 
  timeoutMs: number = 5000
) {
  const client = await pool.connect();
  try {
    // Set statement timeout
    await client.query(`SET statement_timeout = ${timeoutMs}`);
    return await client.query(sql, params);
  } finally {
    client.release();
  }
}
```

---

## Partitioning

### Range Partitioning
```sql
-- Create partitioned table
CREATE TABLE events (
  id BIGSERIAL,
  user_id BIGINT NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  data JSONB
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE events_2024_q1 PARTITION OF events
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE events_2024_q2 PARTITION OF events
  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');

-- Auto-create future partitions with trigger
CREATE OR REPLACE FUNCTION create_event_partition()
RETURNS TRIGGER AS $$
DECLARE
  partition_date DATE;
  partition_name TEXT;
BEGIN
  partition_date := DATE_TRUNC('month', NEW.created_at);
  partition_name := 'events_' || TO_CHAR(partition_date, 'YYYY_MM');
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables WHERE tablename = partition_name
  ) THEN
    EXECUTE format(
      'CREATE TABLE %I PARTITION OF events FOR VALUES FROM (%L) TO (%L)',
      partition_name,
      partition_date,
      partition_date + INTERVAL '1 month'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Partition Pruning
```sql
-- Query only hits relevant partition
EXPLAIN SELECT * FROM events 
WHERE created_at >= '2024-01-01' 
AND created_at < '2024-02-01';
-- Should show: "Partition Ref: events_2024_01"
```

---

## Replication & High Availability

### Read Replica Setup
```typescript
class DatabaseCluster {
  private primary: Pool;
  private replicas: Pool[];
  private currentReplica = 0;
  
  constructor(config: {
    primary: PoolConfig;
    replicas: PoolConfig[];
  }) {
    this.primary = new Pool(config.primary);
    this.replicas = config.replicas.map(c => new Pool(c));
  }
  
  // Writes always go to primary
  async write<T>(fn: (db: Pool) => Promise<T>): Promise<T> {
    return fn(this.primary);
  }
  
  // Reads distributed across replicas
  async read<T>(fn: (db: Pool) => Promise<T>): Promise<T> {
    const replica = this.replicas[this.currentReplica];
    this.currentReplica = (this.currentReplica + 1) % this.replicas.length;
    return fn(replica);
  }
  
  // Forced primary read (for consistency)
  async readPrimary<T>(fn: (db: Pool) => Promise<T>): Promise<T> {
    return fn(this.primary);
  }
}

// Usage
const db = new DatabaseCluster({
  primary: { host: 'primary.db', ... },
  replicas: [
    { host: 'replica-1.db', ... },
    { host: 'replica-2.db', ... },
  ]
});

// Write
await db.write(pool => pool.query('INSERT INTO users...'));

// Read (load balanced)
const users = await db.read(pool => pool.query('SELECT * FROM users'));
```

---

## Monitoring & Diagnostics

### Slow Query Log
```sql
-- Enable slow query logging
ALTER SYSTEM SET log_min_duration_statement = '1000'; -- 1 second
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';
SELECT pg_reload_conf();
```

### Query Statistics
```sql
-- Find slowest queries
SELECT 
  query,
  calls,
  total_exec_time,
  mean_exec_time,
  rows
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Table statistics
SELECT 
  schemaname,
  tablename,
  n_tup_ins,
  n_tup_upd,
  n_tup_del,
  n_live_tup,
  n_dead_tup,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

### Performance Metrics
```typescript
interface DBMetrics {
  queryCount: number;
  averageQueryTime: number;
  slowQueries: number;
  connectionCount: number;
  waitingConnections: number;
}

async function getMetrics(pool: Pool): Promise<DBMetrics> {
  const client = await pool.connect();
  try {
    const [activity, stats] = await Promise.all([
      client.query(`
        SELECT count(*) as total,
               count(*) FILTER (WHERE state = 'active') as active,
               count(*) FILTER (WHERE state = 'idle') as idle,
               count(*) FILTER (WHERE wait_event_type IS NOT NULL) as waiting
        FROM pg_stat_activity
        WHERE backend_type = 'client backend'
      `),
      client.query(`
        SELECT 
          sum(calls) as query_count,
          sum(total_exec_time) / sum(calls) as avg_time,
          count(*) FILTER (WHERE mean_exec_time > 1000) as slow_queries
        FROM pg_stat_statements
      `)
    ]);
    
    return {
      queryCount: parseInt(stats.rows[0].query_count),
      averageQueryTime: parseFloat(stats.rows[0].avg_time),
      slowQueries: parseInt(stats.rows[0].slow_queries),
      connectionCount: parseInt(activity.rows[0].total),
      waitingConnections: parseInt(activity.rows[0].waiting),
    };
  } finally {
    client.release();
  }
}
```

---

## Backup Strategies

### Continuous Archiving (Point-in-Time Recovery)
```bash
# postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /backups/wal/%f'
max_wal_senders = 3
```

### Automated Backups
```typescript
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup-${timestamp}.sql.gz`;
  
  await execAsync(`
    pg_dump -h localhost -U postgres mydb | gzip > /backups/${filename}
  `);
  
  // Upload to S3
  await uploadToS3(filename, `/backups/${filename}`);
  
  // Clean old backups (keep last 7 days)
  await execAsync(`find /backups -name "backup-*.sql.gz" -mtime +7 -delete`);
}

// Schedule daily
setInterval(createBackup, 24 * 60 * 60 * 1000);
```
