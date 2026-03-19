---
name: deep-research
description: Comprehensive research methodology for thorough investigation - combines web search, code exploration, documentation lookup, and synthesis for complex questions
license: MIT
compatibility: opencode
metadata:
  audience: developers
  category: research
  triggers: research, investigate, explore, analyze, find-patterns
---

## What I Do

I conduct exhaustive research using multiple parallel discovery methods, then synthesize findings into actionable insights. I don't stop at the first result—I triangulate, verify, and cross-reference until confidence is high.

## When to Use Me

Use this skill when:
- User asks for research, investigation, or exploration
- You need to understand patterns across a codebase
- User wants to compare technologies, libraries, or approaches
- You're investigating an unfamiliar domain
- Building context before making architectural decisions

## My Research Protocol

### Phase 1: Parallel Discovery (Launch Agents)

**ALWAYS start with at least 2 agents in parallel:**

```
task(subagent_type="explore", prompt="Search codebase for [X]. I need: file locations, usage patterns, dependencies, and edge cases. Return concrete examples with file paths and line numbers.")

task(subagent_type="librarian", prompt="Research [Y] from external sources. Need: official docs, best practices, common pitfalls, real-world examples (GitHub repos 500+ stars). Skip tutorials—need production patterns.")
```

**Why parallel?** Context windows are limited. Running agents simultaneously maximizes information gathering before synthesis.

### Phase 2: Direct Tools (While Agents Run)

While agents work, I use direct tools for targeted queries:

- **LSP tools** (`lsp_symbols`, `lsp_find_references`): Jump to definitions, find all usages
- **AST search** (`ast_grep_search`): Find structural code patterns
- **Grep**: Targeted content search when I know what to look for

**Anti-pattern:** Never re-search what agents are already searching. Different questions only.

### Phase 3: Synthesis (After Agents Complete)

When agents return, I:

1. **Collect all findings** using `background_output(task_id)`
2. **Identify convergence** — where multiple sources agree
3. **Note contradictions** — where sources disagree (these need investigation)
4. **Extract patterns** — common themes across findings
5. **Highlight gaps** — what's still unknown

### Phase 4: Verification (Critical Step)

Before concluding, I verify the most important claims:

- **Code locations:** Open the file, confirm the line exists
- **External claims:** Check the official docs myself
- **Patterns:** Test against counter-examples

## Output Format

My research summaries follow this structure:

```markdown
## Research: [Topic]

### Executive Summary
[One paragraph answering the core question]

### Key Findings
1. [Finding 1] — Confidence: High/Medium/Low
   - Source: [where this came from]
   - Evidence: [concrete example]

2. [Finding 2] — Confidence: High/Medium/Low
   ...

### Code Locations (if applicable)
| Pattern | Location | Context |
|---------|----------|---------|
| [pattern] | file:line | [why it matters] |

### External References (if applicable)
- [Doc/Article]: [key insight]
- [GitHub Repo]: [relevant pattern]

### Contradictions Found
[List any disagreements between sources]

### Gaps Remaining
[What we still don't know]

### Recommendations
[Concrete next steps based on findings]
```

## Anti-Patterns I Avoid

1. **Single-source conclusions** — Never trust one source alone
2. **Stopping at first result** — First answer is rarely complete
3. **Ignoring contradictory evidence** — These are investigation opportunities
4. **Abstract recommendations** — Always provide concrete examples
5. **Re-searching delegated queries** — Trust agents, move to new questions

## Example Invocation

```
Question: "How should I implement rate limiting in this API?"

My approach:
1. Explore agent: Find existing rate limiting patterns in codebase
2. Librarian agent: Research best practices from express-rate-limit, rate-limiter-flexible docs, and production GitHub examples
3. Direct tools: Check existing middleware patterns, authentication flow
4. Synthesize: Compare found patterns with external best practices
5. Verify: Open specific files, confirm versions
6. Recommend: Concrete implementation with specific library choice and code locations
```

## Confidence Levels

I always label confidence:

- **High**: Multiple sources agree, I've verified personally
- **Medium**: Single source, or sources partially disagree
- **Low**: Speculative, needs more investigation

## Remember

**Research is triangulation.** A single source is a data point. Multiple converging sources form evidence. Always verify the most critical claims before recommending action.