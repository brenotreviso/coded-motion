# 5 · Code types: which kind of code for which job

> **Goal:** know the main ways to make moving pictures with code, what each is good and bad at, and which one to reach for.

There are two big questions:

1. **How do you draw?** With *elements* the browser keeps track of (HTML, SVG), or by *painting pixels* yourself each frame (Canvas, WebGL)?
2. **How do you get it out?** As a live web page, as a file another app plays (Lottie, Rive), or as a video (Remotion, frame capture)?

## The map

| Code type | What it is (plain words) | Great for | Weak at | Learn first? |
|---|---|---|---|---|
| **HTML + CSS** | Boxes and text styled by CSS; CSS transitions/keyframes can animate them | Text, captions, cards, UI, layouts | Thousands of objects, organic drawing | **Yes** |
| **SVG** | Vector shapes (paths, circles) described in XML inside the page | Logos, icons, line drawing, characters made of shapes, morphing | Very many objects; photo-like images | **Yes** |
| **Canvas 2D** | A blank pixel surface you repaint every frame with JS ([MDN Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)) | Particles, textures, hand-drawn/grainy looks, thousands of things, generative art | Text layout, accessibility, clicking individual shapes | After week 2 |
| **p5.js** | A friendly library around Canvas, made for artists and beginners (Processing community) ([p5js.org](https://p5js.org/)) | Learning creative coding, generative sketches | Big production apps | Optional, great for students |
| **WebGL / Three.js** | GPU-powered 3D in the browser ([three.js manual](https://threejs.org/manual/)) | 3D scenes, low-poly worlds, lighting, shaders | Beginners; text-heavy work | Side path |
| **GSAP / Motion / anime.js** | *Animation engines*: they change values over time on any of the above | Timing, easing, sequencing | Drawing (they don't draw) | **GSAP first** ([chapter 6](06-animation-libraries.md)) |
| **Remotion** | Write video as React components; each frame is a function of the frame number; renders MP4 ([fundamentals](https://www.remotion.dev/docs/the-fundamentals)) | Branded video, templates, data-driven video, AI-agent video | Live interactive sites | **Yes, for video** |
| **HyperFrames** | Open-source tool (HeyGen) that turns "HTML, CSS, media, and seekable animations into deterministic MP4 videos", with agent skills ([GitHub](https://github.com/heygen-com/hyperframes)) | Agents writing HTML video | Newer tool, smaller community than Remotion | Side path |
| **Lottie** | A JSON animation format, usually exported from After Effects with the Bodymovin plugin, played by small runtimes ([airbnb.io/lottie](https://airbnb.io/lottie/), [format docs](https://lottiefiles.github.io/lottie-docs/)) | Designer-made icons and loops inside apps and sites | Writing by hand; interactivity | Side path |
| **Rive** | An editor + runtimes for interactive vector animation with *state machines*; now describes itself as "an agent-native 2D and 3D engine" ([rive.app/docs](https://rive.app/docs)) | Interactive characters, buttons that react, games | Pure code workflows (the editor is central) | Side path |
| **Manim** | "A community maintained Python library for creating mathematical animations" ([manim.community](https://www.manim.community/)) | Maths and science explainers | Character animation | Optional |
| **Blender (Python)** | 3D software you can script; agents can write the Python | Claymation-like and realistic 3D | Heavy install, slow renders | Side path |

## How to choose (decision steps)

1. **Is the final thing a video file?** → Remotion (or frame-driven HTML + capture, [chapter 7](07-video-pipeline.md)).
2. **Is it a live web page or app?** → HTML/CSS/SVG + GSAP (or Motion if the site is React).
3. **Thousands of particles, grain, brush strokes?** → Canvas 2D (or p5.js while learning).
4. **Real 3D?** → Three.js (or Blender for heavy renders).
5. **A designer hands you an After Effects animation?** → Lottie.
6. **An interactive character that reacts to clicks?** → Rive.

Most real projects **mix**: SVG characters + HTML captions + Canvas grain overlay, all timed by GSAP or by Remotion's frame number.

## What the code-made videos on social media actually use

From our review of creators who *published their prompts* (details and links in [chapter 9](09-trends.md)):

| Look | Code type they named |
|---|---|
| Paper cut-out shadow theatre (@x4b47x) | "pure javascript animation" |
| Crayon cat playing piano (@0xCodez) | Single `index.html`, piano synthesized in Web Audio |
| Coloured-pencil storybook explainer (@woojinrad) | "drawn entirely in JavaScript on an HTML canvas", Web Audio soundtrack |
| Four seasons from a train window (@itsolelehmann) | Canvas, "100% Claude Code" |
| Black cat on a moonlit canal (@blitast_studio) | Three.js, "Zero image or audio files" |
| Claymation desk loop (@wikiwayne) | Built twice: Blender Python script and Three.js |
| Kinetic typography (@Gdgtify) | One HTML file, SVG and/or Canvas |

The pattern: **plain HTML + Canvas/SVG + JavaScript, with sound generated in code**, then captured to video.

## Exercise

Take the same idea (a sun rising) and make it three ways: CSS only, SVG + GSAP, and Canvas 2D. Write down which was fastest to make and which looked best.

## Sources

- MDN Canvas basic animations: <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations>
- p5.js: <https://p5js.org/> · three.js manual: <https://threejs.org/manual/>
- Remotion fundamentals: <https://www.remotion.dev/docs/the-fundamentals>
- HyperFrames (Apache-2.0 per GitHub API, 20 Nov 2026): <https://github.com/heygen-com/hyperframes>
- Lottie: <https://airbnb.io/lottie/> · Lottie format docs: <https://lottiefiles.github.io/lottie-docs/>
- Rive docs: <https://rive.app/docs> · Manim: <https://www.manim.community/>
- Creator posts: see [chapter 9 sources](09-trends.md#sources)
