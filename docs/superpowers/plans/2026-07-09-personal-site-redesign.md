# Personal Site Redesign: Portfolio-First Architecture

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure byrai.xyz as a portfolio-focused personal site with blog as secondary experience, using a split landing homepage and two distinct visual experiences.

**Architecture:** File-based routing in Astro with Tailwind CSS utility classes. Rename routes (`/portfolio` → `/work`, `/blog` → `/writing`), create new split landing at `/`, build portfolio homepage with featured hero + mixed grid, build writing archive as minimal text list. No new dependencies.

**Tech Stack:** Astro 6, Tailwind CSS v4, Pagefind (search), Satori + Resvg (OG images), existing Astro content collections API.

## Global Constraints

- **No new dependencies** — use only existing Astro, Tailwind, Pagefind, Satori
- **Existing content preserved** — 12 blog posts in `src/content/blog/`, 6 projects in `src/content/portfolio/`
- **Route names:** `/work` (was `/portfolio`), `/writing` (was `/blog`)
- **Design DNA:** Spectral (serif) + Inter (sans), `#d4a017` gold accent, grain texture overlay
- **Featured project:** First project by default, or `featured: true` frontmatter flag
- **Case study structure:** Challenge → Approach → Outcome sections (Markdown headings)

---

### Task 1: Update Content Collection Schema

**Files:**
- Modify: `src/content.config.ts:15-25`

**Interfaces:**
- Consumes: Existing blog and portfolio collection definitions
- Produces: Enhanced portfolio schema with optional `featured` field

- [ ] **Step 1: Add `featured` field to portfolio schema**

```typescript
const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			techStack: z.array(z.string()).optional(),
			featured: z.boolean().optional().default(false), // NEW
		}),
});
```

- [ ] **Step 2: Run build to verify schema compiles**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "chore: add featured field to portfolio schema"
```

---

### Task 2: Mark Featured Project

**Files:**
- Modify: `src/content/portfolio/<first-project>.md` (or whichever project should be featured)

**Interfaces:**
- Consumes: Existing portfolio frontmatter
- Produces: One project marked as `featured: true` for homepage hero

- [ ] **Step 1: Add `featured: true` to first project's frontmatter**

```yaml
---
title: Project Name
description: Brief description of the project.
pubDate: 2025-06-07
heroImage: ./cover.jpg
techStack:
  - Rust
  - Solidity
featured: true  # NEW
---
```

- [ ] **Step 2: Verify build still succeeds**

Run: `npm run build`
Expected: Build succeeds, no errors

- [ ] **Step 3: Commit**

```bash
git add src/content/portfolio/<first-project>.md
git commit -m "chore: mark first project as featured"
```

---

### Task 3: Create Split Landing Homepage

**Files:**
- Create: `src/pages/index.astro` (replace existing)

**Interfaces:**
- Consumes: Featured project from portfolio collection
- Produces: Two-panel split landing (Projects image panel | Writing text panel)

- [ ] **Step 1: Write split landing homepage**

```astro
---
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

const projects = await getCollection('portfolio');
const featured = projects.find(p => p.data.featured) || projects[0];
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} ogImageUrl="/og-default.png" />
  </head>
  <body class="min-h-screen flex flex-col bg-background text-foreground">

    <Header />

    <main class="flex-1 flex flex-col">

      <!-- Split Landing: Projects | Writing -->
      <section class="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 py-24 flex-1 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center">

        <!-- Left Panel: Projects (visual) -->
        <a href="/work" class="group block relative overflow-hidden border border-border aspect-[4/3] md:aspect-auto md:flex-1 md:h-[500px]">
          {featured && (
            <img
              src={featured.data.heroImage.src}
              alt={featured.data.title}
              width="800"
              height="600"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
          )}
          <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted block mb-2">Portfolio</span>
            <h2 class="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
              {featured?.data.title || 'View Projects'}
            </h2>
          </div>
        </a>

        <!-- Right Panel: Writing (text) -->
        <a href="/writing" class="group block border border-border aspect-[4/3] md:aspect-auto md:flex-1 md:h-[500px] flex flex-col justify-center items-start p-6 md:p-10 bg-muted/5 hover:bg-muted/10 transition-colors duration-300">
          <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted block mb-4">Writing</span>
          <h2 class="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground group-hover:text-accent transition-colors duration-300 leading-tight mb-4">
            Read the Journal
          </h2>
          <p class="text-muted text-sm md:text-base leading-relaxed max-w-md">
            Thoughts on technology, architecture, and the spaces in between.
          </p>
        </a>

      </section>

    </main>

    <Footer />

  </body>
