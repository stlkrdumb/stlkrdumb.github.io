# Personal Blog UI & Design Upgrades

## TL;DR

> **Quick Summary**: Polishing the minimalist Astro blog with View Transitions, Rich Typography, a Reading Progress Bar, and subtle Hero Animations, while fixing a critical GitHub Pages deployment misconfiguration.
> 
> **Deliverables**:
> - Replaced manual prose styles with `@tailwindcss/typography`
> - Smooth SPA-like navigation via Astro `<ClientRouter />`
> - Scroll-linked reading progress bar on blog posts
> - Fade-in animations on the index page hero section
> - Fixed `astro.config.mjs` base URL for correct GitHub Pages deployment
> 
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (Config) → Task 2 (Typography) → Task 3 & 4 (UI Components)

---

## Context

### Original Request
Improve the personal blog inside the `stlkrdumb.github.io` repository. The existing codebase is minimal but functional. 

### Interview Summary
**Key Discussions**:
- Confirmed focus on UI & Design over purely functional features.
- User selected: View Transitions, Rich Typography & Code Blocks, Reading Progress Bar, and Hero Animations.
- User agreed to fix the GitHub Pages `base` URL configuration bug that breaks asset loading on root User pages.

**Research Findings**:
- Stack is Astro 6 + Tailwind 4.
- `global.css` has manual `.prose` classes which are redundant and harder to maintain than `@tailwindcss/typography`.
- `astro.config.mjs` has `base: '/stlkrdumb.github.io'` but the repo name implies it's deployed to `stlkrdumb.github.io/` directly.

### Metis Review
**Identified Gaps** (addressed):
- **Tailwind 4 Plugin syntax**: `@tailwindcss/typography` integration in Tailwind v4 uses `@plugin` in CSS instead of standard config files.
- **View Transitions dark mode flash**: `<ClientRouter />` requires ensuring theme toggles trigger early to prevent white flashes during navigation.
- **Scroll Bar performance**: The progress bar should use `transform: scaleX()` or `scroll-timeline` rather than `width` for better performance.

---

## Work Objectives

### Core Objective
Enhance the visual polish, reading experience, and deployment reliability of the Astro blog without losing its minimalist identity.

### Concrete Deliverables
- `astro.config.mjs` correctly configured.
- `src/styles/global.css` refactored to use official typography plugin.
- `src/layouts/BlogPost.astro` updated with a reading progress bar.
- `src/components/BaseHead.astro` updated with View Transitions router.
- `src/pages/index.astro` updated with subtle CSS animations.

### Definition of Done
- [ ] Tailwind typography accurately styles markdown elements.
- [ ] Navigating between pages does not cause full browser reloads.
- [ ] Scroll progress bar accurately reflects reading position.
- [ ] Hero elements fade in sequentially on load.
- [ ] Site builds successfully with `astro build`.

### Must Have
- All animations must be subtle (less than 500ms, low distance).
- Progress bar must be lightweight and un-intrusive.

### Must NOT Have (Guardrails)
- Do NOT change the overall color palette (keep it black/white/neutral).
- Do NOT add heavy client-side JavaScript libraries (use vanilla JS or pure CSS).
- Do NOT break existing dark mode functionality.

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: none
- **Agent-Executed QA**: YES - Mandatory for every task using Playwright or Bash tools.

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately — Config & Global Setup):
├── Task 1: Fix astro config `base` url [quick]
├── Task 2: Implement View Transitions [quick]
└── Task 3: Setup Tailwind Typography [visual-engineering]

Wave 2 (After Wave 1 — Component Polish):
├── Task 4: Reading Progress Bar (depends: 3) [visual-engineering]
└── Task 5: Hero Animations (depends: 2) [visual-engineering]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit
├── Task F2: Code quality review
├── Task F3: Real manual QA
└── Task F4: Scope fidelity check

Critical Path: Task 1 → Task 3 → Task 4 → F1-F4
Parallel Speedup: ~40% faster than sequential

### Dependency Matrix
- **1-3**: — — 4, 5
- **4**: 3 — F1-F4
- **5**: 2 — F1-F4

---

## TODOs

