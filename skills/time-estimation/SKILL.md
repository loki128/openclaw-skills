# Time Estimation & Options Protocol

**Status:** Active | **Trigger:** Before starting any task

---

## The Rule

**NEVER start work without:**
1. Giving ETA
2. Offering 3 time options
3. Waiting for user selection

---

## The 3 Options

| Option | Time | Output Level | Best For |
|--------|------|--------------|----------|
| **Quick** | 1-10 min | Functional, minimal | MVP, proof of concept, urgent fix |
| **Medium** | 20-30 min | Polished, complete | Standard website, feature addition |
| **God Mode** | 1-5 hrs | Maximum strength, premium | Flagship project, complex system, wow factor |

---

## Response Format

```
User: "Build me a website"

Me: I can build this website. Here are your options:

┌─────────────────────────────────────────┐
│  QUICK        │  5 min   │ Basic HTML, single page, essential content only    │
│  MEDIUM       │  25 min  │ Full site, responsive, styled, animations, stock images │
│  GOD MODE     │  2 hrs   │ Premium everything: GSAP animations, 3D effects, custom graphics, optimized performance │
└─────────────────────────────────────────┘

Which option? (Quick/Medium/God)
```

---

## Examples by Task Type

### Website Build
| Quick | Medium | God Mode |
|-------|--------|----------|
| Single HTML file | Multi-page, styled | Full design system, animations, CMS-ready |
| Basic CSS | Tailwind + custom CSS | GSAP, Three.js, custom shaders |
| Placeholder text | Stock images | Custom graphics, illustrations |
| No JS | Basic interactions | Complex animations, state management |

### Code Fix
| Quick | Medium | God Mode |
|-------|--------|----------|
| One-liner fix | Root cause + fix + test | Full refactor + tests + docs |
| 1 min | 10 min | 1 hr |

### Research
| Quick | Medium | God Mode |
|-------|--------|----------|
| 3 sources | 10 sources, summarized | Deep dive, synthesis, recommendations |
| 2 min | 15 min | 1+ hrs |

---

## ETA Format

Always include:
```
ETA: X minutes
Started: [timestamp]
Expected complete: [timestamp]
```

---

## User Selection

Wait for explicit choice:
- ✅ "Quick"
- ✅ "Medium"
- ✅ "God mode"
- ✅ "2 hours" (specific time)

Then confirm:
```
Got it. Going with MEDIUM (25 min).
ETA: 15:35 (25 min from now)
Starting...
```

---

## During Work

Update at 50% and 90%:
```
[50%] On track. Hero section done, working on animations...
[90%] Almost done. Final polish and testing...
[100%] Complete! Here's what I built...
```

---

## If Running Over

```
⚠️ Taking longer than estimated (30 min vs 25 min ETA)

Options:
1. Wrap up quickly (5 min) — ship what we have
2. Extend to full God Mode (+30 min) — do it right
3. Pause — you decide next steps

What would you like?
```

---

## Integration

Use with other skills:
- **Environment Audit** → Check setup first
- **Cost Tracker** → Log time against estimate
- **Continuous Learning** → Learn from estimation accuracy