</html>
```

- [ ] **Step 2: Run dev server to verify**

Run: `npm run dev`
Expected: Homepage shows split landing with featured project image on left, text panel on right. Clicking panels navigates to `/work` and `/writing`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: replace homepage with split landing (Projects | Writing)"
```

---

### Task 4: Update Header Navigation

**Files:**
- Modify: `src/components/Header.astro`

**Interfaces:**
- Consumes: Existing Header structure, ThemeToggle, SITE_TITLE
- Produces: Updated nav links (Portfolio → /work, Writing → /writing, remove Home)

- [ ] **Step 1: Update nav links array**

```typescript
const navLinks = [
  { href: '/work', label: 'Portfolio' },
  { href: '/writing', label: 'Writing' },
];
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds, no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "chore: update nav links to Portfolio | Writing"
```

---

### Task 5: Create Portfolio Homepage (`/work`)

**Files:**
- Create: `src/pages/work/index.astro`

**Interfaces:**
- Consumes: All portfolio projects from content collection
- Produces: Featured hero + mixed-size project grid

- [ ] **Step 1: Write portfolio homepage**

```astro
---
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

const projects = await getCollection('portfolio');
const featured = projects.find(p => p.data.featured) || projects[0];
const others = projects.filter(p => p.id !== featured.id);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} ogImageUrl="/og-default.png" />
  </head>
  <body class="min-h-screen flex flex-col bg-background text-foreground">

    <Header />

    <main class="flex-1 flex flex-col">

      <!-- Featured Project Hero -->
      <section class="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 py-24">
        <article class="group relative overflow-hidden border border-border aspect-[16/9] md:aspect-[21/9]">
          {featured.data.heroImage && (
            <img
              src={featured.data.heroImage.src}
              alt={featured.data.title}
              width="1400"
              height="600"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
          )}
          <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted block mb-2">{featured.data.pubDate.toLocaleDateString('en-US', { year: 'numeric' })}</span>
            <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground group-hover:text-accent transition-colors duration-300 leading-tight mb-3">
              {featured.data.title}
            </h1>
            <p class="text-muted text-sm md:text-base max-w-2xl mb-6">{featured.data.description}</p>
            <div class="flex items-center gap-2 mb-6">
              {featured.data.techStack?.map((tech) => (
                <span class="font-mono text-[10px] uppercase tracking-widest text-muted px-2 py-0.5 border border-border">{tech}</span>
              ))}
            </div>
            <a href={`/work/${featured.id}/`} class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground hover:text-accent transition-colors duration-300">
              View Case Study
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </article>
      </section>

      <!-- Divider -->
      <div class="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16">
        <hr class="border-border" />
      </div>

      <!-- Project Grid (Mixed Sizes) -->
      <section class="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 py-24">
        <h2 class="font-serif text-3xl sm:text-4xl tracking-tight mb-16">All Projects</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {others.map((project, index) => (
            <article class={`group border-b border-border pb-8 first:border-t first:pt-8 ${index % 3 === 0 ? 'md:col-span-2' : ''}`}>
              <a href={`/work/${project.id}/`} class="block space-y-4">
                <div class="overflow-hidden border border-border aspect-[4/3]">
                  {project.data.heroImage && (
                    <img
                      src={project.data.heroImage.src}
                      alt={project.data.title}
                      width="800"
                      height="600"
                      class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                  )}
                </div>
                <div class="space-y-2">
                  <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted block">{project.data.pubDate.toLocaleDateString('en-US', { year: 'numeric' })}</span>
                  <h3 class="font-serif text-xl md:text-2xl leading-tight group-hover:text-accent transition-colors duration-300">
                    {project.data.title}
                  </h3>
                  <p class="text-muted text-sm leading-relaxed line-clamp-2">{project.data.description}</p>
                  {project.data.techStack && (
                    <div class="flex items-center gap-2 pt-2">
                      {project.data.techStack.slice(0, 3).map((tech) => (
                        <span class="font-mono text-[10px] uppercase tracking-widest text-muted px-2 py-0.5 border border-border">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

    </main>

    <Footer />

  </body>
</html>
```

