# Fullscreen Sections

Full-viewport sections with sticky scroll effects, inspired by Linear and Apple.

## Core Principles

1. **One section = One viewport** - 100vh minimum
2. **Sticky positioning** - Content sticks while scrolling through
3. **Scroll-linked animations** - Progress drives the experience
4. **Clear entry/exit** - Each section has distinct boundaries
5. **No scrolling content** - Everything visible at once per section

## Section Structure

```tsx
export function FullscreenSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  return (
    <section ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div style={{ opacity, scale }}>
          {/* Content here - never scrolls */}
        </motion.div>
      </div>
    </section>
  );
}
```

## Scroll Patterns

### Fade Out on Exit
```tsx
const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
```

### Scale Down on Exit
```tsx
const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
```

### Parallax Background
```tsx
const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
```

### Progress-Driven Reveal
```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});

// Animates as section enters viewport
const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
```

## Section Transitions

```tsx
// Section 1 fades out as Section 2 enters
const section1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
const section2Opacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
```

## Layout Patterns

### Centered Hero
```tsx
<div className="h-screen flex flex-col items-center justify-center text-center px-8">
  <h1>Massive Headline</h1>
  <p className="mt-8">Short subline</p>
</div>
```

### Split Screen
```tsx
<div className="h-screen grid grid-cols-2 items-center px-16">
  <div>
    <h1>Left Content</h1>
  </div>
  <div>
    {/* Visual element */}
  </div>
</div>
```

### Asymmetric
```tsx
<div className="h-screen flex items-center px-16">
  <div className="w-1/3">
    <h1>Left aligned</h1>
  </div>
</div>
```

## Anti-Patterns

❌ Sections shorter than viewport
❌ Content that requires scrolling within section
❌ Multiple ideas competing for attention
❌ No clear visual separation between sections
