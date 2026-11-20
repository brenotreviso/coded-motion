# 7 · Video pipeline: from code to MP4

> **Goal:** turn an animation that plays in a browser into a video file you can post, with the same picture every time.

## The one big idea

A live web animation runs on the clock: if the computer is busy, frames get skipped. A **video** needs every frame drawn perfectly, one by one, however long it takes. So we **stop the clock**, and for each frame number we say "draw what the scene looks like at exactly this moment", then take a picture.

Remotion's docs put it as: "A video is a function of images over time. If you change content every frame, you'll end up with an animation" ([fundamentals](https://www.remotion.dev/docs/the-fundamentals)). The AI-video creators describe the same pipeline. @kaijucode on X: the model "never outputs video directly. It writes code, Chromium renders it frame by frame, and FFmpeg assembles everything into an MP4" ([post](https://x.com/kaijucode/status/2117604049969369485)).

**New words:** *headless browser*: a browser running with no window, controlled by a script. *ffmpeg*: free command-line tool that turns images and sound into video files. *Codec*: how the video is compressed (we use H.264, which plays everywhere).

## Three ways to render

| Path | You write | It renders with | Choose when |
|---|---|---|---|
| **A · Remotion** (main path) | React components using `useCurrentFrame()` | Remotion CLI (bundled Chrome + ffmpeg) | Most videos; templates; anything you'll make many of |
| **B · Frame-driven HTML** | A normal HTML page with a *paused* GSAP timeline and a `renderFrame(n)` function | `scripts/render-frames.mjs` (Puppeteer + Chrome) + ffmpeg | You built it in plain HTML/GSAP and want a video without rewriting |
| **C · HyperFrames** | HTML with seekable animations | HyperFrames CLI ([GitHub](https://github.com/heygen-com/hyperframes)) | You like Path B but want a ready-made tool with agent skills |

## Path A · Remotion in small steps

Example project: `examples/remotion-hello/` (tested 20 Nov 2026 with Remotion 4.0.545).

1. **Install** (needs Node.js): `cd examples/remotion-hello && npm install`
2. **Preview live:** `npm run studio` opens Remotion Studio in your browser, where you can scrub the timeline ([Studio docs](https://www.remotion.dev/docs/studio)).
3. **Read the code** in this order:
   - `src/Root.tsx`: one `<Composition>` = one video: id, size 1080 × 1920, 30 fps, 150 frames.
   - `src/GlowIntro.tsx`: everything is calculated from `useCurrentFrame()`: a `spring()` entrance, a sine-wave breath, blinks on fixed frames, and words revealed with `interpolate()` + `Easing.bezier()`.
   - `src/brand.ts`: tokens + fonts loaded with `@remotion/google-fonts` so no frame renders with a fallback font.
4. **Render key stills first** (cheap check):
   `npx remotion render GlowIntro out/stills --frames=30,75,140`
   Remotion's CLI docs: a comma-separated list "render[s] specific frames as an image sequence" (from v4.0.502) ([render CLI](https://www.remotion.dev/docs/cli/render)). One still: `npx remotion still GlowIntro out/still.png --frame=45` ([still CLI](https://www.remotion.dev/docs/cli/still)).
5. **Render the video:** `npm run render` → `out/glow-intro.mp4`.

**Remotion rules for beginners (and agents):**

- Drive *all* motion from the frame number. Remotion's agent skill says "CSS `transition` or `animation` will not render correctly" ([remotion-dev/skills](https://github.com/remotion-dev/skills)).
- Write times as `seconds * fps` so changing fps doesn't break timing.
- Use `<Sequence from={40}>` to start a part later; inside it, frame 0 = when it starts ([Sequence](https://www.remotion.dev/docs/sequence)).
- Clamp `interpolate()` (`extrapolateLeft/Right: "clamp"`) or values keep growing past the end.
- Load fonts and images *before* the frame renders (Remotion helpers do this).

**Licence reminder:** Remotion is free for individuals and companies of up to 3 people; larger companies need a company licence ([pricing](https://www.remotion.dev/docs/license/pricing)).

## Path B · Frame-driven HTML + headless Chrome + ffmpeg

Example: `examples/html/08-frame-render.html` + `scripts/render-frames.mjs` (tested 20 Nov 2026).

The page does three things:

```js
const tl = gsap.timeline({ paused: true });          // 1. build the timeline, but don't play it
// ... tl.from(...), tl.to(...)
window.TOTAL_FRAMES = 30 * 4;                         // 2. say how many frames
window.renderFrame = (n) => { tl.seek(n / 30, false); }; // 3. jump to frame n on request
```

Then:

```bash
npm install                                            # once, installs puppeteer-core
node scripts/render-frames.mjs examples/html/08-frame-render.html out/preview --every=10 --scale=0.25   # quick contact sheet
node scripts/render-frames.mjs examples/html/08-frame-render.html out/final --mp4                      # all frames + MP4
```

Under the hood: Chrome opens the page with no window, calls `renderFrame(n)` for each frame, screenshots it, and then ffmpeg joins the PNGs:

```bash
ffmpeg -framerate 30 -i out/final/frame-%05d.png -c:v libx264 -pix_fmt yuv420p -crf 18 out/final.mp4
```

- `-c:v libx264` = H.264 codec; `-pix_fmt yuv420p` = colour format that phones and Instagram play reliably; `-crf 18` = high quality (lower = better and bigger). See the [FFmpeg H.264 guide](https://trac.ffmpeg.org/wiki/Encode/H.264).

**Gotcha we hit while testing:** returning the GSAP timeline from `renderFrame` (an arrow function that returns `tl.seek(...)`) made Puppeteer hang trying to send the whole timeline object back to Node. Make `renderFrame` return nothing.

**Canvas animations** work the same way: draw from a time value you control (`draw(n / fps)`) instead of from `requestAnimationFrame`'s clock.

## Sound

| Kind | How in code | Notes |
|---|---|---|
| Music / sound effects files | Remotion `<Audio>` from `@remotion/media` ([docs](https://www.remotion.dev/docs/using-audio)); or add with ffmpeg afterwards | Use music you have the rights to |
| Synthesized tones (no files) | Web Audio API in the browser; render offline with `OfflineAudioContext` to a WAV ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)); or ffmpeg's `sine` source ([filters](https://ffmpeg.org/ffmpeg-filters.html#sine)) | Many viral code-made shorts synthesize their music; e.g. @0xCodez's prompt asked to "Synthesize the piano in Web Audio with harmonics, hammer noise and reverb. No audio files." |
| Voiceover | Record it, or use a text-to-speech tool, then time captions to it | Captions must match the audio exactly |

Merge a WAV with your silent MP4:

```bash
ffmpeg -i video.mp4 -i music.wav -c:v copy -c:a aac -shortest final.mp4
```

## Captions

- Word-by-word reveals with a highlight on the current word are common in today's explainer reels (see [chapter 9](09-trends.md)). See `examples/html/06-text-reveal.html`.
- Remotion has a captions package and docs ([Remotion captions](https://www.remotion.dev/docs/captions/)).
- Keep captions inside the safe margins. App buttons, the account name and the caption text cover parts of the frame; check on your own phone before posting.

## Export settings (our defaults)

| Setting | Value |
|---|---|
| Size | 1080 × 1920 (reels), 1080 × 1350 (feed) |
| Frame rate | 30 fps |
| Codec | H.264 (`libx264`), `yuv420p` |
| Quality | CRF 18-20 |
| Audio | AAC |
| File name | `<project>_<scene-or-cut>_v<NN>.mp4`, e.g. `glow-intro_full_v03.mp4` |

## Exercise

Change `08-frame-render.html` so the sun sets instead of rises. Render a 12-frame contact sheet first, check it, then render the MP4.

## Sources

- Remotion: fundamentals, CLI render, CLI still, Sequence, Studio, audio, captions, pricing: <https://www.remotion.dev/docs/the-fundamentals>, <https://www.remotion.dev/docs/cli/render>, <https://www.remotion.dev/docs/cli/still>, <https://www.remotion.dev/docs/sequence>, <https://www.remotion.dev/docs/studio>, <https://www.remotion.dev/docs/using-audio>, <https://www.remotion.dev/docs/captions/>, <https://www.remotion.dev/docs/license/pricing>
- Remotion agent skills: <https://github.com/remotion-dev/skills>
- HyperFrames: <https://github.com/heygen-com/hyperframes>
- @kaijucode: <https://x.com/kaijucode/status/2117604049969369485> · @0xCodez prompt (via awesome-opus5-5-videos): <https://x.com/0xCodez/status/2104257855142474136>
- FFmpeg H.264 guide: <https://trac.ffmpeg.org/wiki/Encode/H.264> · ffmpeg sine: <https://ffmpeg.org/ffmpeg-filters.html#sine>
- MDN OfflineAudioContext: <https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext>
