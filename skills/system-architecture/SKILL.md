# System Architecture Skill

**Status:** Active | **Domain:** Scalable Backend Design

---

## Microservices Architecture

### Service Boundaries
```
┌─────────────────────────────────────────────────────────┐
│                      API Gateway                         │
│              (Auth, Rate Limit, Routing)                 │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │  Users  │       │ Orders  │       │Products │
   │ Service │       │ Service │       │ Service │
   └────┬────┘       └────┬────┘       └────┬────┘
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │Users DB │       │Orders DB│       │Products │
   │(Postgre)│       │(Mongo)  │       │  DB     │
   └─────────┘       └─────────┘       └─────────┘
```

### Inter-Service Communication
```typescript
// Event-driven with message queue
interface OrderCreatedEvent {
  type: 'ORDER_CREATED';
  payload: {
    orderId: string;
    userId: string;
    items: OrderItem[];
    total: number;
  };
  timestamp: Date;
}

// Pub/Sub pattern
class EventBus {
  private subscribers: Map<string, Function[]> = new Map();
  
  subscribe<T>(eventType: string, handler: (event: T) => void) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(handler);
  }
  
  publish<T>(eventType: string, event: T) {
    const handlers = this.subscribers.get(eventType) || [];
    handlers.forEach(handler => handler(event));
  }
}

// Usage
const eventBus = new EventBus();

// Inventory service listens
eventBus.subscribe<OrderCreatedEvent>('ORDER_CREATED', async (event) => {
  await updateInventory(event.payload.items);
});

// Email service listens
eventBus.subscribe<OrderCreatedEvent>('ORDER_CREATED', async (event) => {
  await sendOrderConfirmation(event.payload.userId, event.payload.orderId);
});
```

---

## CQRS (Command Query Responsibility Segregation)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Command   │────▶│  Command    │────▶│  Write DB   │
│   (Write)   │     │  Handler    │     │  (Primary)  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               │ Event Bus
                                               │
┌─────────────┐     ┌─────────────┐     ┌──────▼──────┐
│    Query    │────▶│  Query      │◀────│  Read DB    │
│   (Read)    │     │  Handler    │     │  (Replica)  │
└─────────────┘     └─────────────┘     └─────────────┘
```

```typescript
// Commands
interface CreateOrderCommand {
  type: 'CREATE_ORDER';
  userId: string;
  items: OrderItem[];
}

// Command handler
class OrderCommandHandler {
  async handle(command: CreateOrderCommand) {
    // Validate
    await this.validateInventory(command.items);
    
    // Create order
    const order = await this.orderRepository.create({
      userId: command.userId,
      items: command.items,
      status: 'PENDING',
    });
    
    // Publish event
    await this.eventBus.publish('ORDER_CREATED', {
      orderId: order.id,
      ...command,
    });
    
    return order;
  }
}

// Queries
interface GetOrderQuery {
  orderId: string;
}

// Query handler (optimized for reads)
class OrderQueryHandler {
  async handle(query: GetOrderQuery) {
    // Can use different DB, caching, projections
    return this.readRepository.findById(query.orderId);
  }
}
```

---

## Event Sourcing

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Command   │────▶│   Append    │────▶│ Event Store │
│             │     │   Event     │     │  (Append    │
└─────────────┘     └─────────────┘     │   Only)     │
                                        └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Projector  │
                                        │  (Creates   │
                                        │   Read Model)│
                                        └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Read DB    │
                                        └─────────────┘
```

