// Layout System - Strict spacing tokens
// Based on requirements: no cramped UIs

export const layout = {
  // Container
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  // Reading width for paragraphs
  readingWidth: {
    maxWidth: '68ch',
  },
  
  // Gutters
  gutters: {
    mobile: '20px',
    tablet: '32px',
    desktop: '48px',
  },
  
  // Section padding Y
  sectionPadding: {
    mobile: '72px',
    tablet: '96px',
    desktop: '120px',
  },
  
  // Spacing scale
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
    9: '96px',
  },
  
  // Typography
  typography: {
    body: {
      size: '17px',
      lineHeight: '1.7',
    },
    small: {
      size: '14px',
      lineHeight: '1.6',
    },
    h1: {
      size: 'clamp(40px, 5vw, 84px)',
      lineHeight: '1.05',
    },
    h2: {
      size: 'clamp(28px, 3vw, 52px)',
      lineHeight: '1.15',
    },
  },
  
  // Tap targets
  tapTarget: {
    minHeight: '44px',
  },
  
  // Card padding
  cardPadding: {
    mobile: '16px',
    desktop: '24px',
  },
};

// Breakpoints
export const breakpoints = {
  mobile: '390px',
  tablet: '768px',
  laptop: '1280px',
  desktop: '1440px',
};

export default layout;