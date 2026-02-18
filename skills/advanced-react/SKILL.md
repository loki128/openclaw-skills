# Advanced React Patterns Skill

**Status:** Active | **Domain:** Scalable React Architecture

---

## Compound Components

### Pattern
Components that work together to form a complete UI.

```typescript
// Select component family
interface SelectContextValue {
  value: string;
  onChange: (value: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) throw new Error("Must be used within Select");
  return context;
}

// Main container
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value, onChange, children }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div className="select" role="listbox">{children}</div>
    </SelectContext.Provider>
  );
}

// Child components
function Option({ value, children }: { value: string; children: React.ReactNode }) {
  const { value: selectedValue, onChange } = useSelectContext();
  const isSelected = value === selectedValue;
  
  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={isSelected ? "selected" : ""}
      onClick={() => onChange(value)}
    >
      {children}
    </div>
  );
}

// Usage
<Select value={value} onChange={setValue}>
  <Select.Option value="1">Option 1</Select.Option>
  <Select.Option value="2">Option 2</Select.Option>
</Select>
```

---

## Render Props Pattern

### Flexible Component Composition
```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {(users, loading, error) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <UserList users={users || []} />;
  }}
</DataFetcher>
```

---

## Custom Hooks Patterns

### Async State Hook
```typescript
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(
  asyncFunction: () => Promise<T>,
  deps: DependencyList = []
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, deps);
  
  useEffect(() => {
    execute();
  }, [execute]);
  
  return { ...state, execute };
}

// Usage
const { data: user, loading, error, execute: refetch } = useAsync(
  () => fetchUser(userId),
  [userId]
);
```

### Form Hook with Validation
```typescript
interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (touched[field] && validate) {
      const fieldErrors = validate({ ...values, [field]: value });
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }, [values, touched, validate]);
  
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (validate) {
      const fieldErrors = validate(values);
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }, [values, validate]);
  
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (validate) {
      const formErrors = validate(values);
      setErrors(formErrors);
      if (Object.keys(formErrors).length > 0) return;
    }
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  }, [values, validate, onSubmit]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
```

---

## Performance Optimization

### Memoization Patterns
```typescript
// Component memoization
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onUpdate }) {
  // Only re-renders when data or onUpdate changes
  return <div>{/* expensive render */}</div>;
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data.id === nextProps.data.id;
});

// Callback memoization
const Parent = () => {
  const [count, setCount] = useState(0);
  
  // Without useCallback, child re-renders every time
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // Stable reference
  
  return <Child onClick={handleClick} />;
};

// Value memoization
const Parent = ({ items }) => {
  // Without useMemo, filtered recalculates every render
  const filtered = useMemo(() =>
    items.filter(item => item.active),
    [items]
  );
  
  return <List items={filtered} />;
};
```

### Virtualization
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Code Splitting
```typescript
import { lazy, Suspense } from 'react';

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

// Preload on hover
const preloadComponent = () => {
  const HeavyComponent = import('./HeavyComponent');
};

<button onMouseEnter={preloadComponent}>
  Hover to preload
</button>
```

---

## State Management Patterns

### State Reducer Pattern
```typescript
interface State {
  isOpen: boolean;
  selectedIndex: number;
}

type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SELECT'; index: number }
  | { type: 'NEXT' }
  | { type: 'PREV' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SELECT':
      return { ...state, selectedIndex: action.index };
    case 'NEXT':
      return { ...state, selectedIndex: state.selectedIndex + 1 };
    case 'PREV':
      return { ...state, selectedIndex: Math.max(0, state.selectedIndex - 1) };
    default:
      return state;
  }
}

// Usage with custom hook
function useDropdown(itemCount: number) {
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    selectedIndex: 0,
  });
  
  const open = () => dispatch({ type: 'OPEN' });
  const close = () => dispatch({ type: 'CLOSE' });
  const select = (index: number) => dispatch({ type: 'SELECT', index });
  const next = () => dispatch({ type: 'NEXT' });
  const prev = () => dispatch({ type: 'PREV' });
  
  return { state, open, close, select, next, prev };
}
```

---

## Portals & Ref Forwarding

```typescript
// Modal with portal
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

// Ref forwarding
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        {label}
        <input ref={ref} {...props} />
      </label>
    );
  }
);

// Usage
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} label="Name" />
```
