# Astro Blog Enhancements

## TL;DR

> **Quick Summary**: Add search, analytics, reading time, TOC, code copy buttons, and CI quality gates to enhance user experience and maintain code quality.
>
> **Deliverables**:
> - Pagefind search integration (search page + build integration)
> - Plausible analytics script in BaseHead
> - Reading time display on blog posts
> - Table of contents sidebar component
> - Code block copy buttons
> - Lighthouse CI workflow with performance budgets
> - Link checking workflow
> - Astro 6 Fonts API migration (self-hosted Inter)
>
> **Estimated Effort**: Medium (3-5 days)
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Wave 1 → Wave 2 → Wave 3 → Wave 4

---

## Context

### Original Request
User requested comprehensive blog enhancements covering performance, analytics, search, content features, and CI/CD improvements.

### Interview Summary
**Key Discussions**:
- Search: Pagefind recommended (static-site optimized, 0KB initial load)
- Analytics: Plausible recommended (privacy-first, 1KB script, $9/mo or self-hosted)
- Content: Reading time + TOC + code copy buttons prioritized
- CI/CD: Lighthouse CI + link checking for quality gates
- Fonts: Migrate from Google Fonts CDN to Astro 6 Fonts API for privacy + performance

**Research Findings**:
- Pagefind used by Astro's Starlight docs - battle-tested
- Plausible can be proxied to bypass ad blockers
- Lighthouse CI can enforce performance budgets
- Link checking prevents broken UX

### Metis Review
**Identified Gaps** (addressed):
- Dependency order: search needs build setup before UI
- Plausible requires domain verification if using cloud
- TOC needs heading extraction from markdown content
- Font migration should happen last to avoid breaking styles

---

## Work Objectives

### Core Objective
Enhance the Astro blog with search functionality, privacy-first analytics, content UX improvements, and automated quality gates without breaking existing features.

### Concrete Deliverables
- `/search` page with Pagefind search UI
- Plausible analytics script in `<head>`
- Reading time next to publish date on blog posts
- Sticky TOC sidebar on blog posts (desktop)
- Copy button on all code blocks
- `.github/workflows/lighthouse.yml` with performance budgets
- `.github/workflows/links.yml` for weekly link checking
- Self-hosted Inter font via Astro 6 Fonts API

### Definition of Done
- [ ] Search returns results from all blog posts
- [ ] Plausible dashboard shows page views
- [ ] Reading time displays on each blog post
- [ ] TOC shows all h2/h3 headings with working links
- [ ] Copy button appears on hover for code blocks
- [ ] Lighthouse CI passes on all pages (score ≥ 90)
- [ ] Link checker finds no broken links
- [ ] Fonts load without external requests

### Must Have
- All existing features continue working
- No layout shifts from new components
- Performance score stays ≥ 90

### Must NOT Have (Guardrails)
- No breaking changes to existing blog posts
- No removal of existing components or layouts
- No changes to content collection schemas
- No additional paid services without approval
- No large bundle size increases

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (no test framework detected)
- **Automated tests**: None
- **Framework**: N/A
- **Agent-Executed QA**: ALWAYS (mandatory for all tasks)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation + utilities):
├── Task 1: Reading time utility function [quick]
├── Task 2: Code copy button component [quick]
├── Task 3: Plausible analytics integration [quick]
├── Task 4: TOC heading extraction utility [quick]
└── Task 5: Lighthouse CI config [quick]

Wave 2 (After Wave 1 — features requiring utilities):
├── Task 6: Search page + Pagefind UI [visual-engineering]
├── Task 7: TOC sidebar component [visual-engineering]
├── Task 8: Reading time display in BlogPost [quick]
├── Task 9: Code copy integration to BlogPost [quick]
└── Task 10: Link checking workflow [quick]

Wave 3 (After Wave 2 — integration + verification):
├── Task 11: Pagefind build integration [quick]
├── Task 12: Verify search across all content [unspecified-high]
└── Task 13: Performance audit (Lighthouse) [unspecified-high]

