# CSS Architecture & Design Systems

**Status:** Active | **Domain:** Scalable UI Design

---

## Methodology: CUBE CSS

```css
/* C = Composition */
/* U = Utilities */
/* B = Block */
/* E = Exception */

/* Composition - Layout primitives */
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, 1rem);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space, 1rem);
}

/* Utilities - Single purpose */
.text-center { text-align: center; }
.mt-xl { margin-top: var(--space-xl); }
.bg-primary { background: var(--color-primary); }

/* Block - Component styles */
.card {
  padding: var(--space-md);
  border-radius: var(--radius);
  background: var(--surface);
}

/* Exception - Variants */
.card--featured {
  border: 2px solid var(--color-primary);
}
```

---

## Design Tokens System

```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Neutral scale */
  --color-white: #ffffff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-900: #111827;
  --color-black: #000000;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  
  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  
  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

---

## Component Patterns

### Button System

```css
.btn {
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-sans);
  font-weight: 500;
  line-height: 1.5;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  
  /* Default (primary) */
  background: var(--color-primary);
  color: white;
}

.btn:hover {
  background: color-mix(in srgb, var(--color-primary) 90%, black);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Variants */
.btn--secondary {
  background: transparent;
  border-color: var(--color-gray-300);
  color: var(--color-gray-700);
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
}

.btn--danger {
  background: var(--color-error);
}

/* Sizes */
.btn--sm { padding: var(--space-xs) var(--space-sm); font-size: var(--text-sm); }
.btn--lg { padding: var(--space-md) var(--space-lg); font-size: var(--text-lg); }

/* States */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--loading {
  position: relative;
  color: transparent;
}

.btn--loading::after {
  content: "";
  position: absolute;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### Card System

```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__title {
  font-size: var(--text-lg);
  font-weight: 600;
}

.card__content {
  flex: 1;
}

.card__footer {
  display: flex;
  gap: var(--space-sm);
  padding-top: var(--space-md);
  border-top: 1px solid var(--border);
}

/* Variants */
.card--interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
}
```

---

## Modern CSS Features

### Container Queries

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### CSS Layers

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: var(--font-sans);
    line-height: 1.5;
  }
}

@layer components {
  .btn { /* button styles */ }
}

@layer utilities {
  .text-center { text-align: center; }
}
```

### Logical Properties

```css
/* Instead of left/right, use inline-start/end */
.margin-inline-start { margin-inline-start: 1rem; }
.padding-inline-end { padding-inline-end: 1rem; }

/* Border radius logical */
.border-start-start-radius { border-start-start-radius: 0.5rem; }
```

---

## Dark Mode System

```css
:root {
  color-scheme: light dark;
  
  --surface: white;
  --text: var(--color-gray-900);
  --border: var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: var(--color-gray-900);
    --text: var(--color-gray-100);
    --border: var(--color-gray-700);
  }
}

/* Or manual toggle */
[data-theme="dark"] {
  --surface: var(--color-gray-900);
  --text: var(--color-gray-100);
  --border: var(--color-gray-700);
}
```

---

## File Structure

```
css/
├── tokens/
│   ├── colors.css
│   ├── spacing.css
│   ├── typography.css
│   └── index.css
├── reset/
│   └── modern-reset.css
├── compositions/
│   ├── cluster.css
│   ├── stack.css
│   ├── grid.css
│   └── sidebar.css
├── utilities/
│   ├── spacing.css
│   ├── typography.css
│   └── colors.css
├── blocks/
│   ├── button.css
│   ├── card.css
│   ├── form.css
│   └── navigation.css
└── global.css
```

---

## CSS Architecture Checklist

- [ ] Design tokens for all values
- [ ] Composition-first layouts
- [ ] Utility classes for one-offs
- [ ] Block components with variants
- [ ] Exception classes for overrides
- [ ] Dark mode support
- [ ] Container queries for components
- [ ] CSS layers for specificity
- [ ] Logical properties for RTL
- [ ] Reduced motion support
