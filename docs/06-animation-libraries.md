# 6 · Animation libraries

> **Animation library:** code that changes values over time for you (position, colour, scale…) with easing, delays and sequencing, so you don't have to write the maths every time.

## Which to learn first: GSAP

We teach **GSAP** first because it works on *anything* (HTML, SVG, Canvas values, plain objects), has the best sequencing tool (timelines), and is now free. The GSAP pricing page says: "GSAP is now 100% free for all users, thanks to Webflow's support" ([gsap.com/pricing](https://gsap.com/pricing/)). The npm package's licence field is GSAP's own "Standard 'no charge' license" ([gsap.com/standard-license](https://gsap.com/community/standard-license/)), **not** MIT. Our MIT-licensed examples only *load* GSAP from a CDN; they don't copy it.

### GSAP in 5 small steps

**Step 1: Load it.**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js"></script>
```

**Step 2: One tween.** `gsap.to()` goes from now *to* the values; `gsap.from()` comes *from* them; `gsap.fromTo()` sets both.
```js
gsap.to(".dot", { x: 400, duration: 1, ease: "power2.out" });
```

**Step 3: A timeline.** Tweens play one after another unless you say otherwise.
```js
const tl = gsap.timeline();
tl.from(".sun",   { y: 300, duration: 1.2, ease: "power3.out" })
  .from(".title", { opacity: 0, y: 40, duration: 0.6 }, "-=0.4"); // start 0.4 s before the previous ends
```

**Step 4: The position parameter** (the 3rd argument) is GSAP's superpower:

| Value | Means |
|---|---|
| `"-=0.4"` | 0.4 s before the end of the timeline so far (overlap) |
| `"+=0.5"` | 0.5 s gap |
| `"<"` | Same start as the previous tween |
| `"<0.1"` | 0.1 s after the previous tween's start |
| `2` | Exactly at 2 s |
| `"speak"` | At a label you added with `tl.addLabel("speak")` |

**Step 5: Control.** `tl.play()`, `tl.pause()`, `tl.restart()`, `tl.seek(2.5)`, `tl.timeScale(0.5)` (slow motion, great for checking timing).

Plugins used in this guide (all included in the free package): **CustomEase** (brand curves), **MotionPathPlugin** (arcs), **SplitText** (split text into words/letters for reveals). See [GSAP Get Started](https://gsap.com/resources/get-started/) and [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/).

**Tutorials:** GSAP's own YouTube channel ([@GreenSockLearning](https://www.youtube.com/@GreenSockLearning)). A recent long beginner course: *The Ultimate GSAP Crash Course for Absolute Beginners (2026)* by HankTheTank ([video](https://www.youtube.com/watch?v=aJmP2II5R4U), 1 h 04 min).

## The others, side by side

| Library | Best at | Licence (npm, 20 Nov 2026) | Use when |
|---|---|---|---|
| **GSAP** 3.15 | Timelines, any target, plugins | GSAP Standard "no charge" | Learning; HTML/SVG/Canvas scenes; frame-seekable video scenes |
| **Motion** 14.x (was Framer Motion) | React/Vue/JS UI: layout, gestures, springs. The homepage says "Motion (prev Framer Motion)" ([motion.dev](https://motion.dev/)) | MIT | Building React interfaces |
| **anime.js** 4.x | Lightweight JS animation; also draggables and timelines ([animejs.com](https://animejs.com/)) | MIT | Small sites; a simpler GSAP-like option |
| **CSS transitions / @keyframes** | Simple state changes, no library | n/a | Hover, small UI motion ([Josh W. Comeau's CSS transitions guide](https://www.joshwcomeau.com/animation/css-transitions/)) |
| **Web Animations API** | Browser-native JS animation ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)) | n/a | When you want no dependencies |
| **Lottie** (lottie-web 5.x) | Plays After Effects exports | MIT | Designer-made loops |
| **Rive** (@rive-app/canvas 2.x) | Interactive state-machine animation | MIT (runtime) | Characters reacting to input |
| **Remotion** 4.x | React → video, frame-based | Remotion License (free for individuals and companies ≤ 3 people) ([pricing](https://www.remotion.dev/docs/license/pricing)) | Rendering MP4s, templates |
| **Three.js** (r187) | 3D | MIT | 3D scenes |

Versions and licence fields read from the npm registry on 20 Nov 2026: `gsap` 3.15.1, `motion` 14.14.0 (MIT), `animejs` 4.5.0 (MIT), `three` 0.187.0 (MIT), `lottie-web` 5.13.0 (MIT), `@rive-app/canvas` 2.53.0 (MIT), `remotion` 4.0.545 ("SEE LICENSE IN LICENSE.md"). For p5.js, npm lists LGPL-2.1.

## Same idea, four libraries

A dot that arrives with our brand ease:

```js
// GSAP
gsap.from(".dot", { y: 80, opacity: 0, duration: 0.4, ease: "ll-enter" });

// Motion (vanilla JS)
import { animate } from "motion";
animate(".dot", { y: [80, 0], opacity: [0, 1] }, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });

// CSS
.dot { animation: arrive 400ms cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes arrive { from { transform: translateY(80px); opacity: 0; } }

// Remotion (inside a component)
const p = interpolate(frame, [0, 12], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: "clamp" });
<div style={{ transform: `translateY(${(1 - p) * 80}px)`, opacity: p }} />
```

## Live vs rendered: an important difference

GSAP, Motion and CSS normally run **in real time**. If the computer is slow, frames are skipped. For **video** you need **frame-exact** control: the same frame number must always give the same picture. Two ways:

- **Remotion**: everything is computed from `useCurrentFrame()`. Its docs: "A video is a function of images over time" ([fundamentals](https://www.remotion.dev/docs/the-fundamentals)).
- **GSAP paused timeline + seek**: `tl.pause(); tl.seek(frame / fps);` per frame. That's how `examples/html/08-frame-render.html` works. [Open the live demo](examples/08-frame-render.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/08-frame-render.html).

Remotion's official agent skills say the same thing: "Drive animations using `useCurrentFrame()` and `interpolate()`. CSS `transition` or `animation` will not render correctly" ([remotion-dev/skills](https://github.com/remotion-dev/skills)). It's also lateascent's rule "animate only by frame number, no CSS transitions" ([post](https://x.com/lateascent/status/2112959072743886912)).

## Exercise

Rebuild `examples/html/00-hello-gsap.html` three ways: CSS only, GSAP, and Web Animations API. Which one could you pause at exactly 0.25 s?

[Open the live demo](examples/00-hello-gsap.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/00-hello-gsap.html).

## Sources

- GSAP pricing / licence: <https://gsap.com/pricing/>, <https://gsap.com/community/standard-license/>
- GSAP Get Started: <https://gsap.com/resources/get-started/> · SplitText: <https://gsap.com/docs/v3/Plugins/SplitText/>
- Motion: <https://motion.dev/> · anime.js: <https://animejs.com/> · MDN Web Animations API: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API>
- Josh W. Comeau, CSS transitions: <https://www.joshwcomeau.com/animation/css-transitions/>
- Remotion fundamentals and pricing: <https://www.remotion.dev/docs/the-fundamentals>, <https://www.remotion.dev/docs/license/pricing>
- npm registry licence fields (read 20 Nov 2026): gsap, motion, animejs, three, lottie-web, @rive-app/canvas, remotion
- HankTheTank, GSAP crash course: <https://www.youtube.com/watch?v=aJmP2II5R4U>
