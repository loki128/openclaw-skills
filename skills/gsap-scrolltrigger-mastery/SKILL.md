# GSAP ScrollTrigger Mastery

**Status:** Active | **Domain:** Scroll-driven animations

---

## Core Concepts

### 1. Pinning
```javascript
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=500",
    pin: true,
    scrub: 1
  }
});
```

### 2. Scrub
```javascript
// Smooth scroll-linked animation
gsap.to(".element", {
  x: 500,
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: 1 // Smooth scrubbing
  }
});
```

### 3. Snap
```javascript
// Snap to sections
ScrollTrigger.create({
  snap: {
    snapTo: 1 / 5, // Snap to 1/5th of viewport
    duration: 0.5,
    ease: "power1.inOut"
  }
});
```

---

## Premium Effects

### Parallax Layers
```javascript
// Multiple layers at different speeds
gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
  gsap.to(layer, {
    y: (i + 1) * 100,
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```

### Text Reveal on Scroll
```javascript
// Character-by-character reveal
const text = new SplitText(".headline", { type: "chars" });

gsap.from(text.chars, {
  opacity: 0,
  y: 50,
  stagger: 0.02,
  scrollTrigger: {
    trigger: ".headline",
    start: "top 80%",
    end: "top 50%",
    scrub: 1
  }
});
```

### Image Sequence Scrub
```javascript
// Video-like image sequence controlled by scroll
const frames = { frame: 0 };
const images = [];

// Preload images
for (let i = 0; i < 100; i++) {
  images.push(`frame-${i}.jpg`);
}

gsap.to(frames, {
  frame: images.length - 1,
  snap: "frame",
  scrollTrigger: {
    trigger: ".image-sequence",
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 0.5,
    onUpdate: (self) => {
      document.querySelector(".sequence-image").src = images[frames.frame];
    }
  }
});
```

---

## Performance Best Practices

1. **Use transform and opacity only**
2. **Batch animations with timelines**
3. **Use will-change sparingly**
4. **Implement reduced motion support**
5. **Clean up ScrollTriggers on unmount**

---

## Mind-Blowing Patterns

| Effect | Code Pattern |
|--------|--------------|
| Horizontal scroll section | Pin + transform x |
| Morphing sections | Pin + clip-path |
| Sticky cards | Pin + stack |
| Scroll velocity | Scrub + velocity |
| Progress bar | ScrollTrigger progress |
