# AGENTS.md

## Purpose

This repository is designed for:

* Astro static site generation
* Portfolio + blog content management
* AI-assisted development via publishoor MCP server
* Long-term maintainability
* Predictable architecture
* Small focused files
* Scalable feature growth

All code and content changes should follow these rules unless explicitly instructed otherwise.

---

# Repository Root Rules

## Assume Current Directory Is The Project Root

Unless explicitly instructed otherwise:

* Assume the current working directory is already the repository root.
* Never create an additional top-level project folder.
* Never nest a repository inside itself.

Forbidden:

project/
└── project/

Forbidden:

project/
└── my-app/

Preferred:

project/
├── package.json
├── src/
├── AGENTS.md
└── README.md

---

## File Creation

Create files relative to the repository root.

Correct:

src/content/writing/my-post.md

Incorrect:

project/src/content/writing/my-post.md

when already inside the repository root.

---

# Content Management with Publishoor MCP Server

The **publishoor** MCP server is the primary tool for creating and managing content. It provides 6 tools:

## Writing (Blog Posts)

### `create_writing`
Creates a new blog post in `src/content/writing/`.

**When to use:**
- Turning Reddit threads into long-form analysis
- Documenting technical thoughts
- Publishing opinion pieces
- Creating tutorials or guides

**Workflow:**
1. Provide topic, key points, or source material (e.g., Reddit thread URL)
2. Publishoor generates a structured markdown file with frontmatter
3. Review and edit the generated content
4. Commit with message: `content: add writing about [topic]`

**Frontmatter requirements:**
```yaml
title: "Your Title Here"
description: "120-160 character description for SEO"
pubDate: 2026-07-09
updatedDate: 2026-07-09  # optional
heroImage: "/path/to/image.jpg"  # optional
```

### `list_writing`
Lists all existing blog posts with metadata.

**When to use:**
- Checking what's already published
- Finding a post to update
- Planning content calendar

### `update_writing`
Updates an existing blog post.

**When to use:**
- Fixing typos or errors
- Adding new sections
- Updating dates or metadata
- Improving SEO (title, description)

---

## Work (Portfolio Projects)

### `create_work`
Creates a new portfolio project in `src/content/work/`.

**When to use:**
- Documenting a completed project
- Creating case studies
- Showcasing technical work

**Workflow:**
1. Provide project name, description, tech stack
2. Publishoor generates structured markdown with required frontmatter
3. Add hero image to `public/` directory
4. Review and edit the generated content
5. Commit with message: `content: add work project [project-name]`

**Frontmatter requirements:**
```yaml
title: "Project Name"
description: "Brief project description"
pubDate: 2026-07-09
updatedDate: 2026-07-09  # optional
heroImage: image("path/to/image.jpg")  # required - use Astro's image() function
techStack:  # optional array
  - React
  - TypeScript
featured: false  # optional, marks as featured on homepage
```

### `list_work`
Lists all existing portfolio projects.

**When to use:**
- Checking what's already published
- Finding a project to update
- Planning portfolio structure

### `update_work`
Updates an existing portfolio project.

**When to use:**
- Adding new screenshots
- Updating tech stack
- Improving description
- Marking as featured

---

## Content Guidelines

### Writing Posts
- **Title:** 50-60 characters for SEO
- **Description:** 120-160 characters, include primary keyword
- **Structure:** Use H2/H3 headings, short paragraphs
- **Images:** Add relevant hero images (1200x630px recommended for OG)
- **Internal linking:** Link to related posts when possible

### Work Projects
- **Title:** Clear, project-specific name
- **Description:** What problem it solves, your role
- **Hero image:** Required, high-quality screenshot or mockup
- **Tech stack:** List technologies used
- **Case study format:** Problem → Solution → Result

---

# Architecture Principles

## 1. Small Files First

Target file sizes:

* Components: ≤ 150 lines
* Hooks: ≤ 120 lines
* Services: ≤ 150 lines
* Utility Files: ≤ 100 lines

Hard limit:

* No file should exceed 300 lines.

When approaching limits:

* Extract components
* Extract hooks
* Extract services
* Extract schemas
* Extract constants
* Extract helpers

Never continue growing large files.

---

## 2. Single Responsibility

