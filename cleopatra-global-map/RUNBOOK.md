# Cleopatra Delights - World Dessert Experience

## Overview
A premium, cinematic interactive website showcasing global dessert mastery across 8 culinary kingdoms.

## Tech Stack
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Build Output:** Static export (no backend required)

## Installation & Running

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Install Dependencies
```bash
cd cleopatra-global-map
npm install
```

### Development Server
```bash
npm run dev
```
Open http://localhost:3000

### Production Build
```bash
npm run build
```
Static files output to `/dist` folder

### Serve Production Build
```bash
npx serve dist
```

## Project Structure

```
cleopatra-global-map/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Home page (cinematic hero + journey)
│   │   ├── layout.tsx         # Root layout with fonts
│   │   ├── globals.css        # Global styles + design tokens
│   │   ├── about/             # About page
│   │   ├── menu/              # Global menu page
│   │   ├── passport/          # Passport/stamp collection
│   │   └── region/[slug]/     # Region detail pages
│   │       ├── page.tsx       # Server component
│   │       └── RegionClient.tsx # Client component
│   ├── components/
│   │   ├── cinematic/         # Cinematic sections
│   │   │   ├── CinematicHero.tsx
│   │   │   ├── JourneyTimeline.tsx
│   │   │   └── WeeklyDrops.tsx
│   │   └── interactive/       # Interactive components
│   │       ├── Navigation.tsx
│   │       └── Footer.tsx
│   ├── data/
│   │   └── regions.ts         # All region data
│   └── lib/
│       └── tokens.ts          # Design tokens
├── dist/                      # Static build output
└── package.json
```

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--void` | #050505 | Deepest background |
| `--charcoal` | #111111 | Card backgrounds |
| `--gold-400` | #D4AF37 | Primary accent |
| `--text-primary` | #FAFAFA | Headlines |
| `--text-secondary` | #A3A3A3 | Body text |

### Typography
- **Display:** Playfair Display (serif) - Headlines
- **Body:** Inter (sans-serif) - Body text

### Spacing Scale
- xs: 0.5rem
- sm: 1rem
- md: 2rem
- lg: 4rem
- xl: 6rem

## How to Add a New Region

1. **Edit `src/data/regions.ts`**
   Add new region object to the `regions` array:

```typescript
{
  slug: 'japan',
  name: 'Japan',
  nameLocal: '日本',
  accentColor: '#E91E63',
  accentSecondary: '#F48FB1',
  storyLine: 'Where precision meets artistry.',
  mythicStory: 'Japanese wagashi...',
  coordinates: { x: 78, y: 38 },
  signatureSweets: 'Mochi, Dorayaki, Taiyaki',
  flavorProfile: ['Matcha', 'Red bean', 'Sesame', 'Yuzu'],
  techniques: [
    'Mochi pounding - achieving the perfect chew',
    'Matcha whisking - ceremonial grade preparation',
    // ...
  ],
  desserts: [
    {
      id: 'japan-1',
      name: 'Mochi',
      description: 'Chewy rice cakes with sweet fillings',
      image: 'https://images.unsplash.com/...',
      tags: ['Rice', 'Chewy'],
      flavorNotes: ['Soft', 'Sweet', 'Chewy']
    },
    // ...
  ]
}
```

2. **Add to journey route in `src/lib/tokens.ts`**
```typescript
export const journeyRoute = [
  // ... existing regions
  { 
    id: 'japan', 
    name: 'Japan', 
    tagline: 'Precision & Artistry',
    coordinates: { x: 78, y: 38 },
    chapter: 9,
  },
];
```

3. **Rebuild**
```bash
npm run build
```

## How to Change Images

Edit the `image` field in `src/data/regions.ts`:

```typescript
desserts: [
  {
    id: 'egypt-1',
    name: 'Kunafa',
    description: '...',
    image: 'https://your-new-image-url.jpg', // Change this
    tags: ['Cheese', 'Syrup'],
    flavorNotes: ['Crispy', 'Gooey']
  }
]
```

For local images, place them in `public/` folder and reference as `/your-image.jpg`.

## How to Change Drop Schedule

Edit `src/components/cinematic/WeeklyDrops.tsx`:

```typescript
const weeklyDrops = [
  {
    id: 'drop-1',
    name: 'Your New Drop',
    region: 'Region Name',
    description: 'Description here',
    price: '$99',
    image: 'https://...',
    tags: ['Limited', 'New'],
    stock: 20,
  },
  // ...
];
```

## Accessibility Features

- Reduced motion support via `useReducedMotion()` hook
- Proper heading hierarchy (h1 → h2 → h3)
- Focus states on all interactive elements
- Alt text on all images
- Semantic HTML structure
- Keyboard navigation support

## Performance Optimizations

- Static site generation (SSG)
- Image optimization via Next.js Image component
- Code splitting by route
- CSS optimization via Tailwind
- Reduced motion for accessibility

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2024 Cleopatra Delights. All rights reserved.