```typescript
// Events
interface OrderEvent {
  orderId: string;
  timestamp: Date;
  version: number;
}

interface OrderCreated extends OrderEvent {
  type: 'ORDER_CREATED';
  userId: string;
  items: OrderItem[];
}

interface OrderShipped extends OrderEvent {
  type: 'ORDER_SHIPPED';
  trackingNumber: string;
}

interface OrderCancelled extends OrderEvent {
  type: 'ORDER_CANCELLED';
  reason: string;
}

type OrderEvents = OrderCreated | OrderShipped | OrderCancelled;

// Event store
class EventStore {
  async appendEvents(orderId: string, events: OrderEvents[]) {
    // Append-only storage
    await this.db.query(
      'INSERT INTO events (order_id, type, data, version) VALUES ?',
      events.map(e => [orderId, e.type, JSON.stringify(e), e.version])
    );
  }
  
  async getEvents(orderId: string): Promise<OrderEvents[]> {
    const rows = await this.db.query(
      'SELECT * FROM events WHERE order_id = ? ORDER BY version',
      [orderId]
    );
    return rows.map(r => JSON.parse(r.data));
  }
}

// Aggregate reconstruction
class Order {
  private status: 'PENDING' | 'SHIPPED' | 'CANCELLED' = 'PENDING';
  private items: OrderItem[] = [];
  private version = 0;
  
  applyEvent(event: OrderEvents) {
    switch (event.type) {
      case 'ORDER_CREATED':
        this.items = event.items;
        break;
      case 'ORDER_SHIPPED':
        this.status = 'SHIPPED';
        break;
      case 'ORDER_CANCELLED':
        this.status = 'CANCELLED';
        break;
    }
    this.version = event.version;
  }
  
  static fromEvents(events: OrderEvents[]): Order {
    const order = new Order();
    events.forEach(e => order.applyEvent(e));
    return order;
  }
}
```

---

## Caching Strategies

### Cache-Aside (Lazy Loading)
```typescript
class CacheAsideService {
  async getUser(id: string): Promise<User> {
    // 1. Try cache
    const cached = await this.cache.get(`user:${id}`);
    if (cached) return JSON.parse(cached);
    
    // 2. Load from DB
    const user = await this.db.users.findById(id);
    if (!user) throw new Error('User not found');
    
    // 3. Store in cache
    await this.cache.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
    
    return user;
  }
}
```

### Write-Through
```typescript
class WriteThroughService {
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    // 1. Update DB
    const user = await this.db.users.update(id, data);
    
    // 2. Update cache synchronously
    await this.cache.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
    
    return user;
  }
}
```

### Cache Invalidation Patterns
```typescript
// Pattern 1: TTL (Time To Live)
await cache.set(key, value, 'EX', 3600); // Expires in 1 hour

// Pattern 2: Explicit invalidation
await cache.del(`user:${userId}`);

// Pattern 3: Tag-based invalidation
await cache.set(`user:${userId}`, value);
await cache.sadd('tag:users', `user:${userId}`);

// Invalidate all users
const userKeys = await cache.smembers('tag:users');
await cache.del(...userKeys);

// Pattern 4: Version-based
const version = await cache.get('users:version') || '1';
const user = await cache.get(`user:${userId}:v${version}`);

// Invalidate all by bumping version
await cache.incr('users:version');
```

---

## Rate Limiting

### Token Bucket Algorithm
```typescript
class TokenBucket {
  constructor(
    private capacity: number,
    private refillRate: number, // tokens per second
    private redis: Redis
  ) {}
  
  async consume(key: string, tokens: number = 1): Promise<boolean> {
    const now = Date.now();
    const bucketKey = `ratelimit:${key}`;
    
    const lua = `
      local bucket = redis.call('hmget', KEYS[1], 'tokens', 'last_refill')
      local tokens = tonumber(bucket[1]) or tonumber(ARGV[1])
      local last_refill = tonumber(bucket[2]) or tonumber(ARGV[2])
      local now = tonumber(ARGV[2])
      local capacity = tonumber(ARGV[1])
      local refill_rate = tonumber(ARGV[3])
      local requested = tonumber(ARGV[4])
      
      local elapsed = (now - last_refill) / 1000
      local new_tokens = math.min(capacity, tokens + elapsed * refill_rate)
      
      if new_tokens >= requested then
        new_tokens = new_tokens - requested
        redis.call('hmset', KEYS[1], 'tokens', new_tokens, 'last_refill', now)
        redis.call('expire', KEYS[1], 60)
        return 1
      else
        redis.call('hmset', KEYS[1], 'tokens', new_tokens, 'last_refill', now)
        redis.call('expire', KEYS[1], 60)
        return 0
      end
    `;
    
    const result = await this.redis.eval(
      lua,
      1,
      bucketKey,
      this.capacity,
      now,
      this.refillRate,
      tokens
    );
    
    return result === 1;
  }
}

// Usage
const limiter = new TokenBucket(100, 10, redis); // 100 burst, 10/sec

app.use(async (req, res, next) => {
  const allowed = await limiter.consume(req.ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  next();
});
```