- [ ] **Step 2: Run dev server to verify**

Run: `npm run dev`
Expected: `/work` shows featured project hero (full-width), then grid of remaining projects with mixed sizes (every 3rd project spans 2 columns on desktop). Hover effects on images and links.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/index.astro
git commit -m "feat: add portfolio homepage with featured hero + mixed grid"
```

---

### Task 6: Create Writing Archive (`/writing`)

**Files:**
- Create: `src/pages/writing/index.astro`

**Interfaces:**
- Consumes: All blog posts from content collection
- Produces: Minimal text-forward archive grouped by year

- [ ] **Step 1: Write writing archive page**

```astro
---
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

const allPosts = await getCollection('blog');
const sortedPosts = allPosts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);

// Group by year
const groupedByYear = sortedPosts.reduce((acc, post) => {
  const year = post.data.pubDate.getFullYear().toString();
  if (!acc[year]) acc[year] = [];
  acc[year].push(post);
  return acc;
}, {} as Record<string, typeof sortedPosts>);

const years = Object.keys(groupedByYear).sort().reverse();
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} ogImageUrl="/og-default.png" />
  </head>
  <body class="min-h-screen flex flex-col bg-background text-foreground">

    <Header />

    <main class="flex-1 flex flex-col">

      <section class="max-w-3xl mx-auto w-full px-6 md:px-10 lg:px-16 py-24">

        <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-16">Writing</h1>

        {years.map((year) => (
          <div class="mb-16 last:mb-0">
            <h2 class="font-mono text-sm uppercase tracking-[0.2em] text-muted mb-8">{year}</h2>
            <div class="space-y-6">
              {groupedByYear[year].map((post) => (
                <article class="group">
                  <a href={`/writing/${post.id}/`} class="block">
                    <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                      <time class="font-mono text-xs tabular-nums text-muted whitespace-nowrap">
                        {post.data.pubDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                      </time>
                      <h3 class="font-serif text-xl sm:text-2xl leading-snug group-hover:text-accent transition-colors duration-300">
                        {post.data.title}
                      </h3>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}

      </section>

    </main>

    <Footer />

  </body>
</html>
```

- [ ] **Step 2: Run dev server to verify**

Run: `npm run dev`
Expected: `/writing` shows "Writing" heading in serif, posts grouped by year with monospace dates and serif titles. Hover effect on titles (accent color). No images, no cards, minimal decoration.

- [ ] **Step 3: Commit**

```bash
git add src/pages/writing/index.astro
git commit -m "feat: add writing archive as minimal text-forward list"
```

---

### Task 7: Verify All Routes & Build

**Files:**
- Verify: All pages compile and render correctly

**Interfaces:**
- Consumes: All tasks above
- Produces: Working site with split landing, portfolio, and writing experiences

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors, no runtime warnings

- [ ] **Step 2: Test all routes in dev server**

Run: `npm run dev` then visit:
- `/` — Split landing (Projects image | Writing text)
- `/work` — Portfolio with featured hero + grid
- `/work/[slug]` — Individual project case study (existing layout)
- `/writing` — Minimal writing archive
- `/writing/[slug]` — Individual blog post (existing layout)
- `/about` — About page (unchanged)
- `/search` — Search page (unchanged)

Expected: All routes load without errors, navigation works, hover effects function.

- [ ] **Step 3: Commit final changes**

```bash
git add -A
git commit -m "feat: complete portfolio-first site redesign"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - Split landing homepage → Task 3 ✓
   - Portfolio route `/work` with featured hero + grid → Task 5 ✓
   - Writing route `/writing` with minimal list → Task 6 ✓
   - Header nav update → Task 4 ✓
   - Featured project marking → Task 2 ✓
   - Schema enhancement → Task 1 ✓

2. **Placeholder scan:** No "TBD", "TODO", or incomplete sections found.

3. **Type consistency:** All file paths and component names match across tasks.

4. **Scope check:** Focused on routing, layout, and navigation changes. No new dependencies or complex features added.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-09-personal-site-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
