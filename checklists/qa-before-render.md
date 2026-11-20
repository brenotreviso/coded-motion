# QA before render

Run this on stills or a contact sheet first. Render the final MP4 only when every box is ticked.

**Readability**
- [ ] Each caption on screen long enough to read twice (our rule of thumb: ≥ 0.3 s per word + 1 s)
- [ ] Captions ≤ 6 words per line, inside the safe margin (120 px at 1080 wide)
- [ ] Message makes sense with sound off

**Brand**
- [ ] Only token values used (search the code for `#` hex and raw `ms`)
- [ ] Fonts loaded (no fallback font in the stills)

**Motion** (see [fix stiff motion](../docs/fix-stiff-motion.md))
- [ ] Nothing moves linearly except constant spins/scrolls
- [ ] Characters idle at all times (breathe + blink)
- [ ] Anchor points set on everything that rotates or scales
- [ ] Moves follow arcs; big moves anticipate; loose parts follow through
- [ ] Not everything starts or stops on the same frame
- [ ] One focal point per moment (staging)

**Technical**
- [ ] Frame-driven: frame N always looks the same (render the same frame twice and compare)
- [ ] No console errors (`npm run check` for HTML)
- [ ] Stills scored ≥ 8/10 on brand warmth, phone readability, motion
- [ ] Output name is versioned (`_v01`, `_v02` …); nothing overwritten
