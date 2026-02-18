# Supabase Integration

**Status:** Active | **Project:** rmumuqumehsxghkuzqyb

---

## Credentials

**Project URL:** `https://rmumuqumehsxghkuzqyb.supabase.co`

**Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdW11cXVtZWhzeGdoa3V6cXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDA3NjMsImV4cCI6MjA4NzAxNjc2M30.EOJUL-olkY7PoHcLLhb03wNZaJ68lWHqjdYm66OF-wE`

---

## Setup

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmumuqumehsxghkuzqyb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdW11cXVtZWhzeGdoa3V6cXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDA3NjMsImV4cCI6MjA4NzAxNjc2M30.EOJUL-olkY7PoHcLLhb03wNZaJ68lWHqjdYm66OF-wE';

const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## Database Operations

### Fetch Data
```javascript
const { data, error } = await supabase
  .from('table_name')
  .select('*');
```

### Insert Data
```javascript
const { data, error } = await supabase
  .from('table_name')
  .insert([
    { name: 'John', email: 'john@example.com' }
  ]);
```

### Update Data
```javascript
const { data, error } = await supabase
  .from('table_name')
  .update({ name: 'Jane' })
  .eq('id', 1);
```

### Delete Data
```javascript
const { error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', 1);
```

---

## Authentication

### Sign Up
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});
```

### Sign In
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

### Sign Out
```javascript
const { error } = await supabase.auth.signOut();
```

### Get Current User
```javascript
const { data: { user } } = await supabase.auth.getUser();
```

---

## Real-time Subscriptions

```javascript
const subscription = supabase
  .channel('table_changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'table_name' },
    (payload) => {
      console.log('Change received:', payload);
    }
  )
  .subscribe();
```

---

## Storage

### Upload File
```javascript
const { data, error } = await supabase.storage
  .from('bucket_name')
  .upload('file_path', file);
```

### Get Public URL
```javascript
const { data } = supabase.storage
  .from('bucket_name')
  .getPublicUrl('file_path');
```

---

## Row Level Security (RLS)

Example policy:
```sql
-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON table_name
  FOR SELECT USING (auth.uid() = user_id);
```

---

## Use Cases

| Feature | Use Case |
|---------|----------|
| Database | User profiles, orders, content |
| Auth | User login, signup, sessions |
| Real-time | Live chat, notifications, collaborative editing |
| Storage | Image uploads, file storage |

---

## Free Tier Limits

- Database: 500MB
- Auth: Unlimited users
- Real-time: 200 concurrent connections
- Storage: 1GB
- API requests: Unlimited (fair use)

---

## Security Note

⚠️ **Anon key is safe for client-side** (with RLS enabled)
- Always enable Row Level Security
- Never expose service_role key
- Use environment variables
