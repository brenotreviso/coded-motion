# 8 · Prompting AI to make motion

> **Goal:** write prompts that get good, on-brand, *alive* animation out of AI coding agents, using what the model makers' own docs recommend plus the patterns creators share.

## What the official docs agree on

We read the current prompting guides from six vendors (checked 20 Nov 2026). They agree on more than they disagree:

| Advice | Claude | OpenAI | Gemini | xAI | Cursor | v0 |
|---|---|---|---|---|---|---|
| Be specific and explicit about output and constraints | ✔ | ✔ | ✔ | ✔ | ✔ | |
| Structure the prompt (XML tags or Markdown headings) | ✔ | ✔ | ✔ | ✔ | | |
| Give context: point at the exact files / references | ✔ | ✔ | ✔ | ✔ | ✔ (@ mentions, images) | |
| Put stable instructions in a reusable file / system prompt | ✔ (CLAUDE.md / AGENTS.md, skills) | ✔ (version prompts in code; AGENTS.md for Codex) | ✔ (system instruction) | ✔ (AGENTS.md, skills) | ✔ (rules, AGENTS.md, skills) | ✔ (saved Instructions) |
| Plan before building | ✔ (Claude Code plan mode) | | ✔ | ✔ (Grok Build plan mode) | ✔ (Plan Mode) | ✔ (preset) |
| Describe the visual style concretely (fonts, colours, references) | ✔ | ✔ | | | ✔ (images) | |

### Claude (Anthropic)

From *Prompting best practices* ([docs](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices)):

