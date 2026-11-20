# AGENTS.md: Coded Motion

Instructions for any AI coding agent (Claude Code, Cursor, Codex, Grok Build, others) working in this repository or applying this guide to a new motion project. Humans: this is also a one-page summary of the method.

## What this repo is

A guide + toolkit for making motion graphics with code: HTML/SVG/Canvas + GSAP for learning and live pages, Remotion (or frame-driven HTML + headless Chrome + ffmpeg) for video. The worked example brand is **Little Lantern** (fictional).

## Where things are

| Need | Open |
|---|---|
| Brand rules (voice, colour, type, motion personality) | `docs/02-brand-book.md` |
| Design tokens (the ONLY source of colours, fonts, spacing, durations, easings, springs, video sizes) | `tokens/little-lantern.tokens.json` → build with `node scripts/build-tokens.mjs` → `tokens/tokens.css`, `tokens/tokens.js` |
| Motion principles (easing, springs, arcs, anchor points, blur, follow-through) | `docs/04-motion-principles.md` |
| Fix stiff motion | `docs/fix-stiff-motion.md` |
| Rendering video | `docs/07-video-pipeline.md`, `scripts/render-frames.mjs`, `examples/remotion-hello/` |
| Reusable parts | `library/README.md` (check here BEFORE writing anything new) |
| Checklists | `checklists/` |
| Prompt templates | `prompts/` |
| Brief + progress templates | `templates/brief.md`, `templates/PROGRESS.md` (copy into the project root) |
| Detailed agent workflow | `.agents/skills/coded-motion/SKILL.md` |

## Commands

```bash
node scripts/build-tokens.mjs                      # tokens JSON -> CSS + JS
npm install && npm run check                       # open every examples/html/*.html in headless Chrome, fail on console errors
node scripts/render-frames.mjs <page.html> <out> [--every=10] [--scale=0.25] [--mp4]
cd examples/remotion-hello && npm install
npx remotion render GlowIntro out/stills --frames=30,75,140   # key stills
npx remotion render GlowIntro out/<name>_v<NN>.mp4            # final
```

Set `CHROME_PATH` if Chrome isn't at `/usr/bin/google-chrome`. For Remotion you can pass `--browser-executable=$CHROME_PATH`.

## Non-negotiable rules

1. **Plan first.** Write a brief (topic, audience, one job, format, length) and a 5-7 beat text storyboard. Get approval before code when a human is available.
2. **Tokens only.** No raw hex colours, font names, durations or easing curves in scene code. Need a new value? Add a token, rebuild, then use it.
3. **Reuse first.** Search `library/` for a matching part. Extend it with parameters rather than copying it.
4. **Frame-driven for video.** In Remotion, drive everything from `useCurrentFrame()`; no CSS transitions/animations. In HTML, use a paused GSAP timeline + `renderFrame(n)` that returns nothing.
5. **Alive, not stiff.** Every character idles (breathe + irregular blinks); every arrival eases; loose parts follow through; anchors are set deliberately. Use `docs/fix-stiff-motion.md`.
6. **Checkpoint.** `git commit` after each approved step. Name renders `<project>_<cut>_v<NN>.mp4`; never overwrite. Update `PROGRESS.md`.
7. **Cheap before expensive.** Stills → contact sheet → preview → final. Never start a final render before stills pass `checklists/qa-before-render.md`.
8. **Honesty.** Never invent facts, numbers, quotes or sources. Label anything illustrative on screen. No image/video generators unless the human explicitly asks.
9. **Accessibility.** Text inside the safe margin (`space.safe`), ≤ 6 words per caption line, works muted. Live pages respect `prefers-reduced-motion`.
10. **Don't publish or push.** Don't create repos, push, post or send anything unless the human explicitly asks.

## Definition of done

- [ ] Brief + storyboard saved in the project folder
- [ ] All values come from tokens; `npm run check` passes for HTML work
- [ ] Key stills reviewed and scored ≥ 8/10 on warmth/brand, readability, motion
- [ ] Final render named with a version; brief + commit hash recorded next to it
- [ ] Any new reusable part added to `library/` with a one-line entry and a preview
- [ ] Any new mistake you fixed added as a rule in `library/CHECKS.md`

## Style of your messages to the human

Short. Show stills, not paragraphs. When asking for feedback, ask about specific frames.