Wave 4 (After Wave 3 — font optimization):
└── Task 14: Astro 6 Fonts API migration [unspecified-high]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: T5 → T11 → T12 → T13 → T14 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|------------|--------|
| 1 | — | 8 |
| 2 | — | 9 |
| 3 | — | — |
| 4 | — | 7 |
| 5 | — | T11, T12, T13 |
| 6 | — | T11 |
| 7 | T4 | — |
| 8 | T1 | — |
| 9 | T2 | — |
| 10 | — | — |
| 11 | T5, T6 | T12 |
| 12 | T11 | — |
| 13 | T5 | — |
| 14 | — | — |

### Agent Dispatch Summary

- **Wave 1**: **5** — T1-T4 → `quick`, T5 → `quick`
- **Wave 2**: **5** — T6-T7 → `visual-engineering`, T8-T10 → `quick`
- **Wave 3**: **3** — T11 → `quick`, T12-T13 → `unspecified-high`
- **Wave 4**: **1** — T14 → `unspecified-high`
- **FINAL**: **4** — F1 → `oracle`, F2-F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. **Reading Time Utility Function**

  **What to do**:
  - Create `src/utils/reading-time.ts`
  - Export `getReadingTime(content: string): string` function
  - Calculate reading time assuming 200 words per minute
  - Return formatted string like "5 min read"
  - Include JSDoc documentation

  **Must NOT do**:
  - Don't import heavy dependencies (implement natively)
  - Don't hardcode words-per-minute (use constant)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single utility function, straightforward implementation
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**: None needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Task 8 (reading time display)
  - **Blocked By**: None

  **References**:
  - Reading time calculation pattern: count words, divide by WPM, round up

  **Acceptance Criteria**:
  - [ ] File created: `src/utils/reading-time.ts`
  - [ ] Function accepts string, returns "X min read"
  - [ ] Handles empty string (returns "0 min read")

  **QA Scenarios**:
  ```
  Scenario: Calculate reading time for typical blog post
    Tool: Bash (node)
    Preconditions: File exists with function
    Steps:
      1. Import getReadingTime from './src/utils/reading-time.ts'
      2. Call with "word ".repeat(400) (400 words)
      3. Assert result === "2 min read"
    Expected Result: "2 min read"
    Evidence: .sisyphus/evidence/task-01-reading-time-basic.txt
  ```

  **Commit**: NO (groups with Wave 1)

- [x] 2. **Code Copy Button Component**

  **What to do**:
  - Create `src/components/CopyButton.astro`
  - Button appears on hover over `<pre>` blocks
  - Uses `navigator.clipboard.writeText()` API
  - Shows "Copy" → "Copied!" feedback (2s timeout)
  - Styled for light and dark mode
  - Progressive enhancement (no JS still works)

  **Must NOT do**:
  - Don't add global JavaScript in head
  - Don't break existing code block styling
  - Don't use external clipboard libraries

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small component, CSS + minimal JS
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 9 (integration)
  - **Blocked By**: None

  **References**:
  - Tailwind dark mode: `dark:` prefix
  - CSS absolute positioning for overlay

  **Acceptance Criteria**:
  - [ ] Component created: `src/components/CopyButton.astro`
  - [ ] Button visible on hover over code blocks
  - [ ] Clicking copies text to clipboard
  - [ ] Shows "Copied!" for 2 seconds

  **QA Scenarios**:
  ```
  Scenario: Copy button appears on hover
    Tool: Playwright
    Preconditions: Blog post with code block loaded
    Steps:
      1. Navigate to /blog/how-to-become-web3-builder/
      2. Hover over <pre> element
      3. Assert copy button is visible
    Expected Result: Button with "Copy" text appears
    Evidence: .sisyphus/evidence/task-02-copy-button-hover.png
  ```

  **Commit**: NO (groups with Wave 1)

- [x] 3. **Plausible Analytics Integration**

  **What to do**:
  - Add Plausible script to `src/components/BaseHead.astro`
  - Use `defer` attribute for performance
  - Add `data-domain="stlkrdumb.github.io"`
  - Include comment about privacy benefits
  - Script only loads in production (check `import.meta.env.PROD`)

  **Must NOT do**:
  - Don't load in development environment
  - Don't use other analytics simultaneously
  - Don't add cookie banner (Plausible doesn't need it)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single script tag addition
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - Plausible docs: https://plausible.io/docs
  - Astro env variables: `import.meta.env.PROD`

  **Acceptance Criteria**:
  - [ ] Script in BaseHead.astro with defer
  - [ ] Only loads when `import.meta.env.PROD` is true
  - [ ] data-domain set correctly

  **QA Scenarios**:
  ```
  Scenario: Plausible loads in production build
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Run npm run build
      2. Grep dist/index.html for "plausible.io"
      3. Assert script tag exists
    Expected Result: Script tag found in built HTML
    Evidence: .sisyphus/evidence/task-03-plausible-prod.txt
  ```

  **Commit**: NO (groups with Wave 1)

