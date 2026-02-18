# Premium Component Architecture

**Status:** Active | **Domain:** Scalable, maintainable UI systems

---

## Core Principles

### 1. Atomic Design
```
atoms/       - Buttons, inputs, labels
molecules/   - Search bar, card header
organisms/   - Header, product card
templates/   - Page layouts
pages/       - Complete pages
```

### 2. Design Tokens
```typescript
// tokens.ts
export const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      900: '#0c4a6e',
    }
  },
  spacing: {
    1: '4px',
    2: '8px',
    4: '16px',
    8: '32px',
  },
  typography: {
    body: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontFamily: 'Inter, sans-serif',
    }
  }
};
```

### 3. Component Variants
```typescript
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const buttonStyles = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

---

## Premium Patterns

### Compound Components
```typescript
// Card.tsx
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border bg-white shadow-sm">{children}</div>
);

Card.Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="p-6 border-b">
    <h3 className="text-lg font-semibold">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

Card.Body = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

// Usage
<Card>
  <Card.Header title="Product" subtitle="Description" />
  <Card.Body>Content here</Card.Body>
</Card>
```

### Slot Pattern
```typescript
// Layout with slots
interface LayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Layout({ header, sidebar, children, footer }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {header && <header>{header}</header>}
      <div className="flex">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{children}</main>
      </div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}
```

### Render Props for Flexibility
```typescript
// DataTable with render props
interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }[];
}

function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render 
                  ? col.render(item[col.key], item)
                  : String(item[col.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## Animation Integration

### Framer Motion Patterns
```typescript
// Staggered children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function List({ items }: { items: string[] }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show">
      {items.map((item, i) => (
        <motion.li key={i} variants={item}>{item}</motion.li>
      ))}
    </motion.ul>
  );
}
```

### Layout Animations
```typescript
// Animate layout changes
<motion.div
  layout
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  Content that changes size
</motion.div>
```

---

## Quality Checklist

- [ ] Components are composable
- [ ] Props are typed (TypeScript)
- [ ] Variants are documented
- [ ] Accessibility (a11y) supported
- [ ] Reduced motion supported
- [ ] Responsive by default
- [ ] Performance optimized
- [ ] Tested across browsers
