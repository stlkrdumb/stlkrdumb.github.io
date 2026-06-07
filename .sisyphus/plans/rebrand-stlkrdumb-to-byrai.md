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

## Summary

- **Phase 1:** 6/8 items done — remaining: favicon review, logo already done by user
- **Phase 2:** 0/1 done — historical blog mention pending your call
- **Phase 3:** 0/6 done — these are manual infra steps (DNS, GitHub Pages, Plausible, redirects)
- **Phase 4:** 0/3 done — optional polish items

---

## Quick status

| Phase | Progress |
|-------|----------|
| Phase 1 — Code & Assets | ✅ 75% |
| Phase 2 — Blog Content | ⬜ Pending decision |
| Phase 3 — Infrastructure | ⬜ Not started |
| Phase 4 — Housekeeping | ⬜ Not started |

---

> Don't touch `.lighthouseci/`, `.sisyphus/`, or `dist/` — they're artifacts/logs.
