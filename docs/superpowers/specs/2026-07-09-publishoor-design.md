# Content Creation MCP Server Design

**Date:** 2026-07-09  
**Status:** Approved  
**Goal:** Build an MCP server that streamlines creating blog posts and portfolio projects with conversational prompts and template-based structure.

---

## Problem Statement

Creating new content (blog posts, portfolio case studies) requires manual frontmatter setup, template adherence, and file creation. This MCP server automates that workflow while enforcing style guidelines and validation rules.

---

## Design Decisions

### 1. Tool Surface

Six tools providing create/list/update operations for both content types:

| Tool | Purpose |
|------|---------|
| `create_writing` | New blog post with conversational prompts → template structure |
| `create_work` | New portfolio project with Challenge/Approach/Outcome structure |
| `list_writing` | List all blog posts with metadata (title, date, slug) |
| `list_work` | List all projects with metadata (title, date, featured status) |
| `update_writing` | Edit existing post (title, content, frontmatter fields) |
| `update_work` | Edit existing project (same as above) |

**Interaction flow:**
1. User initiates with natural language ("write a post about X", "add a project Y")
2. Server asks clarifying questions if needed (conversational phase)
3. Applies template structure based on content type
4. Validates against Zod schemas
5. Generates file and returns path + preview

### 2. Content Templates

**Blog post template (`create_writing`):**

```markdown
---
title: "Post Title"
description: "One-line summary for listings and OG images."
pubDate: 2026-07-09
heroImage: ./cover.jpg    # Optional
readingTime: "~5 min"     # Optional
---

# Introduction
[Hook paragraph — what's this about?]

## Key Point 1
[Content...]

## Key Point 2
[Content...]

## Conclusion
[Takeaway or next thoughts]
```

**Portfolio case study template (`create_work`):**

```markdown
---
title: "Project Name"
description: "Brief description of the project."
pubDate: 2026-07-09
heroImage: ./cover.jpg    # Required
techStack:
  - Rust
  - Solidity
featured: false
---

# Project Overview
[One-paragraph summary of what this project is]

## Challenge
What problem were you solving? Who was it for?

## Approach
How did you tackle it? Technical decisions, architecture choices.

## Outcome
Results, learnings, what's next. Links to live demo / repo if available.
```

**Key differences:**
- Blog: freeform sections, reading time optional, hero image optional
- Portfolio: mandatory C/A/O structure, tech stack required, hero image required

### 3. Frontmatter Generation & Validation

**Validation rules (using existing Zod schemas from `src/content.config.ts`):**
- `pubDate` defaults to today if not provided
- `title` required, auto-generated from user input if missing
- `description` required, one-line summary
- Portfolio: `heroImage` and `techStack` required
- Blog: `heroImage` and `readingTime` optional

**File naming:**
- Slugified title: `"Building a Great MCP Server"` → `building-a-great-mcp-server.md`
- Conflict detection: if file exists, append `-1`, `-2`, etc.
- Saves to:
  - `src/content/writing/<slug>.md`
  - `src/content/work/<slug>.md`

**Style constraints (both types):**
- **No em dashes (`—`)** — use commas, periods, or rephrase
- **No AI clichés:** "delve", "testament", "landscape", "leveraging"
- **Direct, editorial tone** matching existing posts

### 4. Integration & Edge Cases

**How it integrates with your current setup:**

1. **No new dependencies** — pure TypeScript, uses `fs` for file operations
2. **Works with existing content** — reads from `src/content/writing/` and `src/content/work/`
3. **Build-compatible** — generated files follow same structure as manual posts
4. **OG images** — if `heroImage` is set, OG image generation still works (uses existing `og-image.ts`)

**Edge cases handled:**

| Scenario | Behavior |
|----------|----------|
| User provides invalid date | Default to today, warn user |
| Title has special chars | Slugify properly, handle conflicts |
| Missing required fields | Prompt user before saving |
| File already exists | Offer to overwrite or use `-1` suffix |
| Image path invalid | Warn but don't block (image may be added later) |

**Testing approach:**
- Unit tests for slug generation, frontmatter validation
- Integration test: create post → verify file structure → build succeeds

---

## Success Criteria

1. User can create a blog post or portfolio project through natural conversation
2. Generated files pass Astro content collection validation
3. Build succeeds with newly created content
4. Style constraints enforced (no em dashes, no AI clichés)
5. Existing content remains unaffected

---

## Technical Constraints

- **No new dependencies** — use only Node.js built-ins (`fs`, `path`)
- **TypeScript** for type safety
- **MCP SDK** (`@modelcontextprotocol/sdk`) for server implementation
- **Zod** for schema validation (reuse existing schemas)
- **File system** operations only (no GitHub API, no external services)

---

## File Structure

```
publishoor/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Server entry point, tool registration
│   ├── tools/
│   │   ├── create-writing.tool.ts
│   │   ├── create-work.tool.ts
│   │   ├── list-writing.tool.ts
│   │   ├── list-work.tool.ts
│   │   ├── update-writing.tool.ts
│   │   └── update-work.tool.ts
│   ├── services/
│   │   ├── content.service.ts    # File I/O, slug generation
│   │   └── validation.service.ts # Zod schema validation
│   └── templates/
│       ├── blog-template.ts
│       └── portfolio-template.ts
├── tests/
│   ├── slug.test.ts
│   ├── validation.test.ts
│   └── integration.test.ts
└── README.md
```

---

## Out of Scope

- Image upload or optimization (user provides path)
- Publishing to GitHub (file creation only, user commits)
- Content scheduling or draft workflows
- Multi-language support
- Analytics or reading time calculation (user provides or leaves optional)
