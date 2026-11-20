# Claude / Claude Code prompts

Follows Anthropic's guidance: clear and direct, XML-tag structure, context about the reader and purpose, examples ([Claude prompting best practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices)). In Claude Code, the repo's `CLAUDE.md` imports `AGENTS.md` automatically; the `coded-motion` skill loads from `.claude/skills/`.

## 1. New video from a brief

```xml
Use the coded-motion skill.

<context>
This video is for [audience], who watch on phones, often muted, late in the day.
Brand: tokens/little-lantern.tokens.json and docs/02-brand-book.md. Use only token values.
Reuse library/ parts before writing new code. Read library/CHECKS.md first.
</context>

<task>
Make a [20]-second vertical video (1080x1920, 30 fps) in Remotion, based on examples/remotion-hello.
Topic: [one idea]. The video has one job: [make them feel X / explain Y / a 3-item checklist].
Script (captions, max 6 words per line):
[line 1]
[line 2]
...
</task>

<style>
[paste a STYLE line from prompts/shared-snippets.md]
Character: Glow, the brand mascot. [paste the LIFE block]
</style>

<rules>
[paste the Remotion TECH block]
Never invent facts or numbers. No image or video generators.
</rules>

<process>
[paste the PROCESS block]
</process>
```

## 2. Fix stiffness in an existing scene

```xml
<task>
Scene file: src/scenes/[02-candle].tsx. Stills attached (frames [40], [75], [120]).
It looks stiff. Diagnose using docs/fix-stiff-motion.md: list each symptom you see with the frame number and the matching row.
Then fix only those issues, using library/remotion/life-kit.tsx where possible.
</task>
<rules>Don't touch other scenes. Keep token values. Render the same 3 stills afterwards and show before/after.</rules>
```

## 3. Frontend-motion add-on (from Anthropic's sample)

Anthropic's docs suggest guiding motion toward "high-impact moments: one well-orchestrated page load with staggered reveals" instead of "scattered micro-interactions". Add when building a web page rather than a video:

```
Motion: one well-orchestrated entrance with staggered reveals (stagger = motion.duration.stagger). No scattered micro-interactions. Respect prefers-reduced-motion.
```