Each file should have one clear responsibility.

Good:

user-card.tsx
use-user.ts
user.service.ts

Bad:

dashboard.tsx containing:
* forms
* tables
* dialogs
* fetching
* business logic

---

## 3. Feature-Based Organization

Organize by business domain.

Preferred:

src/
├── content/
│   ├── writing/
│   └── work/
├── components/
├── layouts/
├── pages/
├── styles/
└── utils/

Avoid large global folders for application-specific functionality.

---

# Recommended Folder Structure

src/
├── content/
│   ├── writing/          # Blog posts (managed by publishoor)
│   └── work/             # Portfolio projects (managed by publishoor)
├── components/           # Reusable UI components
│   ├── BaseHead.astro
│   ├── CopyButton.astro
│   ├── Footer.astro
│   ├── Header.astro
│   └── TableOfContents.astro
├── layouts/              # Page layouts
│   ├── BlogPost.astro
│   └── PortfolioPost.astro
├── pages/                # Route pages
│   ├── index.astro       # Split landing page
│   ├── work/             # Portfolio listing + detail
│   └── writing/          # Blog archive + post
├── styles/               # Global CSS
│   └── global.css
└── utils/                # Helper functions

---

# Astro Rules

Prefer:

* Static Site Generation (SSG)
* Content Collections
* Astro Assets (`<Image>`)
* Server-side rendering

Default assumption:

Everything is a Server Component unless interactivity requires `client:` directives.

---

# Component Rules

## Keep Components Small

If JSX/HTML becomes difficult to scan:

Split immediately.

Example:

DashboardPage
Should become:

DashboardHeader
DashboardStats
DashboardFilters

---

## Component Responsibilities

Components should:

* Render UI
* Handle presentation concerns

Components should not:

* Perform database operations
* Contain large business logic
* Validate complex data

---

# Naming Conventions

Components:

user-card.astro

Hooks:

use-user.ts

Services:

user.service.ts

Utilities:

format-date.ts

Routes:

route.ts

Use kebab-case for files.

---

# SEO Requirements

Every page must have:

1. **Unique title** (50-60 characters)
2. **Description** (120-160 characters)
3. **Open Graph tags** (title, description, image 1200x630px)
4. **Twitter Card tags**
5. **Canonical URL**
6. **JSON-LD structured data**

Use `BaseHead.astro` component for centralized meta tag management.

---

# Image Guidelines

* Use Astro's `<Image>` component for optimization
* Hero images: 1200x630px for OG tags
* Alt text: Descriptive, under 125 characters
* Lazy load: Add `loading="lazy"` to below-fold images

---

# Commit Message Conventions

Use conventional commits:

* `content: add writing about [topic]` — New blog post
* `content: add work project [name]` — New portfolio project
* `content: update [post/project]` — Modify existing content
* `feat: add [feature]` — New feature
* `fix: resolve [issue]` — Bug fix
* `style: polish [component]` — Visual improvements
* `seo: [change]` — SEO optimization
* `chore: [maintenance]` — Build/tooling changes

---

# Refactoring Triggers

Refactor immediately when:

* File > 300 lines
* Component > 150 lines
* More than 3 nested conditions
* More than 3 responsibilities

Do not continue adding code. Refactor first.

---

# AI Agent Workflow

Before creating content:

1. Use `list_writing` or `list_work` to check existing content
2. Avoid duplicating topics
3. Plan content calendar if creating multiple posts

Before creating code:

1. Search existing components
2. Reuse shared UI
3. Extend existing utilities

Before creating a new file:

Ask:

"Can this existing module be extended safely?"

Avoid duplication.

---

# Forbidden Patterns

Never create:

* `utils.ts` — Use focused utility files instead
* `helpers.ts` — Same
* `god-component.astro` — Keep components small
* 500+ line files
* 1000+ line files

Do not place unrelated logic in shared folders.
Do not duplicate business logic across features.

---

# Decision Priority

When unsure:

1. Keep files small.
2. Keep responsibilities isolated.
3. Use publishoor for content management.
4. Reuse existing code.
5. Prefer composition.
6. Optimize for SEO.
7. Optimize for maintainability.

Small files and clear boundaries are always preferred over convenience.
