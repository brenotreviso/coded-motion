# remotion-hello · GlowIntro

A minimal 5-second Remotion video (1080x1920, 30 fps, 150 frames) in the Little Lantern brand: Glow springs in, breathes, blinks at frames 70 and 118, and a caption reveals word by word.

```bash
npm install
npm run studio     # preview and scrub in the browser
npm run still      # frame 45 → out/still.png (cheap check)
npm run preview    # half-size MP4 → out/preview.mp4
npx remotion render GlowIntro out/stills --frames=30,75,140 --scale=0.5   # 3 stills only
npm run render     # full MP4 → out/glow-intro.mp4 (do this last)
```

| File | What it does |
|---|---|
| `src/Root.tsx` | Registers the `GlowIntro` composition (size, fps, length) |
| `src/GlowIntro.tsx` | The video: spring entrance, breath, blinks, `<Sequence>` caption |
| `src/brand.ts` | Brand tokens + font loading (Fraunces, Nunito via `@remotion/google-fonts`) |

Versions are pinned (Remotion 4.0.545). Remotion's licence: free for individuals and companies of up to 3 people; larger companies need a company licence ([details](https://www.remotion.dev/docs/license)).

Tested 20 Nov 2026: `tsc` passes; still at frame 60, 3 half-size stills (≈4 s) and the full MP4 (≈18 s) rendered on an 8-core Linux machine.
