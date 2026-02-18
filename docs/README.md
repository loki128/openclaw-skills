# DRD Whey Website

**LEGACY STRENGTH** - A bold, premium, masculine website for DR Dan's No-BS Whey Protein.

## Design System

### Colors
- **Background**: Deep charcoal/black (#0a0a0a, #141414)
- **Text**: Off-white (#f5f5f5, #e8e8e8)
- **Accent**: Deep red (#8b0000, #a50000)
- **Muted**: Warm gray (#888888)

### Typography
- **Display**: Bebas Neue (headlines)
- **Body**: Inter (content)

### Signature Motif
**Red Measurement Bars** - Used consistently across:
- Headings (heading-bar class)
- Separators (motif-bar class)
- CTAs and accents

### Unique Components

1. **Purity Dashboard** - Macro/test panel showing protein content, testing status
2. **No-BS Stamp Badge** - Verification badges for clean ingredients
3. **Ingredient Transparency Table** - Full breakdown with status indicators

## Pages

- `index.html` - Landing page with hero, purity dashboard, why it works
- `product.html` - Product details, nutrition facts, how to use
- `ingredients.html` - Complete ingredient breakdown, testing info
- `about.html` - Origin story, principles, who we serve
- `faq.html` - Common questions organized by topic
- `contact.html` - Contact form and info

## File Structure

```
drd-whey/
├── index.html
├── product.html
├── ingredients.html
├── about.html
├── faq.html
├── contact.html
├── css/
│   └── drd-styles.css
├── images/
│   └── (add your photos here)
└── README.md
```

## Photography Guidelines

### Hero Image
- Athletic man, 45-55 years old
- Fit, confident, healthy appearance
- Post-workout or active setting
- Dark/moody lighting preferred

### Product Images
- Clean, professional product shots
- Dark background
- Show tub, scoop, texture

### Lifestyle Images
- Mature athletes (40-65)
- Gym or home workout setting
- Capable, disciplined, healthy
- Avoid: extreme bodybuilding, teenage aesthetics

## Deployment

### Option 1: Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `drd-whey` folder
3. Site goes live instantly

### Option 2: GitHub Pages

1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch, root folder
5. Site will be at `username.github.io/repo-name`

### Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project folder
3. Follow prompts

### Option 4: Traditional Hosting

Upload all files to your web host via FTP/SFTP.

## Customization

### Changing Colors
Edit CSS variables in `css/drd-styles.css`:
```css
:root {
  --drd-black: #0a0a0a;
  --drd-red: #8b0000;
  /* etc */
}
```

### Adding Real Images
Replace placeholder divs with actual images:
```html
<!-- Replace this -->
<div class="hero-image-placeholder">...placeholder...</div>

<!-- With this -->
<img src="images/your-photo.jpg" alt="Description">
```

### Updating Content
All content is in plain HTML. Edit the text directly in each file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Fonts: Google Fonts (Bebas Neue, Inter)
- Icons: Lucide (via SVG)
- CSS Framework: Tailwind CSS (via CDN)

## License

Created for DRD Whey. All rights reserved.