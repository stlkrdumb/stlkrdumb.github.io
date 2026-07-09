# Personal Site Redesign: Portfolio-First Architecture

**Date:** 2026-07-09  
**Status:** Approved  
**Goal:** Restructure byrai.xyz as a portfolio-focused personal site with blog as secondary experience.

---

## Problem Statement

Current homepage treats portfolio and blog equally, diluting the primary purpose (showcasing work). The site needs two distinct experiences: a visual-first portfolio studio and a text-forward writing journal.

---

## Design Decisions

### 1. Homepage: Split Landing

**Route:** `/`  
**Purpose:** Entry point that gives both experiences equal weight at first visit.

**Layout:**
- Two-panel split layout (50/50 on desktop, stacked on mobile)
- **Left panel:** Featured project image → links to `/work`
- **Right panel:** Editorial text treatment → links to `/writing`
- **Interaction:** Hover effects (grayscale→color for image, opacity shift for text)

**No content on homepage itself** — it's purely a navigational split.

---

### 2. Portfolio Experience: `/work`

**Route:** `/work` (was `/portfolio`)  
**Mood:** Design studio showcase, visual-first.

#### Featured Project Hero
- Full-width hero image (largest project or `featured: true` frontmatter flag)
- Title + one-line description
- Tech stack pills
- "View Case Study" CTA button

#### Project Grid
- **Mixed sizes:** Some projects span 2 columns (larger), others are single column (smaller)
- Creates visual rhythm through size variation
- Each card shows: hero image, title, one-line description, tech stack pills (hover to reveal)
- Click → individual case study page

#### Case Study Page: `/work/[slug]`
**Layout:** Reuses enhanced `PortfolioPost.astro`

**Structure:**
1. Hero image (full-width, large)
2. Title + description + tech stack
3. **Challenge** section — problem statement
4. **Approach** section — technical decisions, process
5. **Outcome** section — results, learnings, next steps
6. Links to live demo / repository

**Frontmatter additions:**
```yaml
featured: true  # Optional — controls homepage hero (defaults to first project)
```

---

### 3. Writing Experience: `/writing`

**Route:** `/writing` (was `/blog`)  
**Mood:** Editorial journal, text-forward.

#### Archive Page Layout
- Minimal, typography-driven
- No cards, no images, no tech stack pills
- Posts grouped by year (2026, 2025, etc.) with serif headings
- Each entry: date (monospace) + title (serif, hover underline in accent color)
- Reading time omitted on archive view

#### Blog Post Page: `/writing/[slug]`
**Layout:** Reuses existing `BlogPost.astro` unchanged.  
**SEO/Analytics:** All existing functionality preserved (OG images, RSS, structured data).

---

### 4. Navigation

**Header changes:**
```
Before: Home | Blog | Work
After:  Portfolio | Writing
```

- Remove "Home" from nav (homepage is now split landing)
- "Portfolio" → `/work`, "Writing" → `/writing`
- Keep theme toggle, search icon, logo as-is
- Active state indicator (gold underline) preserved

**Footer:** Unchanged — social links, copyright, logo.

---

### 5. Content Structure

**Unchanged collections:**
- `src/content/blog/` → routes to `/writing/[slug]`
- `src/content/portfolio/` → routes to `/work/[slug]`

**New frontmatter field (optional):**
```yaml
featured: true  # Controls which project appears in homepage hero
```

**Case study markdown structure:**
```markdown
---
title: Project Name
description: One-line summary
pubDate: 2025-06-07
heroImage: ./cover.jpg
techStack:
  - Rust
  - Solidity
featured: true
---

## Challenge
What problem were you solving?

## Approach
How did you tackle it? Technical decisions.

## Outcome
Results, learnings, what's next.
```

---

### 6. Visual Design

**Design DNA:** Unchanged — Spectral (serif) + Inter (sans), `#d4a017` gold accent, grain texture overlay.

**Hierarchy adjustments:**
- Portfolio pages: Larger imagery, more whitespace, visual rhythm through mixed grid sizes
- Writing pages: Pure typography hierarchy, minimal decoration, editorial feel
- Both share the same color palette and typography but differ in layout density

---

### 7. Technical Constraints

**No new dependencies.** All changes use existing:
- Astro 6 (file-based routing)
- Tailwind CSS v4 (utility classes)
- Pagefind (search)
- Satori + Resvg (OG images)

**Performance priorities:**
- Images lazy-loaded (Astro native)
- No new JavaScript packages
- Minimal re-rendering on route changes

---

## Success Criteria

1. Homepage immediately communicates "this is a portfolio site" with writing as secondary
2. Portfolio experience feels like a design studio showcase (visual, project-driven)
3. Writing experience feels like an editorial journal (text-forward, minimal)
4. Navigation is clear and consistent between experiences
5. No regression in SEO, analytics, or search functionality
6. Existing content (12 blog posts, 6 projects) requires minimal migration

---

## Migration Notes

- Rename routes: `/portfolio` → `/work`, `/blog` → `/writing`
- Add `featured: true` to one portfolio project for homepage hero
- Enhance 2-3 case studies with Challenge/Approach/Outcome sections (optional, can be done incrementally)
- Update nav links in `Header.astro`
- Replace `index.astro` with split landing

---

## Out of Scope

- New animation libraries (keep current CSS keyframes)
- CMS integration (content remains in Markdown/MDX files)
- User authentication or comments
- Multi-language support
- Dark mode improvements (existing implementation sufficient)
