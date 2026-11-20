---
name: coded-motion
description: Plan, build, check and render on-brand motion graphics with code (HTML/SVG/Canvas + GSAP, or Remotion) using design tokens, a reusable library, checkpoints and a QA checklist. Use when asked to make an animation, motion graphic, animated explainer, reel, short, caption animation or animated character, or to fix animation that looks stiff.
---

# Coded Motion skill

Follow these steps in order. Paths are relative to the repository root of the Coded Motion guide. In another project, copy `tokens/`, `library/`, `checklists/` and `scripts/` in first, or point to them.

## 0. Load context (cheap, once)

1. Read `AGENTS.md` (rules) and `docs/02-brand-book.md` (brand).
2. Read the token file (`tokens/little-lantern.tokens.json` or the project's own). Run `node scripts/build-tokens.mjs` if `tokens/tokens.css` / `tokens/tokens.js` are missing or older than the JSON.
3. Read `library/README.md` (one line per reusable part) and `library/CHECKS.md` (rules learned from past mistakes).
4. Read `PROGRESS.md` if it exists (else copy `templates/PROGRESS.md`). Continue from it; don't restart.

Don't read every chapter. Open `docs/04-motion-principles.md` or `docs/fix-stiff-motion.md` only when a motion question comes up.

## 1. Brief → storyboard (no code yet)

Write `brief.md`:

```
Topic / Audience / One job / Format (size, fps, length) / Must work muted: yes / Brand: <token file>
```

Then a 5-7 beat storyboard in text: time range, what is on screen, the ONE main action, caption (≤ 6 words per line). Ask the human to approve if they're available. Commit: `git commit -m "brief + storyboard"`.

## 2. Choose the stack

- Video file → Remotion (`examples/remotion-hello/` as the template), or frame-driven HTML (`examples/html/08-frame-render.html`) if the scene already exists in HTML.
- Live page → HTML/SVG + GSAP (examples 00-07).
- Thousands of particles / textures → Canvas 2D inside either.

## 3. Build scene by scene

For each beat:

1. **Reuse first:** pick parts from `library/`. Extend them with parameters, never copy-paste-edit.
2. **Tokens only:** colours `color.*`, fonts `font.*`, spacing `space.*`, durations `motion.duration.*`, easings `motion.easing.*`, springs `motion.spring`. In GSAP register brand easings with CustomEase (`ll-enter`, `ll-move`, `ll-soft`). In Remotion use `Easing.bezier(...)` with the token arrays and `spring({ config })` with token springs.
3. **Frame-driven:** Remotion → only `useCurrentFrame()`, `interpolate()` (clamped), `spring()`, `<Sequence>`; times as `seconds * fps`. HTML video → paused timeline + `window.renderFrame = (n) => { tl.seek(n / fps, false); }` (return nothing).
4. **Alive:** apply the minimum life kit to every character and key object:
   - idle: breathe (scaleY +3-4 %, scaleX −1-1.5 %, `motion.duration.breath`, sine yoyo), anchored at the base
   - irregular blinks (70 ms close / 120 ms open, random 1.8-4.5 s gaps; fixed irregular frames in Remotion)
   - arrivals ease out (`ll-enter`), moves ease in-out (`ll-move`), exits ease in
   - loose parts (flame, ears, tail, hair) start 50-150 ms later and overshoot (follow-through)
   - deliberate anchor points (`transformOrigin`), arcs for travelling motion, anticipation before big moves
5. **Commit** after each working scene and update `PROGRESS.md` (what's done, what's next, open issues).

## 4. Check cheaply (before any full render)

1. Render 3 key stills (Remotion: `npx remotion render <Comp> out/stills --frames=a,b,c`; HTML: `node scripts/render-frames.mjs <page> out/sheet --every=10 --scale=0.25`).
2. Look at them. Run through `checklists/qa-before-render.md`.
3. Score each still 1-10 for **brand/warmth**, **phone readability**, **motion (from the contact sheet)**. Fix the 3 worst issues. Repeat until every score ≥ 8.
4. For HTML work run `npm run check` (no console errors).
5. Show the stills to the human with scores and the frame numbers of any doubts.

## 5. Render once, archive

1. Final render: `out/<project>_<cut>_v<NN>.mp4` (never overwrite; increment NN).
2. Write `out/<project>_<cut>_v<NN>.txt` with the brief summary + `git rev-parse --short HEAD`.
3. Run `checklists/publish.md`.
4. Promote any new reusable part to `library/` (code + one-line entry in `library/README.md` + preview). Add any mistake you fixed as a rule in `library/CHECKS.md`.
5. Commit.

## Usage-saving rules (always on)

- Keep `AGENTS.md`, tokens and brand book stable during a project (cache-friendly prefix); put the changing request last.
- One scene per session/subagent; `/clear` (or a new chat) between unrelated tasks.
- Reference files by path instead of pasting them.
- Use the strongest model for new scene types and hard bugs, a cheaper one for edits and timing tweaks.
- Turn vague feedback into precise notes before acting: frame number + problem + desired fix. If feedback is vague, ask one clarifying question with a still attached.

## Never

- Invent facts, statistics, quotes or sources.
- Use image/video generators unless explicitly asked.
- Hard-code brand values.
- Start a final render before stills pass QA.
- Push, publish, post or send anything without explicit permission.
