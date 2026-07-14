# DESIGN.md — byrai.xyz Design System

## Design Philosophy

**Retro-modern brutalism meets editorial clarity.** Clean structure, bold typography, intentional whitespace. Inspired by early web aesthetics but executed with modern precision.

---

## Color Palette

### Primary Colors
```css
--color-background: #ffffff;
--color-surface: #f5f5f5;
--color-foreground: #000000;
--color-muted: #666666;
--color-border: #000000;
```

### Accent (Gold — Editorial Touch)
```css
--color-accent: #d4a853;  /* Warm gold for highlights */
```

### Semantic Colors
- **Background**: White (#ffffff) — Main content areas
- **Surface**: Light gray (#f5f5f5) — Cards, sections, alternating backgrounds
- **Foreground**: Black (#000000) — Text, borders, icons
- **Muted**: Medium gray (#666666) — Secondary text, descriptions
- **Border**: Black (#000000) — Hard edges, dividers
- **Accent**: Gold (#d4a853) — Links, CTAs, highlights (sparingly)

---

## Typography

### Font Family
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-serif: 'Spectral', Georgia, serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale
```css
/* Display / Hero */
h1 { font-size: 3.5rem; line-height: 1.1; font-weight: 800; }  /* Hello. I'm Mac. */

/* Section Headers */
h2 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; }  /* Projects, From the blog */

/* Subheaders / Cards */
h3 { font-size: 1.5rem; line-height: 1.3; font-weight: 600; }  /* Possimus, Dolorum Ullam Totam */

/* Body */
p { font-size: 1rem; line-height: 1.6; color: var(--color-muted); }

/* Small / Meta */
small { font-size: 0.875rem; line-height: 1.4; font-family: var(--font-mono); }
```

### Typography Rules
- **Headings**: Bold, tight line-height, uppercase sparingly
- **Body**: Comfortable reading width (max 65ch), generous line-height
- **Mono**: Used for dates, tags, technical metadata
- **Serif**: Optional for editorial flourishes

---

## Layout Patterns

### Page Structure
```
┌─────────────────────────────────────┐
│ Navigation Bar                      │
├─────────────────────────────────────┤
│ Hero Section                        │
│ (Bold intro + illustration)         │
├─────────────────────────────────────┤
│ Quick Links Grid                    │
│ (4-column button grid)              │
├─────────────────────────────────────┤
│ Projects Section                    │
│ (Alternating background)            │
│ ┌───────────────────────────────┐   │
│ │ Window Frame                  │   │
│ │ [Image]                       │   │
│ │ Title + Description           │   │
│ │ [View Project Button]         │   │
│ └───────────────────────────────┘   │
├─────────────────────────────────────┤
│ Blog Section                        │
│ (Overlapping card layout)           │
└─────────────────────────────────────┘
```

### Spacing System
- **Section padding**: 80px vertical, 24px horizontal
- **Card padding**: 24px
- **Grid gap**: 32px
- **Component gap**: 16px

---

## Component Styles

### Navigation Bar
```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 2px solid var(--color-border);
  background: var(--color-background);
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-foreground);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-accent);
}
```

### Hero Section
```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 80px 24px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--color-muted);
  margin-bottom: 24px;
}

.hero-illustration {
  width: 100%;
  height: auto;
  max-width: 400px;
  margin-left: auto;
}
```

### Quick Links Grid
```css
.quick-links {
  padding: 48px 24px;
  background: var(--color-surface);
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.quick-link-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-foreground);
  text-decoration: none;
  transition: all 0.2s ease;
}

.quick-link-btn:hover {
  background: var(--color-foreground);
  color: var(--color-background);
  transform: translateY(-2px);
}

.quick-link-btn svg {
  width: 16px;
  height: 16px;
}
```

### Project Cards (Window Frame Pattern)
```css
.projects-section {
  padding: 80px 24px;
  background: var(--color-background);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  border: 2px solid var(--color-border);
  background: var(--color-background);
  overflow: hidden;
}

.project-window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-surface);
  border-bottom: 2px solid var(--color-border);
}

.project-window-dots {
  display: flex;
  gap: 6px;
}

.project-window-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
}

.project-window-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
}

.project-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  /* COLOR IMAGES — NOT B&W */
}

.project-content {
  padding: 24px;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-muted);
  margin-bottom: 16px;
}

.project-link {
  display: inline-block;
  padding: 8px 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-foreground);
  text-decoration: none;
  transition: all 0.2s ease;
}

.project-link:hover {
  background: var(--color-foreground);
  color: var(--color-background);
}
```

### Blog Section (Overlapping Cards)
```css
.blog-section {
  padding: 80px 24px;
  background: var(--color-surface);
}

.blog-header {
  max-width: 1200px;
  margin: 0 auto 48px;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.blog-link {
  font-size: 0.9rem;
  color: var(--color-muted);
  text-decoration: underline;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* Overlapping effect — staggered layout */
.blog-card:nth-child(2) {
  transform: translateY(32px);
}

.blog-card:nth-child(3) {
  transform: translateY(-16px);
}

.blog-card {
  border: 2px solid var(--color-border);
  background: var(--color-background);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  /* COLOR IMAGES — NOT B&W */
}

.blog-content {
  padding: 20px;
}

.blog-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 8px;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.blog-excerpt {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-muted);
}
```

---

## Interactive States

### Hover Effects
- **Cards**: `transform: translateY(-2px)` or `translateY(-4px)`
- **Buttons**: Background swap (light ↔ dark)
- **Links**: Color change to accent/gold
- **Images**: Subtle scale (1.02x) on hover containers

### Transitions
```css
transition: all 0.2s ease;
```

Consistent, snappy, not elastic.

---

## Image Treatment

### Key Difference from Reference
**Images are FULL COLOR**, not black and white filtered.

### Guidelines
- **Hero images**: 1200x630px for OG tags
- **Project cards**: 800x400px minimum
- **Blog thumbnails**: 600x400px minimum
- **Aspect ratio**: 16:9 preferred
- **Alt text**: Descriptive, under 125 characters
- **Lazy load**: Add `loading="lazy"` to below-fold images

### Image Styles
```css
.project-image,
.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* NO filter: grayscale() */
}
```

---

## Pattern Elements

### Window Frame Dots
Three small circles (8px diameter) in header bars — inspired by old browser windows.

```html
<div class="project-window-dots">
  <div class="project-window-dot"></div>
  <div class="project-window-dot"></div>
</div>
```

### Halftone/Dot Patterns
Subtle dot grid backgrounds for section differentiation (optional, use sparingly).

### Hard Borders
2px solid black borders on all cards and components. No rounded corners (or max 4px).

---

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px — Single column, stack everything
- **Tablet**: 768px–1024px — Two columns for projects/blog
- **Desktop**: > 1024px — Full layout with grid

### Mobile Adjustments
- Hero: Stack vertically (text top, illustration bottom)
- Quick links: 2x2 grid instead of 4x1
- Projects/Blog: Single column
- Reduce font sizes by 20%

---

## Accessibility

- **Contrast**: Minimum 4.5:1 for text, 3:1 for large text
- **Focus states**: Visible outline on all interactive elements
- **Alt text**: Descriptive, contextual
- **Semantic HTML**: Use `<article>`, `<nav>`, `<main>`, `<section>`
- **Keyboard navigation**: All interactive elements reachable via Tab

---

## Implementation Notes

### Tailwind Configuration
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f5f5f5',
        foreground: '#000000',
        muted: '#666666',
        border: '#000000',
        accent: '#d4a853',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Spectral', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

### Astro Integration
- Use `<Image>` component for optimization
- Content Collections for structured data
- SSG for all pages
- BaseHead.astro for meta tags

---

## Design Principles Summary

1. **Bold typography** — Large, confident headings
2. **Hard edges** — 2px borders, minimal rounding
3. **High contrast** — Black on white, white on black
4. **Structured grids** — Clear alignment, consistent spacing
5. **Retro-modern** — Window frames, mono fonts, but clean execution
6. **Color images** — Full color photography, not filtered
7. **Sparse accent** — Gold used sparingly for highlights

---

*Design system inspired by retro web aesthetics, refined for modern editorial clarity.*