- "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."
- "Key test: Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too."
- Use XML tags to structure prompts; give examples; give a role.
- **Frontend / motion:** the docs' sample *frontend aesthetics* prompt says: "Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions." It also warns that models default to generic "AI slop" looks without guidance.
- **Long tasks:** "Use git for state tracking: Git provides a log of what's been done and checkpoints that can be restored."
- **Claude Code** has a plan mode: "Claude reads files and proposes a plan but makes no edits until you approve" ([common workflows](https://code.claude.com/docs/en/common-workflows)).
- **Claude Code** reads project instructions from `CLAUDE.md`, and reads `AGENTS.md` when there is no `CLAUDE.md` ([memory docs](https://code.claude.com/docs/en/memory)). Skills live in `.claude/skills/<name>/SKILL.md` and follow the open Agent Skills standard ([skills docs](https://code.claude.com/docs/en/skills), [agentskills.io](https://agentskills.io)).

### OpenAI

From *Prompt engineering* ([docs](https://developers.openai.com/api/docs/guides/prompt-engineering)) and *Using GPT-6.2* ([latest-model guide](https://developers.openai.com/api/docs/guides/latest-model)):

- GPT models "benefit from precise instructions that explicitly provide the logic and data required to complete the task in the prompt."
- **Version prompts in code**: "Store production prompts in your application code", with tests, code review and staged rollout. (OpenAI says its reusable prompt objects are being deprecated, with `v1/prompts` scheduled to shut down on 30 November 2026.)
- **Frontend design:** "If the application depends on a specific visual style, describe it in the prompt. Specify the kinds of images it should use and the typography it should follow." And: share a visual reference, then "ask the model to build the asset, render it, and refine it against the reference."
- **Coding style** sample: reuse existing logic in the repo, keep code human-readable, avoid unnecessary abstraction.
- Codex reads `AGENTS.md` ([Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)).

### Google Gemini

From *Prompt design strategies* ([docs](https://ai.google.dev/gemini-api/docs/prompting-strategies)), Gemini 3 core principles:

- "Be precise and direct: State your goal clearly and concisely."
- "Use consistent structure: … XML-style tags (e.g., `<context>`, `<task>`) or Markdown headings are effective. Choose one format and use it consistently."
- "Prioritize critical instructions: Place essential behavioral constraints, role definitions (persona), and output format requirements in the System Instruction or at the very beginning of the user prompt."
- "Structure for long contexts: … supply all the context first. Place your specific instructions or questions at the very *end* of the prompt."

### xAI (Grok)

- **Grok Build** (xAI's coding agent) loads project rules from Markdown files: "Put coding conventions, build and test commands, and architecture notes in an `AGENTS.md` at your repo root"; it also reads `CLAUDE.md` and, for compatibility, `.claude/rules/` and `.cursor/rules/` ([project rules](https://docs.x.ai/build/features/project-rules); text from [docs.x.ai/llms-full.txt](https://docs.x.ai/llms-full.txt)). Skills are documented at [skills, plugins & marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces), and Grok Build has a [plan mode](https://docs.x.ai/build/features/plan-mode).
- **Prompt caching best practices:** "Only append new ones. Any edit, removal, or reorder breaks the cache" and "Place system prompts, few-shot examples, and reference documents at the beginning where they form a stable prefix" ([docs](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices)).
- ⚠ **Unverified / moved:** xAI's older *grok-code-fast-1 prompt engineering guide* (`docs.x.ai/docs/guides/grok-code-prompt-engineering`) now returns 404. Its advice (give necessary context, set explicit goals, iterate quickly, prefer agentic tasks) survives in third-party summaries such as [PromptLayer's write-up](https://blog.promptlayer.com/xais-prompt-engineering-guide-for-grok-code-fast-1/), which we could not check against the original.

### Cursor

- **Rules:** Project Rules live in `.cursor/rules` as `.mdc` files; "A plain .md file in .cursor/rules is ignored"; "If you prefer plain markdown, use AGENTS.md instead." Cursor supports `AGENTS.md` in the project root and subdirectories ([Rules docs](https://cursor.com/docs/context/rules)).
- **Skills** load from `.agents/skills/`, `.cursor/skills/` and, for compatibility, `.claude/skills/` and `.codex/skills/` ([Skills docs](https://cursor.com/docs/context/skills)).
- **Planning:** Cursor has a Plan Mode for agents ([Plan Mode](https://cursor.com/docs/agent/planning)).
- **Prompting agents:** use `@` mentions to attach files, folders, terminals, git diffs or the browser; attach images "for UI work, debugging, and design implementation" ([Prompting agents](https://cursor.com/docs/agent/prompting)).

### v0 (Vercel)

- **Instructions** are reusable prompts saved to your account. Built-in presets include one where "Before implementing any code changes, v0 creates a detailed plan outlining the approach, steps, and potential challenges, then asks for your approval before proceeding" ([v0 Instructions](https://v0.app/docs/instructions)).

## Patterns from creators who shared their prompts

These come from public posts where the creator showed the actual prompt (links in [chapter 9](09-trends.md)):

1. **Fix the format first:** "30-60s, vertical 9:16" (@x4b47x); "1080x1350, 24 fps" (@woojinrad).
2. **Name the style as physical materials:** "paper cut-out shadow theatre"; "hand-drawn crayon style… grainy strokes, wobbly outlines, paper tooth" (@0xCodez); "colored-pencil storybook style" (@woojinrad).
3. **One job per video:** "the video has one job: [counter / checklist / before and after]" (@lateascent).
4. **Hard technical limits:** "pure javascript"; "single self-contained index.html"; "Canvas 2D… No external assets, libraries" (@zacxbt's pixel wizard prompt); "animate only by frame number, no CSS transitions" (@lateascent).
5. **Sound made in code and synced:** "Synthesize the piano in Web Audio… No audio files. Sync: one timeline drives both." (@0xCodez)
6. **Storyboard / stills before render:** "Show me the storyboard first, then render it to MP4" (@woojinrad); "export stills at frames 60, 240 and 420 and wait for my ok" (@lateascent).
7. **Self-review with scores:** "Render stills, score them 1-10 for hook, phone readability and motion, fix the 3 worst problems and repeat until every score is 8+" (@kaijucode).
8. **Honesty:** "never invent numbers. anything illustrative gets a label on screen" (@lateascent).
9. **Precise feedback beats "make it better":** @Ravenlabap said the fix for a cheap-looking Three.js scene was "naming exactly what looked cheap instead of asking it to 'make it better'" ([post](https://x.com/Ravenlabap/status/2121275733846667372)).

## The prompt skeleton we use

```xml
<role>You are a motion designer who writes clean, frame-driven animation code.</role>

<context>
Brand: read tokens/little-lantern.tokens.json and docs/02-brand-book.md. Use only token values.
Library: reuse parts from library/ before writing new ones.
</context>

<task>
Make a [length] [format] animation about: [one idea].
The video has one job: [job].
</task>

<style>
[materials, e.g. paper cut-outs on warm paper, slightly wobbly edges, animated on twos]
Character: [simple non-human character]: breathes, blinks, squash & stretch, follow-through.
</style>

<rules>
- [Remotion | single HTML file with GSAP]; animate only from the frame number / a paused timeline.
- Words appear word by word, max 6 words per line, inside the 120 px safe margin. Works muted.
- No image or video generators. No external assets except brand fonts.
- Never invent facts or numbers.
</rules>

<process>
1. Show a 5-7 beat storyboard and wait for my OK.
2. Build. Commit after each scene.
3. Export stills at 3 key frames; score warmth, readability, motion 1-10; fix the 3 worst issues; repeat until all ≥ 8.
4. Only then render the final MP4, named with a version number.
</process>
```

Ready-to-paste versions for each tool are in the [prompt library](prompts/README.md).

## Exercise

Write the same request two ways: one vague sentence, and the skeleton above. Run both with any agent. Compare: which needed fewer follow-up messages?

## Sources

- Claude prompting best practices: <https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices>
- Claude Code memory (CLAUDE.md / AGENTS.md): <https://code.claude.com/docs/en/memory> · skills: <https://code.claude.com/docs/en/skills> · Agent Skills standard: <https://agentskills.io>
- OpenAI prompt engineering: <https://developers.openai.com/api/docs/guides/prompt-engineering> · latest model: <https://developers.openai.com/api/docs/guides/latest-model> · Codex AGENTS.md: <https://developers.openai.com/codex/guides/agents-md>
- Gemini prompt design strategies: <https://ai.google.dev/gemini-api/docs/prompting-strategies>
- xAI: <https://docs.x.ai/build/features/project-rules>, <https://docs.x.ai/build/features/skills-plugins-marketplaces>, <https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices>, <https://docs.x.ai/llms-full.txt>
- PromptLayer on xAI's grok-code-fast-1 guide (secondary source): <https://blog.promptlayer.com/xais-prompt-engineering-guide-for-grok-code-fast-1/>
- Cursor rules, skills, prompting: <https://cursor.com/docs/context/rules>, <https://cursor.com/docs/context/skills>, <https://cursor.com/docs/agent/prompting>
- v0 instructions: <https://v0.app/docs/instructions>
- Creator posts: see [chapter 9](09-trends.md#sources)