- [x] 4. **TOC Heading Extraction Utility**

  **What to do**:
  - Create `src/utils/toc.ts`
  - Export `extractHeadings(content: string): Heading[]`
  - Extract h2 and h3 from markdown/HTML content
  - Return array of `{ depth, slug, text }`
  - Generate slug from heading text (lowercase, hyphenated)

  **Must NOT do**:
  - Don't modify markdown processing pipeline
  - Don't use external libraries for parsing

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple parsing utility
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 7 (TOC component)
  - **Blocked By**: None

  **References**:
  - Markdown heading pattern: `## Heading` or `<h2>Heading</h2>`
  - Slug generation: lowercase, replace spaces with hyphens

  **Acceptance Criteria**:
  - [ ] File created: `src/utils/toc.ts`
  - [ ] Function extracts h2/h3 from markdown
  - [ ] Returns array with depth, slug, text

  **QA Scenarios**:
  ```
  Scenario: Extract headings from markdown
    Tool: Bash (node)
    Preconditions: File exists
    Steps:
      1. Import extractHeadings
      2. Call with "## First\n### Sub\n## Second"
      3. Assert returns [{ depth: 2, slug: 'first', text: 'First' }, ...]
    Expected Result: Array of heading objects
    Evidence: .sisyphus/evidence/task-04-toc-extract.txt
  ```

  **Commit**: NO (groups with Wave 1)

- [x] 5. **Lighthouse CI Configuration**

  **What to do**:
  - Create `lighthouserc.json` in project root
  - Configure collect for static site (dist folder)
  - Set assert for minimum scores (performance: 0.9, accessibility: 0.9, SEO: 0.9)
  - Include key URLs: /, /blog/, /about/
  - Add resource budget limits

  **Must NOT do**:
  - Don't set unrealistic thresholds (>0.95)
  - Don't test every single page

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration file only
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 11 (workflow integration)
  - **Blocked By**: None

  **References**:
  - Lighthouse CI docs: https://github.com/GoogleChrome/lighthouse-ci

  **Acceptance Criteria**:
  - [ ] File created: `lighthouserc.json`
  - [ ] Configures performance, accessibility, SEO thresholds
  - [ ] Includes URLs to test

  **QA Scenarios**:
  ```
  Scenario: Lighthouse CI config is valid
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. npm install -g @lhci/cli
      2. npm run build
      3. lhci autorun --upload.target=temporary-public-storage
    Expected Result: Lighthouse CI runs without config errors
    Evidence: .sisyphus/evidence/task-05-lighthouse-config.txt
  ```

  **Commit**: NO (groups with Wave 1)

- [x] 6. **Search Page with Pagefind UI**

  **What to do**:
  - Create `src/pages/search.astro`
  - Import Pagefind UI CSS and JS
  - Create search input container with Pagefind initialization
  - Style with Tailwind for light/dark mode
  - Include proper layout (Header, Footer)
  - Add navigation link to search page in Header

  **Must NOT do**:
  - Don't load Pagefind on every page (only search page)
  - Don't import Pagefind in components (lazy load)
  - Don't break existing navigation

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with styling and user interaction
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 11 (build integration)
  - **Blocked By**: None

  **References**:
  - Pagefind docs: https://pagefind.app/
  - Pagefind UI CSS: `/pagefind/pagefind-ui.css`
  - Pagefind JS: `/pagefind/pagefind.js`

  **Acceptance Criteria**:
  - [ ] Page created: `src/pages/search.astro`
  - [ ] Search input functional with auto-complete
  - [ ] Results show title, excerpt, and link
  - [ ] Matches site theme (light/dark mode)

  **QA Scenarios**:
  ```
  Scenario: Search returns results
    Tool: Playwright
    Preconditions: Build completed with pagefind
    Steps:
      1. Navigate to /search/
      2. Type "solana" in search input
      3. Wait for results to appear
      4. Assert at least one result is visible
    Expected Result: Search results displayed
    Evidence: .sisyphus/evidence/task-06-search-results.png

  Scenario: Search handles no results
    Tool: Playwright
    Preconditions: Build completed
    Steps:
      1. Navigate to /search/
      2. Type "zzzzzzzzzzzznonexistent" in search input
      3. Assert "No results" message or empty state
    Expected Result: No results state displayed
    Evidence: .sisyphus/evidence/task-06-search-empty.png
  ```

  **Commit**: NO (groups with Wave 2)

