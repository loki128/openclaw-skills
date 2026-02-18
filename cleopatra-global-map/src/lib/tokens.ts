// Design Tokens - Cleopatra Delights World Experience
// Luxury + Street Market Edge

export const tokens = {
  // Core Colors - Rich, cinematic dark
  colors: {
    void: '#050505',
    abyss: '#0a0a0a',
    charcoal: '#111111',
    graphite: '#1a1a1a',
    smoke: '#2a2a2a',
    mist: '#3a3a3a',
    
    // Gold - Used sparingly as accent
    gold: {
      400: '#D4AF37',
      500: '#C5A028',
      600: '#B08D1F',
      glow: 'rgba(212, 175, 55, 0.3)',
    },
    
    // Region accent colors (subtle)
    regions: {
      egypt: '#C9A227',
      turkey: '#C41E3A',
      greece: '#0066CC',
      italy: '#16A34A',
      france: '#1E40AF',
      saudi: '#059669',
      china: '#DC2626',
      america: '#3B82F6',
    },
    
    // Text
    text: {
      primary: '#FAFAFA',
      secondary: '#A3A3A3',
      muted: '#737373',
      inverse: '#050505',
    },
  },
  
  // Typography - Elite combination
  fonts: {
    display: "'Playfair Display', Georgia, 'Times New Roman', serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    accent: "'Bebas Neue', 'Arial Narrow', sans-serif",
  },
  
  // Spacing - Generous, breathing room
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem',
    xxl: '8rem',
  },
  
  // Animation - Premium, intentional
  motion: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '800ms cubic-bezier(0.16, 1, 0.3, 1)',
    dramatic: '1200ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  
  // Effects
  effects: {
    noise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    vignette: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
    goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #F4E4BC 50%, #D4AF37 100%)',
  },
  
  // Shadows - Depth without clutter
  shadows: {
    sm: '0 2px 8px rgba(0,0,0,0.3)',
    md: '0 4px 20px rgba(0,0,0,0.4)',
    lg: '0 8px 40px rgba(0,0,0,0.5)',
    gold: '0 0 40px rgba(212, 175, 55, 0.2)',
    lift: '0 20px 60px rgba(0,0,0,0.6)',
  },
  
  // Border radius - Minimal, sharp luxury
  radius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
  },
};

// Journey Route - The path through regions
export const journeyRoute = [
  { 
    id: 'egypt', 
    name: 'Egypt', 
    tagline: 'Where It Began',
    coordinates: { x: 52, y: 45 },
    chapter: 1,
  },
  { 
    id: 'turkey', 
    name: 'Turkey', 
    tagline: 'The Crossroads',
    coordinates: { x: 55, y: 38 },
    chapter: 2,
  },
  { 
    id: 'greece', 
    name: 'Greece', 
    tagline: 'Mediterranean Sun',
    coordinates: { x: 53, y: 38 },
    chapter: 3,
  },
  { 
    id: 'italy', 
    name: 'Italy', 
    tagline: 'La Dolce Vita',
    coordinates: { x: 50, y: 35 },
    chapter: 4,
  },
  { 
    id: 'france', 
    name: 'France', 
    tagline: 'Haute Patisserie',
    coordinates: { x: 48, y: 32 },
    chapter: 5,
  },
  { 
    id: 'saudi', 
    name: 'Saudi Arabia', 
    tagline: 'Desert Hospitality',
    coordinates: { x: 58, y: 48 },
    chapter: 6,
  },
  { 
    id: 'china', 
    name: 'China', 
    tagline: 'Ancient Craft',
    coordinates: { x: 72, y: 40 },
    chapter: 7,
  },
  { 
    id: 'america', 
    name: 'America', 
    tagline: 'Modern Fusion',
    coordinates: { x: 22, y: 35 },
    chapter: 8,
  },
];

export default tokens;