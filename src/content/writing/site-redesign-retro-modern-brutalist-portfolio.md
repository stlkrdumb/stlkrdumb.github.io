---
title: "Site Redesign: Retro-Modern Brutalist Portfolio"
description: "Documenting the redesign of byrai.xyz — a retro-modern brutalist portfolio with window frame components, bold typography, and editorial clarity."
pubDate: 2026-07-14
heroImage: /pfp.png
readingTime: "8 min read"
---

# Site Redesign: Retro-Modern Brutalist Portfolio

## The Vision

We set out to rebuild **byrai.xyz** from the ground up , not just a generic portfolio template, but a site with personality, intention, and craft. The goal was clear: create something that stands out in a sea of cream-colored SaaS templates.

The result? A **retro-modern brutalist** design system inspired by window frames, bold typography, and editorial clarity.

---

## Design Philosophy

### Retro-Modern Brutalism

Brutalism in web design isn't about being ugly , it's about being honest. Hard edges. No gradients. No glassmorphism. Just structure, typography, and purpose.

We took that philosophy and updated it for 2026:
- **Hard borders** (3px instead of the typical 1-2px)
- **Window frame components** with dot headers
- **Surface backgrounds** for alternating sections
- **Gold accent** (#d4a853) , later changed to blue (#2563eb)

### Typography as Architecture

The site uses three typefaces, each with a clear role:

| Font | Role | Why |
|------|------|-----|
| **Inter** | UI, headings, navigation | Clean, geometric, highly legible |
| **Spectral** | Article body, long-form content | Humanist serif, comfortable for reading |
| **JetBrains Mono** | Code, metadata, labels | Technical, precise, monospaced |

The hero heading , "Hello. I'm Rai." , uses Inter at 8xl size with tight tracking and a 0.9 line height. It's bold without being shouty.

---

## Key Components

### Window Frame

The signature component. Inspired by old desktop UIs, the window frame includes:
- Hard 3px border
- Dot header (traffic light style)
- Title bar with date metadata
- Full-color image inside

```astro
<div class="window-frame">
  <div class="window-frame-header">
    <div class="window-frame-dots">
      <div class="window-frame-dot"></div>
      <div class="window-frame-dot"></div>
    </div>
    <span class="window-frame-title">Jul 14, 2026</span>
  </div>
  <div class="overflow-hidden aspect-[4/3]">
    <img src="/path/to/image.png" alt="Description" />
  </div>
</div>
```

### Quick Links Grid

The homepage features a minimal two-button grid:
- **Writing** , Blog posts and long-form content
- **Projects** , Portfolio case studies

Each link uses the brutalist border system with hover states that transition to the accent color.

### Profile Picture Hero

The hero section pairs bold typography with a profile image:
- Left: "Hello. I'm Rai." heading + subtitle
- Right: Profile picture in a bordered frame

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Astro (SSG) |
| **Styling** | Tailwind CSS v4 |
| **Content** | Content Collections API |
| **Search** | Pagefind |
| **SEO** | BaseHead component with JSON-LD |

### Design Tokens

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-foreground: #000000;
  --color-muted: #666666;
  --color-border: #000000;
  --color-accent: #2563eb;
}
```

Dark mode inverts the palette while maintaining contrast ratios.

---

## The Process

### Phase 1: Foundation
- Set up Astro + Tailwind project
- Define design tokens and color system
- Create BaseHead component for SEO
- Implement content collections schema

### Phase 2: Components
- Build window frame component
- Create Header with centered nav links
- Design Footer with social icons
- Implement ThemeToggle (dark/light mode)

### Phase 3: Pages
- Homepage with hero + quick links
- Work listing page with window frame cards
- Writing listing page with year-grouped list
- Blog post layout with table of contents
- Portfolio post layout with tech stack tags

### Phase 4: Polish
- Accessibility audit (focus indicators, touch targets)
- Performance optimization (lazy loading, image sizing)
- Responsive testing across breakpoints
- Dark mode contrast fixes

---

## Lessons Learned

### What Worked

1. **Hard borders over shadows** , Creates visual hierarchy without muddiness
2. **Consistent border thickness** , 3px everywhere feels intentional
3. **Typography-first approach** , Let fonts do the heavy lifting
4. **Content collections API** , Type-safe, predictable, fast

### What We'd Change

1. **Start with dark mode earlier** , Some tokens needed inversion logic we could've planned for
2. **More component tests** , A few border-radius inconsistencies slipped through
3. **Faster image optimization** , Could've used Astro's Image component more aggressively

---

## Results

The redesign shipped with:
- ✅ WCAG AA accessibility compliance
- ✅ 90+ Lighthouse performance score
- ✅ Full dark mode support
- ✅ Content Collections for type-safe content management
- ✅ Custom publishoor MCP server for streamlined content creation

The site now feels like a **designed object** rather than a template. Every border, every typeface choice, every spacing decision is intentional.

---

## Looking Ahead

Future iterations might include:
- Animated window frame transitions
- More interactive project previews
- Expanded writing section with categories
- RSS feed integration

The foundation is solid. The design system is extensible. And the site finally feels like home.

---

*This post documents the redesign process. All code and design decisions are open source , check the repository for details.*