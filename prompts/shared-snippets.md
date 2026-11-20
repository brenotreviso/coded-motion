# Shared snippets (paste into any prompt)

## Format block
```
FORMAT: [20] s, vertical 9:16, 1080x1920, 30 fps. Must make sense muted. Text inside a 120 px safe margin, max 6 words per caption line.
```

## Style as materials (pick one, edit)
```
STYLE: paper cut-out shadow theatre on warm paper; layered silhouettes; soft lamp light; slightly wobbly cut edges; animated on twos.
STYLE: coloured-pencil storybook on cream paper; visible pencil hatching; paper tooth; soft rounded shapes.
STYLE: hand-drawn crayon; grainy strokes, wobbly outlines, paper tooth on every surface.
STYLE: felt and wool; fuzzy edges; soft shadows; squishy shapes.
```

## Minimum life kit
```
LIFE: every character idles at all times: breathes (scaleY +3.5%, scaleX -1.5%, 3.2 s cycle, sine ease, anchored at its base) and blinks at irregular intervals (70 ms close, 120 ms open, 1.8-4.5 s apart). Arrivals ease out, moves ease in-out, exits ease in. Loose parts (flame, ears, tail) start 50-150 ms later and overshoot slightly. Travel on arcs, not straight lines. Anticipate big moves with a small opposite move. Set anchor points deliberately.
```

## Technical rules (Remotion)
```
TECH: Remotion. Drive every animation from useCurrentFrame() with interpolate() (clamped) and spring(). No CSS transitions or animations. Write times as seconds * fps. One component per scene, composed with <Sequence>. Colours, fonts, durations, easings and springs only from tokens.
```

## Technical rules (HTML + GSAP)
```
TECH: one self-contained HTML file + GSAP 3 from the CDN. One paused master timeline; window.TOTAL_FRAMES and window.renderFrame = (n) => { tl.seek(n / 30, false); } (return nothing). Canvas 2D or SVG only, no image files. Colours, durations and easings only from tokens/tokens.css (CSS variables) and the CustomEase names ll-enter, ll-move, ll-soft.
```

## Process + QA
```
PROCESS:
1. Write brief.md and a 5-7 beat storyboard. Stop and wait for my OK.
2. Build scene by scene. git commit after each scene; update PROGRESS.md.
3. Render stills at 3 key frames. Score each 1-10 for brand warmth, phone readability and motion. Fix the 3 worst issues. Repeat until all >= 8. Show me the stills and scores.
4. Only then render the final MP4 as out/[project]_full_v01.mp4 (never overwrite).
HONESTY: never invent facts, numbers or quotes. Label anything illustrative on screen. No image or video generators.
```

## Precise feedback template
```
FIX: Frame [N] (or frames [A-B]): [what's wrong]. Wanted: [what it should do]. Use: [token / library part / cheat-sheet row]. Don't change anything else.
```