- [x] 7. **Table of Contents Sidebar Component**

  **What to do**:
  - Create `src/components/TableOfContents.astro`
  - Accept `headings: Heading[]` prop
  - Generate nested list of heading links
  - Make sticky on desktop (hidden on mobile)
  - Highlight active section on scroll (IntersectionObserver)
  - Add to `BlogPost.astro` layout alongside content

  **Must NOT do**:
  - Don't show on mobile (use responsive classes)
  - Don't break layout with overflow
  - Don't include h1 (only h2/h3)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Interactive UI component with scroll behavior
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 4 (extraction utility)

  **References**:
  - Tailwind sticky: `sticky top-X`
  - Responsive hiding: `hidden lg:block`

  **Acceptance Criteria**:
  - [ ] Component created: `src/components/TableOfContents.astro`
  - [ ] Links navigate to correct heading IDs
  - [ ] Sticky on desktop, hidden on mobile
  - [ ] Active highlight on scroll

  **QA Scenarios**:
  ```
  Scenario: TOC links navigate to sections
    Tool: Playwright
    Preconditions: Blog post with multiple headings loaded
    Steps:
      1. Navigate to a blog post
      2. Click a TOC link
      3. Assert URL hash changed
      4. Assert page scrolled to section
    Expected Result: Smooth scroll to heading
    Evidence: .sisyphus/evidence/task-07-toc-navigation.png
  ```

  **Commit**: NO (groups with Wave 2)

- [x] 8. **Reading Time Display Integration**

  **What to do**:
  - Import `getReadingTime` in `src/layouts/BlogPost.astro`
  - Calculate reading time from rendered content
  - Display next to publish date
  - Style consistently with existing metadata
  - Handle empty/short content gracefully ("1 min read")

  **Must NOT do**:
  - Don't count markup in word count (only visible text)
  - Don't break existing date formatting

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple display integration
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 1 (utility function)

  **References**:
  - BlogPost.astro: lines 54-62 (metadata display)
  - Existing FormattedDate component for style reference

  **Acceptance Criteria**:
  - [ ] Reading time shown on each blog post
  - [ ] Format: "5 min read"
  - [ ] Styled consistently with date

  **QA Scenarios**:
  ```
  Scenario: Reading time displays on blog post
    Tool: Playwright
    Preconditions: Blog post loaded
    Steps:
      1. Navigate to /blog/how-to-become-web3-builder/
      2. Locate reading time element
      3. Assert text matches X min read pattern
    Expected Result: Reading time visible in metadata area
    Evidence: .sisyphus/evidence/task-08-reading-time.png
  ```

  **Commit**: NO (groups with Wave 2)

- [x] 9. **Code Copy Button Integration**

  **What to do**:
  - Import CopyButton in `src/layouts/BlogPost.astro`
  - Add script to initialize copy buttons on all `<pre>` elements
  - Ensure buttons work within prose content
  - Test on multiple code blocks in a post

  **Must NOT do**:
  - Don't apply to inline code (only blocks)
  - Don't break existing prose typography

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple component integration
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 2 (component)

  **References**:
  - BlogPost.astro: line 79 (prose div)

  **Acceptance Criteria**:
  - [ ] Copy buttons on all code blocks
  - [ ] Works in light and dark mode
  - [ ] Clipboard contains correct code

  **QA Scenarios**:
  ```
  Scenario: Copy button copies code to clipboard
    Tool: Playwright
    Preconditions: Blog post with code block
    Steps:
      1. Navigate to /blog/using-mdx/ (has code examples)
      2. Hover over code block
      3. Click copy button
      4. Read clipboard content
      5. Assert clipboard matches code block text
    Expected Result: Code copied to clipboard
    Evidence: .sisyphus/evidence/task-09-copy-clipboard.txt
  ```

  **Commit**: NO (groups with Wave 2)

