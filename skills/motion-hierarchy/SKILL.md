# Motion Hierarchy

Purposeful animation that guides attention, inspired by Linear's motion design.

## Core Principles

1. **Motion reinforces hierarchy** - Important elements move first
2. **Staggered reveals** - Sequential, not simultaneous
3. **Subtle, never flashy** - Motion supports content
4. **Consistent timing** - Same durations across site
5. **Respect reduced motion** - Always provide fallback

## Timing System

```css
--duration-fast: 0.2s;    /* Micro-interactions */
--duration-normal: 0.4s;  /* Standard transitions */
--duration-slow: 0.8s;    /* Section reveals */
--duration-dramatic: 1.2s; /* Hero elements */

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

## Animation Patterns

### Hero Reveal
```tsx
// Headline first, then subtitle, then CTA
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};
```

### Scroll Reveal
```tsx
// Elements reveal as they enter viewport
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
```

### Hover States
```tsx
// Subtle scale and glow
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
```

### Continuous Motion
```tsx
// Ambient motion for visual elements
<motion.div
  animate={{ 
    rotate: 360,
    scale: [1, 1.05, 1]
  }}
  transition={{ 
    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }}
/>
```

## Stagger Patterns

### Text Characters
```tsx
{text.split('').map((char, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.03 }}
  >
    {char}
  </motion.span>
))}
```

### List Items
```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
  />
))}
```

## Scroll-Linked Animations

### Progress Bar
```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

<motion.div 
  className="fixed top-0 left-0 h-1 bg-white origin-left"
  style={{ scaleX }}
/>
```

### Section Progress
```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"]
});

const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
```

## Anti-Patterns

❌ Everything animating at once
❌ Long durations (>1s) for UI feedback
❌ Bouncy/spring animations for serious content
❌ Motion without purpose
❌ Ignoring prefers-reduced-motion
