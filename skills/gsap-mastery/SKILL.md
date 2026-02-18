# GSAP Animation Mastery

**Status:** Active | **Domain:** Advanced Web Animations

---

## Core Library

```bash
npm install gsap
# or CDN
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

---

## Essential Plugins

```bash
npm install gsap @gsap/react

# Plugins (register separately)
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText);
```

---

## Core Techniques

### 1. Timeline Sequences

```javascript
const tl = gsap.timeline({
  defaults: { ease: "power2.out" },
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
});

tl
  .from(".hero-title", { y: 100, opacity: 0, duration: 1 })
  .from(".hero-subtitle", { y: 50, opacity: 0, duration: 0.8 }, "-=0.5")
  .from(".cta-button", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3");
```

### 2. ScrollTrigger Mastery

```javascript
// Pin section while animating
gsap.to(".pinned-section", {
  scrollTrigger: {
    trigger: ".pinned-section",
    start: "top top",
    end: "+=500",
    pin: true,
    scrub: 1
  },
  scale: 1.2,
  opacity: 0.5
});

// Parallax layers
gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
  gsap.to(layer, {
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
    y: (i + 1) * 100
  });
});
```

### 3. MorphSVG Shape Morphing

```javascript
gsap.to("#circle", {
  morphSVG: "#star",
  duration: 2,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true
});

// Path-to-path morphing
gsap.to(".start-path", {
  morphSVG: {
    shape: ".end-path",
    shapeIndex: "auto"
  },
  duration: 1.5
});
```

### 4. SplitText Typography

```javascript
const split = new SplitText(".headline", {
  type: "words,chars",
  charsClass: "char"
});

gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: "back.out(1.7)"
});
```

### 5. Flip Plugin (Layout Transitions)

```javascript
// Get initial state
const state = Flip.getState(".grid-item");

// Change layout
document.querySelector(".grid").classList.toggle("list-view");

// Animate from previous state
Flip.from(state, {
  duration: 0.7,
  ease: "power3.inOut",
  stagger: 0.05
});
```

---

## Performance Optimization

```javascript
// Use transforms only (GPU accelerated)
gsap.to(".element", {
  x: 100,        // ✓ GPU
  y: 50,         // ✓ GPU
  scale: 1.2,    // ✓ GPU
  rotation: 45,  // ✓ GPU
  // Avoid animating these:
  // width, height, top, left, margin, padding
});

// Batch animations
const ctx = gsap.context(() => {
  // All GSAP code here
  gsap.to(".a", { x: 100 });
  gsap.to(".b", { y: 50 });
});

// Cleanup
return () => ctx.revert();
```

---

## React Integration

```jsx
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Component() {
  const container = useRef();

  useGSAP(() => {
    gsap.to(".box", {
      rotation: 360,
      scrollTrigger: {
        trigger: ".box",
        start: "top center"
      }
    });
  }, { scope: container });

  return <div ref={container}>...</div>;
}
```

---

## Common Patterns

| Effect | Code |
|--------|------|
| Fade in up | `gsap.from(el, { y: 50, opacity: 0 })` |
| Stagger list | `gsap.from(items, { stagger: 0.1 })` |
| Scroll reveal | `ScrollTrigger.create({ trigger, animation })` |
| Infinite loop | `{ repeat: -1, yoyo: true }` |
| Elastic bounce | `ease: "elastic.out(1, 0.5)"` |

---

## Resources

- **Docs:** https://gsap.com/docs/
- **Showcase:** https://gsap.com/showcase/
- **Cheat Sheet:** https://gsap.com/cheatsheet/
