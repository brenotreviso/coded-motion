# OpenAI (Codex / GPT) prompts

Follows OpenAI's guidance: precise instructions that "explicitly provide the logic and data", describe the visual style and typography, give a visual reference and "refine it against the reference", and keep production prompts versioned in code ([prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering), [latest-model guide](https://developers.openai.com/api/docs/guides/latest-model)). Codex reads `AGENTS.md` and skills from `.agents/skills/`.

## 1. New video from a brief

```markdown
# Identity
You are a motion designer who writes clean, readable, frame-driven animation code.

# Instructions
- Follow AGENTS.md and the coded-motion skill (.agents/skills/coded-motion/SKILL.md).
- Build a [20] s, 1080x1920, 30 fps video in Remotion starting from examples/remotion-hello.
- Topic: [one idea]. One job: [job]. Captions (≤ 6 words per line): [script].
- Visual style: [STYLE line]. Typography: Fraunces 600 for captions, Nunito for labels (from tokens).
- Logic for motion: [paste LIFE block]. Timing: arrivals 0.7 s, moves 0.4 s, scene changes 1.2 s (tokens).
- Reuse existing library code; keep code human-readable; no unnecessary abstractions.
- [paste PROCESS block]

# Reference
[attach a still or describe one reference frame: layout, colours, where the character sits, where the caption sits]
Build it, render 3 stills, compare them against the reference, list differences, fix, repeat.
```

## 2. Batch variants (template reuse)

```markdown
Using the existing composition src/[Tip].tsx as a template, create 5 variants with these scripts: [list].
Change only the text and the accent colour token (rotate apricot, sage, dusk). Don't change timing code.
Render one still per variant at frame [60] before rendering any video.
```
