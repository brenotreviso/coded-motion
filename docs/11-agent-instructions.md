# 11 · Agent instructions

> **Goal:** let any AI coding agent apply this guide the same way a trained human would, and know exactly which file each tool reads.

## The two files

| File | What it is | Who reads it |
|---|---|---|
| [`AGENTS.md`](https://github.com/brenotreviso/coded-motion/blob/main/AGENTS.md) (repo root) | Always-on rules: where things are, commands, the 10 non-negotiable rules, definition of done | Loaded automatically at the start of a session by most coding agents (table below) |
| [`.agents/skills/coded-motion/SKILL.md`](https://github.com/brenotreviso/coded-motion/blob/main/.agents/skills/coded-motion/SKILL.md) | The step-by-step workflow (brief → build → stills → render → archive), loaded when the task is about animation | Tools that support **Agent Skills** ([agentskills.io](https://agentskills.io)) |

**Why two?** Rules that apply to *every* message should be short and always loaded (AGENTS.md). The long procedure is only needed for motion jobs, so it's a skill: the agent loads it when relevant, which keeps everyday context (and cost) small.

## Which file does each tool actually read? (checked in official docs, 20 Nov 2026)

| Tool | Project instructions | Skills folder |
|---|---|---|
| **Claude Code** | `CLAUDE.md` (or `.claude/CLAUDE.md`). Reads `AGENTS.md` **only when there is no CLAUDE.md** in the working directory or above (needs Claude Code v2.1.277+). A `CLAUDE.md` can import it with `@AGENTS.md` ([memory docs](https://code.claude.com/docs/en/memory)) | `.claude/skills/<name>/SKILL.md` ([skills docs](https://code.claude.com/docs/en/skills)) |
| **Cursor** | `AGENTS.md` in the project root and subdirectories ("Simple alternative to .cursor/rules"), or Project Rules as `.mdc` files in `.cursor/rules` ("A plain .md file in .cursor/rules is ignored") ([rules docs](https://cursor.com/docs/context/rules)) | `.agents/skills/`, `.cursor/skills/`, and for compatibility `.claude/skills/` and `.codex/skills/` ([skills docs](https://cursor.com/docs/context/skills)) |
| **OpenAI Codex** | `AGENTS.md` ([Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)) | `.agents/skills` from the working directory up to the repo root ([Codex skills](https://developers.openai.com/codex/skills)) |
| **xAI Grok Build** | `AGENTS.md`, `CLAUDE.md` and others in each directory from repo root down; plus `.grok/rules/*.md` (and `.claude/rules/`, `.cursor/rules/` for compatibility) ([project rules](https://docs.x.ai/build/features/project-rules)) | `./.grok/skills/` walked up to the repo root ([skills](https://docs.x.ai/build/features/skills-plugins-marketplaces)) |

### How this repo is wired so all four work

```
AGENTS.md                         ← the real rules (Cursor, Codex, Grok Build read it directly)
CLAUDE.md                         ← one line: @AGENTS.md (so every Claude Code version gets it)
.agents/skills/coded-motion/      ← the real skill (Cursor, Codex)
.claude/skills/coded-motion  →    symlink to .agents/skills/coded-motion (Claude Code; Cursor also scans it)
.grok/skills/coded-motion    →    symlink to .agents/skills/coded-motion (Grok Build)
```

⚠ **Windows:** Git checks symlinks out as plain text files unless `core.symlinks` is enabled (Anthropic's docs warn about this for CLAUDE.md symlinks). On Windows, either enable symlinks or copy the `.agents/skills/coded-motion` folder into `.claude/skills/` and `.grok/skills/`.

⚠ Cursor scans both `.agents/skills/` and `.claude/skills/`, so it may list the skill twice. We haven't tested how it de-duplicates.

## How to use it with a new project

1. Copy `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `.grok/`, `tokens/`, `library/`, `checklists/`, `scripts/` into your project.
2. Replace `tokens/little-lantern.tokens.json` with your brand's tokens and update `docs/02-brand-book.md` (or link your own brand book in AGENTS.md).
3. Start the agent in the project folder and say: *"Use the coded-motion skill. Here's the brief: …"*
4. Check the agent picked up the rules. In Claude Code, the docs suggest running `/context all` and confirming `CLAUDE.md` appears under **Memory files**.

## What the agent should do (summary of SKILL.md)

1. **Load context once**: AGENTS.md, brand book, tokens, `library/README.md`, `library/CHECKS.md`, `PROGRESS.md`.
2. **Brief + storyboard** in text; wait for approval.
3. **Build scene by scene** from library parts + tokens, frame-driven, with the "minimum life kit" (breathe, blink, ease, follow-through, anchors, arcs). Commit each scene.
4. **Check cheaply**: 3 stills, contact sheet, `npm run check`; score brand / readability / motion; fix until ≥ 8.
5. **Render once**, versioned; record brief + commit hash.
6. **Grow the library**: promote new parts; add new rules to `CHECKS.md`.

## Writing good agent instructions (for your own repos)

From the vendors' docs:

- Put "build and test commands, coding standards, architectural decisions, naming conventions, and common workflows" in the project file (Claude Code memory docs).
- Keep it short and specific. Anthropic: show your prompt to someone without context; "If they'd be confused, Claude will be too."
- Skills need a `name` and a `description` that says **what it does and when to use it**; the description is how the agent decides to load it (Claude Code and Grok Build skills docs).
- Prefer instructions the agent can **check** (a command that fails, a checklist) over adjectives ("make it nice").

## Exercise

Open this repo in your agent of choice and ask: *"What are the rules for colours in this project, and which file did you read them from?"* If it can't answer, your instruction files aren't loading. Fix that before anything else.

## Sources

- Claude Code memory (CLAUDE.md, AGENTS.md, imports, symlinks, Windows note): <https://code.claude.com/docs/en/memory>
- Claude Code skills: <https://code.claude.com/docs/en/skills> · Agent Skills standard: <https://agentskills.io>
- Cursor rules and skills: <https://cursor.com/docs/context/rules>, <https://cursor.com/docs/context/skills>
- OpenAI Codex AGENTS.md and skills: <https://developers.openai.com/codex/guides/agents-md>, <https://developers.openai.com/codex/skills>
- xAI Grok Build project rules and skills: <https://docs.x.ai/build/features/project-rules>, <https://docs.x.ai/build/features/skills-plugins-marketplaces>
- agents.md: <https://agents.md>
