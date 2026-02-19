# Linear Typography Mastery

Typography system inspired by Linear.app - massive, confident, minimal.

## Core Principles

1. **One font family only** - Space Grotesk or similar geometric sans
2. **Massive headlines** - 80px minimum, often 120px+
3. **Minimal text density** - One headline + one subline per section max
4. **High contrast** - White on dark or black on light
5. **Tight tracking on large type** - letter-spacing: -0.02em to -0.04em
6. **Generous line-height on small text** - 1.6-1.8 for readability

## Typography Scale

```css
/* Hero headline */
.hero-title {
  font-size: clamp(64px, 12vw, 160px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.95;
}

/* Section headline */
.section-title {
  font-size: clamp(48px, 8vw, 100px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1;
}

/* Subtitle/lead */
.lead {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.6;
  max-width: 50ch; /* Short lines only */
}

/* Labels */
.label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

## Content Rules

- Maximum 6 words in a headline
- Maximum 12 words in a subline
- One idea per section
- No paragraphs on hero sections
- Use visual elements instead of explanatory text

## React Component Pattern

```tsx
export function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center px-8">
      <motion.h1 
        className="text-[clamp(64px,12vw,160px)] font-bold tracking-tight text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        One powerful statement.
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-400 mt-8 max-w-[50ch] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        One clear supporting sentence.
      </motion.p>
    </section>
  );
}
```

## Anti-Patterns

❌ Multiple paragraphs explaining the product
❌ Small body text (16px+) on landing sections
❌ Bullet points on hero
❌ Mixed font families
❌ Centered text blocks wider than 60ch