- [x] 10. **Link Checking Workflow**

  **What to do**:
  - Create `.github/workflows/links.yml`
  - Run on push to main and weekly schedule
  - Use lychee link checker action
  - Exclude mailto: links
  - Fail on broken links
  - Output results as artifact

  **Must NOT do**:
  - Don't check external links on every PR (schedule only)
  - Don't block deployment on link failures

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple workflow file
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - Lychee action: https://github.com/lycheeverse/lychee-action

  **Acceptance Criteria**:
  - [ ] Workflow created: `.github/workflows/links.yml`
  - [ ] Runs weekly and on push
  - [ ] Reports broken links

  **QA Scenarios**:
  ```
  Scenario: Link checker workflow runs
    Tool: Bash
    Preconditions: Workflow file exists
    Steps:
      1. gh workflow run links.yml (or simulate)
      2. Check workflow logs
    Expected Result: Workflow completes (pass or fail)
    Evidence: .sisyphus/evidence/task-10-link-workflow.txt
  ```

  **Commit**: NO (groups with Wave 2)

- [x] 11. **Pagefind Build Integration**

  **What to do**:
  - Update `package.json` scripts: add pagefind to build process
  - Script: `"build": "astro build && pagefind --site dist"`
  - Install pagefind as dev dependency
  - Verify pagefind generates schema in dist/pagefind/
  - Test that search page loads after build

  **Must NOT do**:
  - Don't run pagefind in dev mode (only build)
  - Don't commit pagefind generated files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration update only
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential after Wave 2)
  - **Blocks**: Task 12 (verify search)
  - **Blocked By**: Task 5 (Lighthouse CI), Task 6 (search page)

  **References**:
  - package.json: update build script
  - Pagefind CLI: `pagefind --site dist`

  **Acceptance Criteria**:
  - [ ] pagefind installed as dev dependency
  - [ ] Build script runs pagefind after astro build
  - [ ] dist/pagefind/ directory created

  **QA Scenarios**:
  ```
  Scenario: Pagefind generates index on build
    Tool: Bash
    Preconditions: Dependencies installed
    Steps:
      1. npm run build
      2. ls -la dist/pagefind/
      3. Assert pagefind.js exists
    Expected Result: Pagefind files generated
    Evidence: .sisyphus/evidence/task-11-pagefind-build.txt
  ```

  **Commit**: NO (groups with Wave 3)

- [x] 12. **Verify Search Across All Content**

  **What to do**:
  - Run full build
  - Test search with multiple queries
  - Verify blog posts, portfolio items are indexed
  - Test special characters and long queries
  - Document search behavior

  **Must NOT do**:
  - Don't modify pagefind config unless broken
  - Don't skip edge case testing

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Integration testing and verification
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (depends on T11)
  - **Blocks**: None
  - **Blocked By**: Task 11 (build integration)

  **References**:
  - Previous blog posts in src/content/blog/

  **Acceptance Criteria**:
  - [ ] Search returns results for blog posts
  - [ ] Search returns results for portfolio items
  - [ ] Special characters handled gracefully
  - [ ] No JS errors in console

  **QA Scenarios**:
  ```
  Scenario: Search finds blog post about Solana
    Tool: Playwright
    Preconditions: Build completed with pagefind
    Steps:
      1. Navigate to /search/
      2. Type "solana" in search
      3. Wait for results
      4. Assert result links to /blog/finding-toly-percolator-wallet/
    Expected Result: Correct blog post found
    Evidence: .sisyphus/evidence/task-12-search-solana.png

  Scenario: Search handles Chinese characters
    Tool: Playwright
    Preconditions: Build completed
    Steps:
      1. Navigate to /search/
      2. Type "区块链" (blockchain in Chinese)
      3. Wait for results or "No results"
      4. Assert no JS errors
    Expected Result: Search completes without error
    Evidence: .sisyphus/evidence/task-12-search-chinese.txt

  Scenario: Search finds portfolio content
    Tool: Playwright
    Preconditions: Build completed
    Steps:
      1. Navigate to /search/
      2. Search for portfolio project title
      3. Assert portfolio result appears
    Expected Result: Portfolio content searchable
    Evidence: .sisyphus/evidence/task-12-search-portfolio.png
  ```

  **Commit**: NO (groups with Wave 3)

