# Advanced TypeScript Skill

**Status:** Active | **Domain:** Type-Level Programming

---

## Generics Deep Dive

### Basic to Advanced Generics
```typescript
// Simple generic
function identity<T>(arg: T): T {
  return arg;
}

// Constrained generics
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Generic with default
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
```

### Generic Constraints & Mapping
```typescript
// Key constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Mapped types with generics
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

---

## Conditional Types

### Basic Conditionals
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<123>;     // false
```

### Infer Keyword
```typescript
// Extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract promise type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Extract array element
type ElementType<T> = T extends (infer U)[] ? U : never;
```

### Advanced Conditional Patterns
```typescript
// Flatten nested arrays
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

---

## Template Literal Types

```typescript
// Event name generation
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"

// CSS property generation
type CSSProperty<T extends string> = T | `-${T}` | `${T}-${T}`;

// Route parameters
type RouteParams<T extends string> = 
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof RouteParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

// Usage
type UserRoute = RouteParams<"/users/:id/posts/:postId">;
// { id: string; postId: string }
```

---

## Type Guards & Narrowing

### Custom Type Guards
```typescript
interface Cat {
  type: "cat";
  meow(): void;
}

interface Dog {
  type: "dog";
  bark(): void;
}

type Animal = Cat | Dog;

// Type guard function
function isCat(animal: Animal): animal is Cat {
  return animal.type === "cat";
}

function makeSound(animal: Animal) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows it's Cat
  } else {
    animal.bark(); // TypeScript knows it's Dog
  }
}
```

### Discriminated Unions
```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square": return shape.size ** 2;
    case "rectangle": return shape.width * shape.height;
    case "circle": return Math.PI * shape.radius ** 2;
    default: return assertNever(shape);
  }
}

// Exhaustiveness check
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
```

---

## Utility Types Mastery

```typescript
// Built-in utilities
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
type UserKeys = keyof User;
type UserValues = User[keyof User];

// Pick & Omit
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutPassword = Omit<User, "password">;

// Record & Dictionary
type UserDictionary = Record<string, User>;
type StatusCounts = Record<"active" | "inactive", number>;

// Extract & Exclude
type StringOrNumber = string | number | boolean;
type JustStrings = Extract<StringOrNumber, string>;
type NotBoolean = Exclude<StringOrNumber, boolean>;

// Non-nullable
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
```

---

## Advanced Patterns

### Branded Types
```typescript
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<number, "UserId">;
type OrderId = Brand<number, "OrderId">;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createOrderId(id: number): OrderId {
  return id as OrderId;
}

// Now you can't mix them up!
function getUser(id: UserId) { }
function getOrder(id: OrderId) { }
```

### Phantom Types
```typescript
interface Entity<T> {
  id: string;
  data: T;
  __phantom?: T; // Never used at runtime
}

type UserEntity = Entity<User>;
type PostEntity = Entity<Post>;
```

### Recursive Types
```typescript
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

interface LinkedList<T> {
  value: T;
  next: LinkedList<T> | null;
}

// JSON type
type JSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JSONValue[] 
  | { [key: string]: JSONValue };
```

---

## Type-Safe API Clients

```typescript
// Generic API client with typed responses
interface Endpoint<TRequest, TResponse> {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

async function apiCall<TRequest, TResponse>(
  endpoint: Endpoint<TRequest, TResponse>,
  request: TRequest
): Promise<TResponse> {
  const response = await fetch(endpoint.path, {
    method: endpoint.method,
    body: JSON.stringify(request),
  });
  return response.json();
}

// Usage
const getUser: Endpoint<{ id: string }, User> = {
  path: "/api/users",
  method: "GET",
};

const user = await apiCall(getUser, { id: "123" }); // Fully typed!
```
