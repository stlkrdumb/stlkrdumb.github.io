# Rebrand Plan: `stlkrdumb` → `byrai`

**Project type:** Astro (not Next.js)  
**Current host:** GitHub Pages (`stlkrdumb.github.io`)  
**Target domain:** `byrai.xyz`

---

## Phase 1 — Code & Assets (direct edits)

| # | File | Change | Status |
|---|------|--------|--------|
| ✅ 1a | `src/consts.ts` | `SITE_TITLE` → `'byrai'` | Done |
| ✅ 1b | `src/consts.ts` | `SITE_URL` → `'https://byrai.xyz'` | Done |
| ✅ 1c | `src/consts.ts` | `SITE_AUTHOR` → `'byrai'` | Done |
| ⏭️ 1d | `src/consts.ts` | `github` URL — keeping old (`stlkrdumb`) | Skipped per user |
| ✅ 2 | `astro.config.mjs` | `site` → `'https://byrai.xyz'` | Done |
| ✅ 3 | `public/robots.txt` | Sitemap URL → `https://byrai.xyz/sitemap-index.xml` | Done |
| ✅ 4 | `src/components/BaseHead.astro` | Plausible `data-domain` → `'byrai.xyz'` | Done |
| ✅ 5 | `src/components/Footer.astro` | Copyright → `© {year} byrai.` | Done |
| ✅ 6 | `package.json` | `name` → `'byrai.xyz'` | Done |
| ✅ 7 | `public/logo.svg` | Replaced with B&W logo (user created) | Done |
| ⏭️ 8 | `public/favicon.ico`, `favicon.svg` | Check/update if needed | Pending review |

## Phase 2 — Blog Content (historical references)

| # | File | Change | Status |
|---|------|--------|--------|
| ⏭️ 9 | `src/content/blog/building-this-website.md` | Rewrite old logo mention | Pending decision |

## Phase 3 — Infrastructure (manual steps — user action required)

| # | Action | Details | Status |
|---|--------|---------|--------|
| ⬜ 10 | DNS setup | Point `byrai.xyz` DNS to GitHub Pages IPs | Not started |
| ⬜ 11 | GH Pages custom domain | Settings → Pages → Custom domain → `byrai.xyz` | Not started |
| ⬜ 12 | `public/CNAME` file | Add `byrai.xyz` if GitHub requires it | Not started |
| ⬜ 13 | Plausible.io | Create new site at plausible.io for `byrai.xyz` | Not started |
| ⬜ 14 | 301 redirects | Forward all old URLs → new domain for SEO | Not started |
| ⬜ 15 | Search engine submission | Google Search Console + Bing for new domain | Not started |

## Phase 4 — Housekeeping (nice-to-have)

| # | Action | Status |
|---|--------|--------|
| ⬜ 16 | Update `README.md` | Not started |
| ⬜ 17 | Rename repo → `byrai.xyz` | Optional |
| ⬜ 18 | Update social media profiles | External — not in code |

---

## Phase 1.5 — Home Page Redesign (bonus)

| # | File | Change | Status |
|---|------|--------|--------|
| ✅ H1 | `src/pages/index.astro` | Complete editorial redesign — asymmetric grid, Spectral serif, yellow accent, grain texture, staggered animations | Done |
| ✅ H2 | `src/styles/global.css` | Added Spectral font var, custom keyframes (reveal-left, number-spread), SVG grain overlay | Done |
| ✅ H3 | `astro.config.mjs` | Added Spectral font to Google font provider config | Done |
| ✅ H4 | `src/components/FormattedDate.astro` | Added optional `class` prop for styling flexibility | Done |

**Design direction:** Editorial + industrial — independent tech zine aesthetic.
- **Typography:** Spectral (serif display) + Inter (sans-serif body)
- **Layout:** Asymmetric grid with numeric stats column, edge-bar navigation
- **Color:** Black/white base, yellow (`#d4a017`) as the single accent
- **Texture:** Subtle SVG noise grain overlay on `body::before`
- **Motion:** Staggered reveal animations (fade-in-up, letter-spacing spread)
- **Content sections:** Hero → Stats → Recent posts → Quote manifesto → CTA

---

## Phase 2 — Blog Pages Redesign (bonus)

| # | File | Change | Status |
|---|------|--------|--------|
| ✅ B1 | `src/pages/blog/index.astro` | Complete editorial catalog redesign — numbered article list, wide layout, monospace dates, hover-accent titles | Done |
| ✅ B2 | `src/layouts/BlogPost.astro` | Immersive reading room — drop caps, Spectral title, italic description excerpt, custom prose typography, end-of-article marker, clean hero image layout | Done |
| ✅ B3 | `src/components/TableOfContents.astro` | Editorial TOC sidebar with accent-colored active links and tracking labels | Done |
| ✅ B4 | `src/styles/global.css` | Custom `.content-body` typography — drop caps, pull-quote blockquotes, styled code blocks, refined lists, accent markers | Done |

**Blog listing design:** Archival catalog aesthetic.
- **Header:** Oversized "BLOG" in Spectral serif with numeric post count
- **Article rows:** Numbered (01, 02...) + title (Serif) + description (muted) + date (monospace right-aligned)
- **Hover:** Title shifts to accent color on hover
- **Layout:** Wider `max-w-5xl`, clean divide-y borders between entries
- **Mobile:** Stacked format with inline reading time

