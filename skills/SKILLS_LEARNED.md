# Design Skills Arsenal

## 10 New Skills Acquired (February 2026)

### 1. superdesign / frontend-design
- **Key Learning**: Always sketch ASCII wireframes before coding
- **Modern Color**: Use oklch() instead of hex for better perceptual uniformity
- **Theme Patterns**: Neo-brutalism, glassmorphism, modern dark (Vercel/Linear style)
- **Font Strategy**: NEVER use generic Bootstrap blue, NEVER use system fonts for everything

### 2. awwwards-design
- **Key Learning**: Award-winning sites tell stories through scroll, not just display content
- **Core Techniques**: ScrollTrigger animations, text splitting, parallax layers, pinned sections
- **Evaluation Criteria**: Design 8.5+, Usability 8.5+, Creativity 8.5+, Content 8.5+
- **Stack**: GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion

### 3. lb-motion-skill (Motion.dev)
- **Key Learning**: Motion is the evolution of Framer Motion - 2.3kb, hardware-accelerated
- **Patterns**: Spring physics for natural feel, scroll-linked animations, gesture-based interactions
- **API**: `animate()`, `scroll()`, `motion` component for React

### 4. distinctive-design-systems
- **Key Learning**: Document the VIBE before writing CSS
- **Process**: Define vibe → Gather references → Document emotions → Extract tokens → Build components
- **Color Architecture**: Three-layer system (CSS vars → Tailwind → TypeScript)
- **Emotion Mapping**: Every design choice should map to an emotion

### 5. threejs
- **Key Learning**: GPU resource management is critical - always call .dispose()
- **Performance**: Use InstancedMesh for many objects, merge static geometries
- **Responsive**: Update camera.aspect AND call updateProjectionMatrix() on resize
- **Animation**: Use clock.getDelta() for frame-independent movement

### 6. fonts
- **Key Learning**: Display fonts (Abril Fatface, Bebas Neue) are for headings 24px+ ONLY
- **Pairing Rule**: Two fonts too similar look like a mistake - use contrast or use one
- **Weights**: Thin weights (100-300) render poorly on Windows - avoid for body
- **Line Length**: Max 45-75 characters, use `max-width: 65ch`
- **All Caps**: Needs `letter-spacing: 0.05em` minimum

### 7. design-system-creation
- **Key Learning**: Meta-skill that orchestrates the entire design system workflow
- **6 Steps**: Aesthetic Foundation → Color Tokens → Typography → Surfaces → Motion → Loading States
- **CVA**: Class Variance Authority for component variants
- **Documentation**: Create aesthetic docs before code

### 8. ui-audit
- **Key Learning**: 3 Pillars - Scaffolding (rules), Decisioning (process), Crafting (checklists)
- **Decision Workflow**: Weigh info → Narrow options → Execute
- **Patterns**: 31 pattern categories for chunking, disclosure, cognitive load, hierarchy, etc.
- **Speed ≠ Recklessness**: Design quickly with intentionality

### 9. auto-animate
- **Key Learning**: Zero-config animations for lists/accordions/toasts
- **Critical**: Use SSR-safe pattern with dynamic imports for Next.js
- **15 Documented Errors**: Includes React 19 StrictMode bugs, conditional parents, viewport issues
- **Rule**: Never conditionally render the parent - conditionally render children instead

### 10. frontend-design-ultimate
- **Key Learning**: Commit to a BOLD aesthetic direction - timid designs fail
- **10 Tones**: Brutally Minimal, Maximalist Chaos, Retro-Futuristic, Organic, Luxury, Editorial, Brutalist, Art Deco, Soft/Pastel, Industrial
- **Typography BANNED**: Inter, Roboto, Arial, system fonts, Open Sans
- **Typography DO**: Distinctive choices - Clash, Cabinet Grotesk, Satoshi, Space Grotesk, Playfair Display
- **Color Rule**: Commit to dark OR light, don't hedge with gray middle-grounds

---

## How This Changes My Approach

### Before (Repetitive)
- Generic dark theme with gold accents
- Same layout patterns (hero + grid + features)
- System fonts (Inter)
- Basic Framer Motion fades

### After (Distinctive)
- Document the VIBE first (emotions, references, aesthetic)
- Choose EXTREME tone (no middle ground)
- Use oklch() colors, distinctive fonts
- GSAP ScrollTrigger for storytelling
- Three.js for immersive moments
- Auto-animate for effortless list transitions
- Audit every decision against UX principles
