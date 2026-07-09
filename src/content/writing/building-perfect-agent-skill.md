---
title: 'Building the Perfect Agent Skill for Research'
description: 'How I created a reusable research methodology for AI agents that actually works'
pubDate: 'Mar 19 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

I just built my first OpenCode skill. It's a research methodology called `deep-research`. And honestly? It's the most useful thing I've added to my AI workflow in months.

## What Are Agent Skills?

Skills are reusable instruction sets for AI agents. In OpenCode, you drop a `SKILL.md` file in `.opencode/skills/<name>/` and the agent discovers it automatically.

The skill tool description says it all:

> Agent skills let OpenCode discover reusable instructions from your repo or home directory. Skills are loaded on-demand via the native `skill` tool—agents see available skills and can load the full content when needed.

Think of it like giving your AI a textbook for a specific subject. Instead of explaining how to do research every time, you just say "use the deep-research skill" and it knows exactly what to do.

## Why Research Needed a Skill

Here's the thing about research: it's boring to explain repeatedly.

Every time I wanted the AI to investigate something properly, I'd have to spell out:
- Launch multiple agents in parallel
- Use specific tools for specific jobs
- Synthesize findings
- Verify claims
- Format output

That's like 5 paragraphs of instruction. Now? I just load the skill and say "research X."

The skill codified what I was already doing manually—now the AI does it consistently.

## The Skill Structure

My `deep-research` skill has four phases:

### Phase 1: Parallel Discovery

The biggest mistake people make in AI research is sequential searching. They ask one agent, wait, then ask another.

Wrong. Launch them simultaneously.

```typescript
task(subagent_type="explore", prompt="Search codebase for [X]...")
task(subagent_type="librarian", prompt="Research [Y] from external sources...")
```

While those run, I use direct tools (LSP, ast-grep, grep) for targeted queries I already know I need. Context windows are limited—maximize parallel gathering.

### Phase 2: Direct Tools (While Waiting)

This is where I differ from most research patterns. While the background agents are searching:

- **LSP tools**: Jump to definitions, find all usages of something I suspect exists
- **AST search**: Find structural patterns (all functions named `handle*`, all try-catches, etc.)
- **Grep**: When I know exactly what I'm looking for

The key insight: these are questions I already know the answer to. I just need to verify. The agents handle the exploratory discovery.

### Phase 3: Synthesis

After agents complete, I collect outputs and look for:

1. **Convergence** — Where multiple sources agree
2. **Contradictions** — Where sources disagree (these are interesting)
3. **Patterns** — Common themes across findings
4. **Gaps** — What's still unknown

The output format I use:

```markdown
## Research: [Topic]

### Executive Summary
[One paragraph answering the core question]

### Key Findings
1. [Finding 1] — Confidence: High/Medium/Low
   - Source: [where this came from]
   - Evidence: [concrete example]
```

### Phase 4: Verification (The One Nobody Does)

Here's the part where most research fails: **verification**.

If I found a code pattern, I open that file and confirm the line exists.
If I cite an external library, I check their docs myself.
If I claim "this is the best approach," I test against counter-examples.

A single source is a data point. Multiple converging sources form evidence. But I always verify the most critical claims before recommending action.

## The Anti-Patterns

Skills are also useful for saying "don't do this":

1. **Single-source conclusions** — Never trust one source alone
2. **Stopping at first result** — First answer is rarely complete
3. **Ignoring contradictory evidence** — These are investigation opportunities
4. **Abstract recommendations** — Always provide concrete examples
5. **Re-searching delegated queries** — Trust agents, move to new questions

Writing these down as "don't do" in the skill makes the AI actually follow them.

## How to Create Your Own

1. **Pick a name** — lowercase with hyphens: `deep-research`, `code-review`, `api-design`
2. **Write the frontmatter**:

```yaml
---
name: my-skill
description: What this skill does and when to use it
license: MIT
compatibility: opencode
metadata:
  audience: developers
  triggers: when to invoke this skill
---
```

3. **Structure it**:
   - What it does
   - When to use
   - The actual methodology
   - Output format
   - Anti-patterns

4. **Put it in the right place**: `.opencode/skills/<name>/SKILL.md`

## The Real Value

Here's what I learned: skills aren't just prompts. They're **methodologies**.

The difference between "research this" and "use the deep-research skill" is the difference between hoping for good research and guaranteeing it.

Skills let you encode institutional knowledge. How to investigate. How to verify. How to format. How to not waste time.

I'm now building skills for:
- `code-review` — How to do effective code review
- `architecture` — How to analyze system design
- `debug` — Systematic debugging methodology

The skill is the method. The agent is the executor. Together, they produce consistent results.

---

*Built a useful skill? Drop it in the repo and share it. Skills improve with community contribution.*