- [ ] 1. **Fix Deployment Base Path**

  **What to do**:
  - Open `astro.config.mjs`.
  - Remove the `base: '/stlkrdumb.github.io'` setting. This repo is a User page and deploys to the root domain.
  
  **Must NOT do**:
  - Do not change `site: 'https://stlkrdumb.github.io'`.
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single line deletion in config file.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `astro.config.mjs` - Remove the base property

  **Acceptance Criteria**:
  - [ ] `astro.config.mjs` no longer contains the `base` property.
  - [ ] `npm run build` succeeds without error.

  **QA Scenarios**:
  ```
  Scenario: Verify config builds successfully without base path
    Tool: Bash
    Preconditions: Configuration file modified
    Steps:
      1. Run `npm run build`
      2. Verify exit code is 0
    Expected Result: The build completes without complaints regarding the base path.
    Failure Indicators: Build crashes or gives a warning about invalid `base`.
    Evidence: .sisyphus/evidence/task-1-build-success.txt
  ```

- [ ] 2. **Add View Transitions**

  **What to do**:
  - Import `ClientRouter` from `astro:transitions` in `src/components/BaseHead.astro`.
  - Add `<ClientRouter />` to the `<head>` tag.
  
  **Must NOT do**:
  - Do not remove the existing SEO metadata.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Astro core functionality import.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 5
  - **Blocked By**: None

  **References**:
  - `src/components/BaseHead.astro` - Insert `<ClientRouter />` here.

  **Acceptance Criteria**:
  - [ ] `<ClientRouter />` exists in `BaseHead.astro`.

  **QA Scenarios**:
  ```
  Scenario: Test view transitions navigation
    Tool: Playwright
    Preconditions: Astro dev server running
    Steps:
      1. Navigate to `/`
      2. Click the "Read My Posts" link to go to `/blog`
      3. Assert the page URL changes without a full-page reload (e.g. check network tab or simply verify link works).
    Expected Result: Navigation is handled by client router.
    Failure Indicators: The browser hard-refreshes.
    Evidence: .sisyphus/evidence/task-2-transitions.png
  ```

- [ ] 3. **Rich Typography via Tailwind**

  **What to do**:
  - Install `@tailwindcss/typography` as a dev dependency via `npm i -D @tailwindcss/typography`.
  - In `src/styles/global.css`, replace all manual `.prose` classes (from `.prose p` downwards) with the Tailwind 4 plugin syntax: `@plugin "@tailwindcss/typography";` right below `@import "tailwindcss";`.
  - Ensure dark mode typography is maintained in `BlogPost.astro` (it already uses `dark:prose-invert`, make sure it persists).

  **Must NOT do**:
  - Do not break existing variables like `--color-background` or non-prose global styles.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Styling refactor requiring visual verification.
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `package.json` - Requires new dependency.
  - `src/styles/global.css` - Delete old `.prose` styles, add plugin.

  **Acceptance Criteria**:
  - [ ] `@tailwindcss/typography` is in `package.json`.
  - [ ] `global.css` has `@plugin "@tailwindcss/typography"`.
  - [ ] All manual `.prose` rules are deleted from `global.css`.

  **QA Scenarios**:
  ```
  Scenario: Markdown rendered with official typography plugin
    Tool: Playwright
    Preconditions: Dependency installed, dev server running
    Steps:
      1. Navigate to a blog post in `/blog/`
      2. Inspect a markdown paragraph or heading element.
      3. Check computed styles for typography classes.
    Expected Result: Paragraphs and headings render cleanly without manual css.
    Failure Indicators: Raw markdown unstyled or completely broken styling.
    Evidence: .sisyphus/evidence/task-3-typography.png
  ```

