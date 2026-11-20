# Grok (Grok Build) prompts

Grok Build loads `AGENTS.md` (and `CLAUDE.md`, `.grok/rules/`) automatically and finds skills in `.grok/skills/` ([project rules](https://docs.x.ai/build/features/project-rules), [skills](https://docs.x.ai/build/features/skills-plugins-marketplaces)). It also has a [plan mode](https://docs.x.ai/build/features/plan-mode). For API use, keep the prompt prefix stable and only append messages; xAI's caching docs say "Any edit, removal, or reorder breaks the cache" ([caching best practices](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices)).

## 1. New video (plan first, then iterate fast)

```markdown
Use the coded-motion skill. Plan first; don't write code until I approve the plan.

## Goal
A [20] s vertical video (1080x1920, 30 fps), Remotion, starting from examples/remotion-hello.
Topic: [idea]. One job: [job].

## Script (≤ 6 words per line)
[lines]

## Style
[STYLE line]
[LIFE block]

## Context files
@tokens/little-lantern.tokens.json @docs/02-brand-book.md @library/README.md @library/CHECKS.md

## Process
[PROCESS block]
```

## 2. Fast iteration loop (small, cheap turns)

```markdown
Iteration [3]. Change only: [frame range + problem + wanted result]. Re-render stills [30,75,140] and show them. Nothing else.
```
