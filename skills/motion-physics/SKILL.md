# Motion & Animation Skill

**Status:** Active | **Domain:** Web Animations & Physics

---

## Animation Libraries

### 1. Framer Motion (React)
Best for: React component animations, gestures, layout animations

```bash
npm install framer-motion
```

```typescript
import { motion } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Hello World
</motion.div>

// Gesture animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileDrag={{ scale: 1.1 }}
>
  Click me
</motion.button>

// Layout animations
<motion.div layoutId="card" />
```

### 2. GSAP (GreenSock)
Best for: Complex timelines, scroll-triggered animations, high performance

```bash
npm install gsap @gsap/react
```

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Basic tween
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power2.out"
});

// Timeline
const tl = gsap.timeline();
tl.to(".box1", { x: 100 })
  .to(".box2", { y: 50 }, "-=0.5")
  .to(".box3", { rotation: 360 });

// ScrollTrigger
gsap.to(".section", {
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    scrub: true
  },
  y: -100
});
```

### 3. Anime.js
Best for: Lightweight, simple animations

```bash
npm install animejs
```

```typescript
import anime from 'animejs';

anime({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  duration: 800,
  easing: 'easeInOutQuad'
});
```

---

## Physics Engines

### 1. Matter.js (2D Physics)
Best for: 2D games, simulations, interactive physics

```bash
npm install matter-js
```

```typescript
import Matter from 'matter-js';

const { Engine, Render, Runner, Bodies, Composite } = Matter;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create bodies
const box = Bodies.rectangle(400, 200, 80, 80);
const ground = Bodies.rectangle(400, 600, 810, 60, { isStatic: true });

// Add to world
Composite.add(world, [box, ground]);

// Run
const runner = Runner.create();
Runner.run(runner, engine);
```

### 2. Rapier (Rust-based, WebAssembly)
Best for: High-performance 3D physics

```bash
npm install @dimforge/rapier3d
```

```typescript
import { World, RigidBodyDesc, ColliderDesc } from '@dimforge/rapier3d';

const world = new World({ x: 0, y: -9.81, z: 0 });

// Create rigid body
const bodyDesc = RigidBodyDesc.dynamic()
  .setTranslation(0, 5, 0);
const body = world.createRigidBody(bodyDesc);

// Add collider
const colliderDesc = ColliderDesc.ball(0.5);
world.createCollider(colliderDesc, body);

// Step simulation
world.step();
```

### 3. Cannon-es (3D Physics)
Best for: Three.js integration

```bash
npm install cannon-es
```

```typescript
import { World, Body, Sphere, Box } from 'cannon-es';

const world = new World({
  gravity: { x: 0, y: -9.82, z: 0 }
});

// Create body
const body = new Body({
  mass: 1,
  shape: new Sphere(1),
  position: { x: 0, y: 5, z: 0 }
});
world.addBody(body);

// Step
world.fixedStep();
```

---

## Common Patterns

### Scroll-Triggered Reveal
```typescript
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrollReveal() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return <motion.div style={{ opacity }} />;
}
```

### Physics-Based UI
```typescript
import { motion, useSpring } from 'framer-motion';

function SpringButton() {
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  
  return (
    <motion.button
      drag="x"
      style={{ x }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    />
  );
}
```

### Staggered Children
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i} variants={item} />
  ))}
</motion.ul>
```

---

## Performance Tips

- Use `transform` and `opacity` only (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Prefer `requestAnimationFrame` for manual animations
- Use `layoutId` for shared element transitions
- Debounce scroll events

---

## Decision Tree

| Need | Use |
|------|-----|
| React component animations | Framer Motion |
| Complex timelines, scroll effects | GSAP |
| Simple lightweight animations | Anime.js |
| 2D physics game | Matter.js |
| 3D physics with Three.js | Cannon-es or Rapier |
| High-performance 3D physics | Rapier |