- [x] 13. **Performance Audit (Lighthouse CI)**

  **What to do**:
  - Run `npm run build`
  - Run Lighthouse CI locally: `lhci autorun`
  - Verify all thresholds pass
  - Document any failures and fix if needed
  - Record baseline scores

  **Must NOT do**:
  - Don't lower thresholds to pass
  - Don't skip performance analysis

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Performance analysis and fixes
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 5 (Lighthouse config)

  **References**:
  - lighthouserc.json: threshold values

  **Acceptance Criteria**:
  - [ ] Lighthouse CI passes all assertions
  - [ ] Performance score ≥ 0.9
  - [ ] Accessibility score ≥ 0.9
  - [ ] SEO score ≥ 0.9

  **QA Scenarios**:
  ```
  Scenario: Lighthouse CI passes all thresholds
    Tool: Bash
    Preconditions: Build completed, lighthouse installed
    Steps:
      1. lhci autorun
      2. Check exit code
    Expected Result: Exit code 0, all thresholds passed
    Evidence: .sisyphus/evidence/task-13-lighthouse-pass.txt
  ```

  **Commit**: NO (groups with Wave 3)

- [x] 14. **Astro 6 Fonts API Migration**

  **What to do**:
  - Update `astro.config.mjs` with fonts configuration
  - Configure Inter font via Astro 6 Fonts API
  - Set weights: 400, 500, 600
  - Set subsets: latin
  - Remove Google Fonts CDN links from BaseHead.astro
  - Verify fonts load correctly
  - Check font-display: swap behavior

  **Must NOT do**:
  - Don't break existing font stack fallbacks
  - Don't load unnecessary font weights
  - Don't use Google Fonts after migration

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Core configuration change affecting all pages
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (last, after all features settled)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - Astro 6 Fonts docs: https://docs.astro.build/en/guides/fonts/
  - Current fonts: BaseHead.astro lines 69-72
  - global.css: --font-sans variable

  **Acceptance Criteria**:
  - [ ] Fonts configured in astro.config.mjs
  - [ ] Google Fonts links removed from BaseHead.astro
  - [ ] Fonts self-hosted (no external requests)
  - [ ] No layout shift from font loading

  **QA Scenarios**:
  ```
  Scenario: Fonts load without external requests
    Tool: Playwright
    Preconditions: Build completed
    Steps:
      1. Navigate to any page
      2. Capture network requests
      3. Assert no requests to fonts.googleapis.com
      4. Assert no requests to fonts.gstatic.com
    Expected Result: No external font requests
    Evidence: .sisyphus/evidence/task-14-fonts-self-hosted.png

  Scenario: Font display swap works correctly
    Tool: Playwright
    Preconditions: Build completed
    Steps:
      1. Navigate to page
      2. Check computed styles on body
      3. Assert font-family includes Inter
    Expected Result: Inter font applied
    Evidence: .sisyphus/evidence/task-14-font-display.txt
  ```

  **Commit**: YES
  - Message: `perf(fonts): migrate to Astro 6 Fonts API for self-hosted Inter`
  - Files: `astro.config.mjs`, `src/components/BaseHead.astro`
  - Pre-commit: `npm run build`

---

## Final Verification Wave (MANDATORY)

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` + check for TypeScript errors. Review all changed files for: `as any`, empty catches, console.log, commented code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high`
  Start local dev server. Test EVERY feature: search working, analytics loading, TOC clicking, reading time showing, code copy buttons working, Lighthouse CI passing locally. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Features [N/N pass] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", check actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Detect cross-task contamination. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(utils): add reading-time, toc-helpers, copy-button` — utility files
- **Wave 2**: `feat(ui): add search page, toc sidebar, integrations` — components and pages
- **Wave 3**: `feat(ci): add lighthouse and link checking workflows` — workflow files
- **Wave 4**: `perf(fonts): migrate to Astro 6 Fonts API` — astro.config.mjs

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: Build succeeds
npm run dev            # Expected: Dev server starts
curl localhost:4321/search  # Expected: Search page loads
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] Lighthouse Performance ≥ 90
- [x] No broken links detected
- [x] Search returns results
- [x] Analytics script loads
- [x] Reading time visible
- [x] TOC navigable
- [x] Copy buttons functional