- [ ] 4. **Reading Progress Bar**

  **What to do**:
  - Open `src/layouts/BlogPost.astro`.
  - Add a sticky `<div>` at the top of the viewport (e.g., `fixed top-0 left-0 h-1 bg-black dark:bg-white z-50 origin-left scale-x-0 transition-transform duration-75`).
  - Add a small inline `<script>` at the bottom of the body: Listen to the `scroll` event (with basic throttling or `requestAnimationFrame`) and update the `transform: scaleX(progress)` of the bar based on `window.scrollY / (document.body.scrollHeight - window.innerHeight)`.
  - For View Transitions compatibility, wrap the script logic in `document.addEventListener('astro:page-load', () => {...})`.

  **Must NOT do**:
  - Do not use `width: 100%` transitions (causes layout thrashing). Use `scaleX`.
  - Do not block the main thread with heavy calculation loops.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Creating interactive UI elements.
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 3 (Styling base must be solid first)

  **References**:
  - `src/layouts/BlogPost.astro` - Insert div and script logic here.
  - Astro documentation regarding client scripts inside View Transitions (`astro:page-load`).

  **Acceptance Criteria**:
  - [ ] A progress bar exists on blog posts.
  - [ ] Progress bar updates width on scroll.
  - [ ] It resets correctly on navigation to a new post (via View Transitions).

  **QA Scenarios**:
  ```
  Scenario: Scroll progress bar tracks reading correctly
    Tool: Playwright
    Preconditions: Dev server running, navigated to a long blog post
    Steps:
      1. Assert progress bar scaleX is near 0.
      2. Scroll halfway down the page.
      3. Assert progress bar scaleX is near 0.5.
      4. Scroll to bottom.
      5. Assert progress bar scaleX is 1.0.
    Expected Result: Progress bar scales linearly with scroll distance.
    Failure Indicators: Bar width jumps erratically, stays at 0, or layout thrashing occurs.
    Evidence: .sisyphus/evidence/task-4-scrollbar.webm
  ```

- [ ] 5. **Hero Animations**

  **What to do**:
  - Open `src/pages/index.astro`.
  - Enhance the hero section (h1, p, button) to gently fade-up when the page loads.
  - Add simple utility classes like `opacity-0 animate-[fade-in-up_1s_ease-out_forwards]` to the elements. Add stagger delays (e.g., `delay-100`, `delay-200`).
  - Define `@keyframes fade-in-up` in `src/styles/global.css` under the `@theme` or `@layer utilities` section (for Tailwind 4).

  **Must NOT do**:
  - Do not use a third-party animation library (no framer-motion, no gsap).
  - Do not make animations longer than 1 second.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Defining keyframes and choreographing hero entrance.
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 2 (Ensure transitions router doesn't break initial load state).

  **References**:
  - `src/pages/index.astro` - Target hero elements here.
  - `src/styles/global.css` - Insert `@keyframes`.

  **Acceptance Criteria**:
  - [ ] Hero elements are not visible immediately, then slide up and fade in smoothly.
  - [ ] The CSS keyframes are defined cleanly.

  **QA Scenarios**:
  ```
  Scenario: Hero animations trigger on page load
    Tool: Playwright
    Preconditions: Page refreshed at `/`
    Steps:
      1. Load page.
      2. Check opacity and transform properties of the H1 element.
      3. Wait 1 second.
      4. Check opacity is 1 and transform is identity.
    Expected Result: Elements fade in successfully.
    Failure Indicators: Elements remain invisible, or snap instantly without transition.
    Evidence: .sisyphus/evidence/task-5-hero-anim.webm
  ```

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. Verify View Transitions, Tailwind Typography, Reading Progress Bar, and Hero Animations exist. Check the `astro.config.mjs` no longer has `base: '/stlkrdumb.github.io'`. Check evidence files exist in `.sisyphus/evidence/`.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `astro check` + `npm run build`. Review `global.css` to ensure no lingering manual `.prose` classes exist. Ensure the scroll progress script uses `astro:page-load` correctly.
  Output: `Build [PASS/FAIL] | Astro Check [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `playwright`
  Start from clean state. Navigate between home and blog, verify smooth view transitions (no flash). Verify typography renders correctly on a post. Scroll down and verify progress bar. Go back home and verify hero animations trigger.
  Output: `Transitions [PASS/FAIL] | Progress Bar [PASS/FAIL] | Animations [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  Verify no extra features were added outside the scope (e.g. no new heavy libraries in package.json other than `@tailwindcss/typography`). Verify color palette remains unchanged.
  Output: `Tasks [N/N compliant] | Unaccounted changes [CLEAN/N files] | VERDICT`

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Expected: output successful build, no errors about base or unresolved imports
astro check    # Expected: 0 errors
```

### Final Checklist
- [ ] View transitions active across all pages.
- [ ] Tailwind typography is completely overriding manual prose classes.
- [ ] Scroll progress bar tracks reading depth.
- [ ] Hero animations complete within 1 second on load.
- [ ] GitHub Pages `base` bug is removed from config.