---

## Database Patterns

### Connection Pooling
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: 'password',
  max: 20,        // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Usage
const client = await pool.connect();
try {
  const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
} finally {
  client.release();
}
```

### Read Replicas
```typescript
class DatabaseRouter {
  private primary: Pool;
  private replicas: Pool[];
  private replicaIndex = 0;
  
  getWriter(): Pool {
    return this.primary;
  }
  
  getReader(): Pool {
    // Round-robin
    const replica = this.replicas[this.replicaIndex];
    this.replicaIndex = (this.replicaIndex + 1) % this.replicas.length;
    return replica;
  }
}

// Usage
const db = new DatabaseRouter();

// Writes go to primary
await db.getWriter().query('INSERT INTO users...');

// Reads go to replicas
await db.getReader().query('SELECT * FROM users...');
```

### Sharding
```typescript
class ShardingStrategy {
  // Consistent hashing
  getShard(key: string, shardCount: number): number {
    const hash = this.hashCode(key);
    return Math.abs(hash) % shardCount;
  }
  
  // Range-based
  getShardByRange(userId: number): number {
    if (userId < 1000000) return 0;
    if (userId < 2000000) return 1;
    return 2;
  }
  
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
}
```

---

## Load Balancing

```
                    ┌─────────────┐
                    │   Client    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Load Balancer│
                    │  (Nginx/HAProxy)
                    └──────┬──────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
  ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
  │ Server 1│         │ Server 2│         │ Server 3│
  │ (Health:│         │ (Health:│         │ (Health:│
  │   OK)   │         │   OK)   │         │   OK)   │
  └─────────┘         └─────────┘         └─────────┘
```

### Health Checks
```typescript
interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  checks: {
    database: boolean;
    cache: boolean;
    externalAPI: boolean;
  };
  timestamp: Date;
}

app.get('/health', async (req, res) => {
  const status: HealthStatus = {
    status: 'healthy',
    checks: {
      database: await checkDatabase(),
      cache: await checkCache(),
      externalAPI: await checkExternalAPI(),
    },
    timestamp: new Date(),
  };
  
  const allHealthy = Object.values(status.checks).every(v => v);
  status.status = allHealthy ? 'healthy' : 'degraded';
  
  res.status(allHealthy ? 200 : 503).json(status);
});
```

---

## Circuit Breaker

```typescript
enum CircuitState {
  CLOSED,      // Normal operation
  OPEN,        // Failing, reject requests
  HALF_OPEN    // Testing if service recovered
}

class CircuitBreaker {
  private state = CircuitState.CLOSED;
  private failures = 0;
  private lastFailureTime?: number;
  
  constructor(
    private failureThreshold = 5,
    private resetTimeout = 60000,
    private halfOpenMaxCalls = 3
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - (this.lastFailureTime || 0) > this.resetTimeout) {
        this.state = CircuitState.HALF_OPEN;
        this.failures = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failures = 0;
    this.state = CircuitState.CLOSED;
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }
}

// Usage
const breaker = new CircuitBreaker();

app.get('/api/external', async (req, res) => {
  try {
    const data = await breaker.execute(() => fetchExternalData());
    res.json(data);
  } catch (error) {
    res.status(503).json({ error: 'Service temporarily unavailable' });
  }
});
```
