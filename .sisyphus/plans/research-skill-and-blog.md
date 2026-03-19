# Build Research Skill & Blog Post

## TL;DR

> **Quick Summary**: Create a reusable research skill for OpenCode agents and write a blog post explaining how to build effective agent skills.
>
> **Deliverables**:
> - `.opencode/skills/deep-research/SKILL.md` - comprehensive research skill
> - `src/content/blog/building-perfect-agent-skill.md` - blog post about skill creation
>
> **Estimated Effort**: Quick (1-2 hours)
> **Parallel Execution**: NO - sequential (skill first, then blog)

---

## Context

### Original Request
User wants to "build perfect agent skill for research" and create a blog post about it.

### Research Findings
- OpenCode skills are `SKILL.md` files in `.opencode/skills/<name>/` directories
- Each skill requires `name` and `description` in YAML frontmatter
- Skills can define permissions, compatibility, and metadata
- Skills are loaded on-demand via the `skill` tool
- Blog posts follow MDX/Markdown format with frontmatter (title, description, pubDate, heroImage)

### Blog Style Analysis
From existing blog posts:
- Conversational, opinionated tone
- Practical examples and code snippets
- Real-world stories and experiences
- Clear headings and structure
- Usually 50-100 lines of content

---

## Work Objectives

### Core Objective
Create a reusable research skill that embodies best practices for comprehensive investigation, and document the skill creation process in a blog post.

### Concrete Deliverables
- A `deep-research` skill with parallel discovery methodology
- A blog post explaining skill creation with examples

### Definition of Done
- [ ] Skill created at `.opencode/skills/deep-research/SKILL.md`
- [ ] Blog post created at `src/content/blog/building-perfect-agent-skill.md`
- [ ] Skill follows OpenCode skill format requirements
- [ ] Blog post matches site's style and frontmatter format

---

## TODOs

- [x] 1. **Create Research Skill**

  **What to do**:
  - Create directory `.opencode/skills/deep-research/`
  - Create `SKILL.md` with proper frontmatter (name, description, license, compatibility, metadata)
  - Include comprehensive research protocol with:
    - Phase 1: Parallel Discovery (launching agents)
    - Phase 2: Direct Tools (LSP, AST, Grep)
    - Phase 3: Synthesis (collect and analyze)
    - Phase 4: Verification (confirm claims)
  - Include output format template
  - Document anti-patterns to avoid
  - Add example invocation

  **Must NOT do**:
  - Don't create generic advice - be specific about parallel agent usage
  - Don't skip the verification step - it's critical

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Task 2 (blog post)
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [x] File created at `.opencode/skills/deep-research/SKILL.md`
  - [x] Frontmatter has name and description
  - [x] Skill describes research methodology

- [x] 2. **Create Blog Post**

  **What to do**:
  - Create `src/content/blog/building-perfect-agent-skill.md`
  - Include frontmatter: title, description, pubDate, heroImage
  - Write about:
    - What agent skills are and why they matter
    - The SKILL.md format explained
    - My research skill as a real example
    - How to create your own skills
    - Best practices learned
  - Use conversational, opinionated tone matching site style

  **Must NOT do**:
  - Don't use generic AI-generated content style
  - Don't skip practical examples
  - Don't forget frontmatter

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: None
  - **Blocked By**: Task 1 (skill creation)

  **Acceptance Criteria**:
  - [x] File created at `src/content/blog/building-perfect-agent-skill.md`
  - [x] Valid frontmatter (title, description, pubDate, heroImage)
  - [x] Content matches blog style

---

## Final Verification

- [x] F1. **Plan Compliance**: Skill file exists at correct path
- [x] F2. **Plan Compliance**: Blog post has valid frontmatter
- [x] F3. **Code Quality**: No syntax errors in skill file

---

## Success Criteria

```bash
ls .opencode/skills/deep-research/SKILL.md  # File exists ✅
ls src/content/blog/building-perfect-agent-skill.md  # File exists ✅
npm run build  # Build succeeds ✅
```