**Single post design:** Immersive editorial reading room.
- **Header:** Large Spectral title + monospace date row + italic description excerpt
- **Drop cap:** First letter of opening paragraph styled as editorial drop cap (accent color, 4rem)
- **Body typography:** Custom `.content-body` — Spectral for subheadings, refined line-height (1.8), pull-quote blockquotes with accent left border
- **Code blocks:** Monospace font, subtle background borders
- **TOC sidebar:** Clean active-link highlighting with accent underline
- **End marker:** "End of article" + back-to-blog link
- **Removed:** Reading progress bar (too UI-ish for editorial feel)

---

## Phase 2.5 — Portfolio & Homepage Redesign (bonus)

| # | File | Change | Status |
|---|------|--------|--------|
| ✅ P1 | `src/pages/index.astro` | Cinematic asymmetric hero + featured project preview, Selected Work catalog with horizontal list, Recent Writing 2-column grid | Done |
| ✅ P2 | `src/pages/portfolio/index.astro` | Editorial gallery — alternating layout rows, numbered overlays, large imagery, tech stack pills | Done |
| ✅ P3 | `src/layouts/PortfolioPost.astro` | Spectral serif title, editorial reading room layout, accent active-link TOC sidebar | Done |
| ✅ P4 | `src/content/portfolio/nexus-protocol.md` | Fake portfolio entry — DeFi aggregator (Rust/Solidity) | Done |
| ✅ P5 | `src/content/portfolio/synthwave-cli.md` | Fake portfolio entry — CLI scaffolding tool (Go) | Done |
| ✅ P6 | `src/content/portfolio/aether-dashboard.md` | Fake portfolio entry — infra monitoring dashboard (Astro/D3.js) | Done |
| ✅ P7 | `src/content/portfolio/forge-build-system.md` | Fake portfolio entry — zero-config build system (Rust/WASM) | Done |
| ✅ P8 | `src/assets/portfolio/*.jpg` | 4 placeholder hero images for portfolio entries | Done |

**Homepage design:** Editorial showcase experience.
- **Hero:** Cinematic asymmetric split — typographic statement left, featured project image right with grayscale→color hover transition
- **Selected Work:** Horizontal catalog with numbered entries (YYMM format), large serif titles, muted descriptions, tech stack pills right-aligned
- **Writing:** Two-column recent posts grid with dates and reading times
- **Navigation edge-bar:** Minimal topbar nav with accent-colored "home" indicator

**Portfolio page design:** Editorial gallery spread.
- **Gallery rows:** Alternating image/text layouts (even: text-left/image-right, odd: reversed), large imagery with subtle zoom hover effect
- **Typography:** Large Spectral serif titles, muted descriptions, bordered tech stack pills
- **Numbering:** Sequential numbering overlay on imagery (01, 02, 03...)
- **CTA:** "View project" text with animated arrow indicator on hover

**Portfolio post design:** Immersive editorial reading room.
- **Header:** Large Spectral serif title + date row + description excerpt
- **Hero image:** Full-width bordered frame (2:1 aspect ratio)
- **Body:** Custom prose typography, accent pull quotes, numbered TOC sidebar

---

## Phase 3 — Infrastructure & Polish

| # | File | Change | Status |
|---|------|--------|--------|
| ✅ I1 | `src/utils/og-image.ts` | Redesigned OG images for all pages — Spectral serif, yellow accent, full-width layout with title text on image | Done |
| ✅ I2 | `src/components/Header.astro` | Minimal topbar nav — edge-bar style, spectral font, accent hover indicator, refined logo sizing (`h-10`) | Done |
| ✅ I3 | `src/components/Footer.astro` | Simplified single-row footer grid, refined social links, consistent sizing (`h-8`) | Done |

**OG image design:** Professional article preview images.
- Spectral serif title (48px)
- Yellow accent top bar + description text block
- Full-width layout with subtitle and date metadata

**Header redesign:** Minimal editorial masthead.
- Fixed topbar with wide `max-w-[1400px]` container
- "byrai" in Spectral serif (h-10 logo)
- Minimal nav links with accent color hover indicator
- Responsive hamburger for mobile

**Footer redesign:** Clean one-row layout.
- Single flex row: copyright left, social icons right
- Refined sizing and spacing consistent with new aesthetic

---

## Summary

- **Phase 1:** 7/8 items done — remaining: favicon review (user skipped)
- **Phase 2 (Blog):** 4/4 items done ✅
- **Phase 2.5 (Portfolio/Home):** 8/8 items done ✅
- **Phase 3 (Infra/Polish):** 3/3 items done ✅
- **Phase 3 (Manual Infra Steps):** ⬜ Not started — DNS, GitHub Pages custom domain, Plausible.io
- **Phase 4:** 0/3 done — README update, repo rename, social profiles

---

## Quick status

| Phase | Progress |
|-------|----------|
| Phase 1 — Code & Assets | ✅ ~87% |
| Phase 2 — Blog Pages | ✅ Complete |
| Phase 2.5 — Portfolio & Homepage | ✅ Complete |
| Phase 3 — Infra Code (OG/Header/Footer) | ✅ Complete |
| Phase 3 — Manual Infra (DNS/GitHub/Plausible) | ⬜ Not started |
| Phase 4 — Housekeeping | ⬜ Pending |

## Next steps

1. **Phase 3 (Manual):** Setup DNS for `byrai.xyz`, configure GitHub Pages custom domain, create Plausible.io property, add CNAME file, set up 301 redirects
2. **Phase 4:** Update `README.md`, rename repo to `byrai.xyz`, update social profiles
3. Deploy and verify live site at `https://byrai.xyz`

---

> Don't touch `.lighthouseci/`, `.sisyphus/`, or `dist/` — they're artifacts/logs.
