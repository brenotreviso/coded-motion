# Week 5 · Remotion and the video pipeline

**Goal:** turn code into an MP4 you can post.

## Lesson

### 1. Why animation in a browser isn't a video yet
A web page plays in real time; a slow computer drops frames. A **video** needs every frame drawn perfectly, one by one. So we make animation **frame-driven**: "what does frame 47 look like?" always has the same answer.

### 2. Two ways to get a video
- **HTML + GSAP:** pause the timeline and jump to each frame: `tl.seek(frame / 30)`. A script opens the page in a hidden (headless) Chrome, takes a screenshot per frame and joins them with ffmpeg. That's `scripts/render-frames.mjs` + `examples/html/08-frame-render.html`. [Open the live demo](../examples/08-frame-render.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/08-frame-render.html).
- **Remotion:** you write the video as React components. Remotion handles frames, audio and export ([remotion.dev](https://www.remotion.dev/docs/)). This is our main video tool.

### 3. Remotion in four ideas
```tsx
const frame = useCurrentFrame();                 // 0, 1, 2 … which frame is being drawn
const { fps } = useVideoConfig();                // 30
const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }); // fade in over 20 frames
const pop = spring({ frame, fps, config: { stiffness: 180, damping: 10 } });          // springy 0 → 1
```
- `interpolate` maps frame numbers to values. Always clamp.
- `spring` gives physical motion.
- `<Sequence from={40}>` starts a part later.
- **Never** use CSS transitions or animations in Remotion: they don't render correctly.

### 4. Run the example
```bash
cd examples/remotion-hello
npm install
npm run studio            # preview in the browser
npm run still             # one PNG — cheap check
npm run render            # the MP4 — do this last
```
Licence note: Remotion is free for individuals and companies of up to 3 people; bigger companies need a licence ([Remotion licence](https://www.remotion.dev/docs/license)).

### 5. Check cheap, render once
Look at stills (frames 30, 75, 140) before rendering the full video. A full render of the 5-second example took about 18 s on our test machine (8-core Linux server, November 2026); a still takes a few seconds.

## Project · "Your first MP4"

Rebuild your week-4 title card in Remotion (start from `examples/remotion-hello`). Use `useBreath` and `blinkAt` from `library/remotion/life-kit.tsx`. Render 3 stills, fix what you see, then render the MP4.

**Done when:** the MP4 plays on your phone, matches your HTML version, and the font is the brand font (not a fallback).

## Checklist
- [ ] I can explain "frame-driven" in one sentence
- [ ] I rendered an HTML page to frames with `render-frames.mjs`
- [ ] My Remotion code uses `useCurrentFrame`, `interpolate` (clamped) and `spring`, no CSS animation
- [ ] I checked stills before the full render
- [ ] My file is named with a version: `title_v01.mp4`
- [ ] Passes [QA before render](../checklists/qa-before-render.md)
