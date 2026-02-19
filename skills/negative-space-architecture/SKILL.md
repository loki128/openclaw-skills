# Negative Space Architecture

Whitespace as a design element. Space creates hierarchy, focus, and premium feel.

## Core Principles

1. **Space is content** - Empty areas are intentional
2. **Generous margins** - 120px+ section padding
3. **Breathing room** - Elements need space to be seen
4. **Asymmetric balance** - Space creates visual weight
5. **Less is more** - Remove until nothing else can go

## Spacing Scale

```css
/* Section spacing */
--section-padding: 120px;      /* Desktop */
--section-padding-tablet: 80px;
--section-padding-mobile: 48px;

/* Element spacing */
--space-xs: 8px;
--space-sm: 16px;
--space-md: 32px;
--space-lg: 64px;
--space-xl: 120px;

/* Content width */
--content-max: 1200px;
--text-max: 680px;  /* For readability */
```

## Section Spacing

```tsx
// Standard section
<section className="py-[120px] px-8">
  <div className="max-w-[1200px] mx-auto">
    {/* Content */}
  </div>
</section>

// Fullscreen section with centered content
<section className="h-screen flex items-center justify-center px-8">
  <div className="text-center max-w-[800px]">
    {/* Content */}
  </div>
</section>
```

## Element Spacing

### Hero
```tsx
<div className="text-center">
  <h1 className="text-[120px] font-bold">Headline</h1>
  <p className="mt-8 text-xl">Subline with space above</p>
  <button className="mt-12">CTA with more space</button>
</div>
```

### Two Column
```tsx
<div className="grid grid-cols-2 gap-24 items-center">
  {/* Large gap creates separation */}
</div>
```

### Stats Row
```tsx
<div className="grid grid-cols-3 gap-16">
  {/* Generous gap between stats */}
</div>
```

## Asymmetric Layouts

### Left-heavy
```tsx
<div className="flex items-center min-h-screen px-16">
  <div className="w-1/3">
    {/* Content - only 1/3 width */}
  </div>
  {/* 2/3 empty space creates focus */}
</div>
```

### Floating element
```tsx
<div className="relative min-h-screen">
  <div className="absolute top-1/4 left-16 w-1/3">
    {/* Content in upper left */}
  </div>
  {/* Rest is breathing room */}
</div>
```

## Container Patterns

### Narrow content
```tsx
// For text-heavy sections
<div className="max-w-[680px] mx-auto">
  {/* Paragraphs - easy to read */}
</div>
```

### Wide visual
```tsx
// For visual impact
<div className="max-w-[1400px] mx-auto">
  {/* Full-width imagery */}
</div>
```

### Offset content
```tsx
<div className="max-w-[1200px] mx-auto">
  <div className="ml-[20%]">
    {/* Indented content creates asymmetry */}
  </div>
</div>
```

## Anti-Patterns

❌ Cramped elements with small gaps
❌ Equal spacing everywhere (no hierarchy)
❌ Text touching edges
❌ Centered content wider than 800px
❌ Multiple elements competing for attention
