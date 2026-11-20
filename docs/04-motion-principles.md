# 4 · Motion principles

> **Goal:** understand *why* some movement feels alive and some feels stiff, and turn each idea into code you can type.

Everything here works the same in GSAP, CSS, Canvas or Remotion. Only the syntax changes. Open the examples in `examples/html/` as you read, or use the live demo link under each one. The full list is on the [Examples](examples.md) page.

## Part A · Disney's 12 principles, translated to code

The "12 basic principles of animation" were introduced by Disney animators **Ollie Johnston and Frank Thomas** in their 1981 book *The Illusion of Life: Disney Animation* ([Wikipedia summary](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)). They were written for hand-drawn characters, but every one maps onto code. The best free video introduction is Alan Becker's series ([*12 Principles of Animation (Official Full Series)*](https://www.youtube.com/watch?v=uDqjIdI4bF4), AlanBeckerTutorials; about 16.2 million views on 20 Nov 2026).

| # | Principle | Plain meaning | In code | Example |
|---|---|---|---|---|
| 1 | **Squash & stretch** | Soft things change shape when they move or hit; volume stays the same | `scaleY` up + `scaleX` down while falling; the reverse on impact; `scaleX × scaleY ≈ 1` | [05](#ex-05) |
| 2 | **Anticipation** | A small move the *opposite* way before the main move (crouch before a jump) | A short tween backwards (5-15% of the main distance) before the main tween | [05](#ex-05) (crouch) |
| 3 | **Staging** | Make the one important thing obvious | Dim or blur the rest, move only one thing at a time, put it where the eye already is | [06](#ex-06) |
| 4 | **Straight ahead vs pose to pose** | Draw every frame in order, *or* key poses first and fill in | Code is naturally pose-to-pose: you set keyframes, the tween fills in. Simulations (particles, physics) are "straight ahead" | [04](#ex-04) |
| 5 | **Follow-through & overlapping action** | Loose parts keep moving after the body stops, and parts don't all move at once | Delay child tweens 50-150 ms; give them slightly longer durations or an overshoot ease | [07](#ex-07) (flame) |
| 6 | **Slow in & slow out** | Things speed up and slow down instead of jumping to full speed | **Easing** (Part B) | [01](#ex-01) |
| 7 | **Arcs** | Natural movement follows curves | Motion paths / bezier curves; or animate x and y with *different* easings | [02](#ex-02) |
| 8 | **Secondary action** | A smaller action that supports the main one (blinking while talking) | A second, independent loop on a part (eyes, flame, leaf) | [07](#ex-07) (blink) |
| 9 | **Timing** | How many frames an action takes, which tells you weight and mood | Duration tokens; heavier = longer, but with faster acceleration once moving | all |
| 10 | **Exaggeration** | Push it a bit further than reality so it reads clearly | Overshoot eases (`back.out`), bigger squash on impact, but within brand limits | [01](#ex-01) |
| 11 | **Solid drawing** | Shapes feel like they have weight and volume | Shading, consistent light direction, keep proportions while scaling | [07](#ex-07) |
| 12 | **Appeal** | The character is pleasant and readable | Simple silhouette, big readable shapes, clear eyes; fewer, better details | [07](#ex-07) |

## Part B · Timing and spacing

Two words animators use constantly:

- **Timing** = *how long* (how many frames).
- **Spacing** = *how far* the object moves between each frame.

Alex Grigg makes the key point in *Animation Basics in 14 Minutes*: the same 24-frame move can feel completely different just by changing how the spacing is spread across those frames. "these motions all feel quite different but they have the exact same timing… all of the difference in the way that they feel comes from the amount of space we put between the frames" ([video](https://www.youtube.com/watch?v=pF--YKCCUMw), Alex Grigg // Animation for Anyone). **Easing is how code controls spacing.**

**Rules of thumb (starting points, not laws):**

| Situation | Try |
|---|---|
| Small UI change | 150-250 ms |
| Object enters the frame | 400-700 ms with an ease-out |
| Big move across the screen | 600-1000 ms with ease-in-out |
| Scene change | 800-1500 ms |
| Breathing / floating loops | 2-4 s per cycle, sine ease, yoyo |
| A blink | ~70 ms close, ~120 ms open |

For interfaces, keep it short. Emil Kowalski: "Your animations should also usually be shorter than 300ms" ([great animations](https://emilkowal.ski/ui/great-animations)). For calm brand video you can go slower (see our [tokens](03-design-system.md)).

## Part C · Easing curves

An **easing curve** is a graph of *progress* (0 → 1) over *time* (0 → 1). A straight diagonal line is **linear** (constant speed, which feels robotic). Curves make it feel physical.

| Family | Feels like | Use for |
|---|---|---|
| **ease-out** (fast → slow) | Arriving, landing, responding | Things entering; reacting to a tap |
| **ease-in** (slow → fast) | Leaving, falling, launching | Things exiting the screen |
| **ease-in-out** (slow → fast → slow) | Moving from A to B | Moves within the frame |
| **back / overshoot** | Goes slightly past, comes back | Playful arrivals (sparingly) |
| **elastic / bounce** | Springy, cartoony | Mascots, never body text |
| **linear** | Machine, constant | Rotating wheels, scrolling backgrounds, progress |

### Cubic bezier: the curve as four numbers

CSS and our tokens write a curve as `cubic-bezier(x1, y1, x2, y2)`. Those are the two **control points** that bend the line between (0,0) and (1,1). Play with them at [cubic-bezier.com](https://cubic-bezier.com); compare named curves at [easings.net](https://easings.net). MDN explains the full syntax ([MDN: easing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)).

- y values above 1 or below 0 make **overshoot**.
- GSAP's built-in names (`power1`-`power4`, `sine`, `expo`, `back`, `elastic`, `bounce`) each come in `.in`, `.out`, `.inOut`. Their docs include a visualiser ([GSAP eases](https://gsap.com/docs/v3/Eases/)). GSAP's docs put it simply: changing the ease "can adjust the entire feel and personality of your animation".
- Custom brand curves: `CustomEase.create("ll-enter", "0.16,1,0.3,1")` ([CustomEase](https://gsap.com/docs/v3/Eases/CustomEase/)).

▶ **Try it:** `examples/html/01-easing.html`: nine balls, same duration, different easing. [Open the live demo](examples/01-easing.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/01-easing.html). <a id="ex-01"></a>

## Part D · Springs

A **spring** doesn't use a fixed duration. It simulates a weight on a spring, so it can overshoot and settle naturally, and it can be interrupted smoothly. Josh W. Comeau: "Spring physics are like a secret ingredient; they make all animations taste better" ([A Friendly Introduction to Spring Physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)).

Three settings (names from [Remotion's `spring()` docs](https://www.remotion.dev/docs/spring)):

| Setting | What it does | Turn it up → |
|---|---|---|
| **stiffness** | How strongly the spring pulls toward the target | Faster, bouncier |
| **damping** | How much it's slowed down (friction) | Less bounce, settles sooner |
| **mass** | How heavy the object is | Slower, more momentum. Remotion's docs: "If you reduce the mass, the animation becomes faster!" |

Remotion's docs also warn that springs "may overshoot the target a bit, before they bounce back." That's the point, but keep it subtle for text.

In GSAP, approximate springs with `elastic.out(amplitude, period)` or `back.out(strength)`. In React UI, the Motion library offers physics springs (`stiffness`, `damping`, `mass`) and simpler duration-based springs (`duration` + `bounce`) ([Motion: transitions](https://motion.dev/docs/react-transitions)).

## Part E · Curvature, arcs and bezier paths

Straight lines read as mechanical. Two ways to get arcs:

1. **Motion path**: draw an SVG path (`M` move, `C` cubic curve with two control points) and make the object follow it. GSAP's MotionPathPlugin does this, and `autoRotate: true` turns the object to face its direction ([MotionPathPlugin](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/)). CSS can do it too with `offset-path` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path)).
2. **Split axes**: animate `x` with one ease and `y` with another (e.g. `x: power1.inOut`, `y: power2.out` up then `power2.in` down). The result is a curve, like a thrown ball.

Learn how SVG path commands work with Josh W. Comeau's interactive guide ([An Interactive Guide to SVG Paths](https://www.joshwcomeau.com/svg/interactive-guide-to-paths/)).

▶ **Try it:** `examples/html/02-arcs.html`: straight path vs bezier arc, with visible control points. [Open the live demo](examples/02-arcs.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/02-arcs.html). <a id="ex-02"></a>

## Part F · Anchor point (transform-origin)

Every rotation and scale happens **around a point**. In After Effects it's the *anchor point*; in CSS it's `transform-origin` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)). The default is the centre, which is wrong for most real things:

| Thing | Anchor |
|---|---|
| Hanging lantern, pendulum | Top (where it hangs) |
| Door | The hinge edge |
| Character breathing / squashing on the floor | Bottom centre |
| Head nodding | Base of the neck |
| Flame, plant, hair swaying | Where it's attached |

In GSAP: `transformOrigin: "50% 100%"`. For SVG, GSAP also has `svgOrigin: "200 350"` (a point in the SVG's own coordinates) ([GSAP CSSPlugin docs](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/)).

▶ **Try it:** `examples/html/03-transform-origin.html`: same rotation, three anchors; only one swings like a real lantern. [Open the live demo](examples/03-transform-origin.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/03-transform-origin.html).

## Part G · Motion blur

Real cameras keep the shutter open for a fraction of each frame, so fast objects smear. Code draws perfectly sharp frames, so fast movement can look like it's "strobing". Options, cheapest first:

1. **Stretch by speed**: scale the object along its direction of travel in proportion to its speed (cheap; good for balls, dots, UI).
2. **Smear frames / trails**: draw a few faded copies behind the object.
3. **Sub-frame sampling** (true motion blur): render several moments inside one frame and blend them. Remotion's docs describe motion blur as an effect that "samples frames from before and after the current time and blends them together", and call it "essential, albeit expensive" ([Remotion: motion blur](https://www.remotion.dev/docs/motion-blur)).
4. **CSS `filter: blur()`** on a moving element: quick, but blurs in all directions, not just along the motion ([MDN blur()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur)).

Use blur only where speed is high; slow, gentle brands rarely need it.

▶ **Try it:** `examples/html/04-motion-blur.html`: none vs sub-frame samples vs stretch. [Open the live demo](examples/04-motion-blur.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/04-motion-blur.html). <a id="ex-04"></a>

## Part H · Layering and depth

- **Layers**: background, midground, foreground, UI/captions. Keep them as separate elements or groups.
- **Parallax**: far layers move less than near layers (e.g. background 0.2×, mid 0.5×, front 1×). It instantly suggests depth.
- **Overlap**: start the next tween before the previous ends (GSAP position parameter `"-=0.2"` or `"<0.1"`) so motion flows instead of queuing.
- **Stagger**: the same tween on many items, each a little later (`stagger: 0.06`). It reads as one gesture, not twelve.

## Part I · Follow-through and overlap in practice

When the main body stops, its loose parts (hair, ears, flames, cloth, a tail) **keep going a little, then settle**. In code:

```js
tl.to("#body",  { y: 0, duration: 0.4, ease: "power2.out" })
  .to("#flame", { y: 0, duration: 0.6, ease: "back.out(2)" }, "<0.08"); // starts 80 ms later, overshoots
```

Rule: **nothing important stops on the same frame as everything else.**

▶ **Try it:** `examples/html/07-breathing-idle.html`. [Open the live demo](examples/07-breathing-idle.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/07-breathing-idle.html). <a id="ex-07"></a>

## Part J · Staging for short vertical video

- One focal point per moment. Move the eye with motion: the thing that moves is what people look at.
- Keep captions in the middle band, inside safe margins.
- Hold important text still long enough to read (our rule of thumb: at least as long as it takes you to read it aloud twice; test it on a phone).
- Use the word-by-word reveal with a highlight on the current word: it was common in the 2026 explainer reels we reviewed ([chapter 9](09-trends.md)).

▶ **Try it:** `examples/html/06-text-reveal.html`. [Open the live demo](examples/06-text-reveal.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/06-text-reveal.html). <a id="ex-06"></a>

## Part K · Performance and accessibility (for anything shown live in a browser)

- Animate **`transform` and `opacity`** when you can. web.dev: "Stick to transform and opacity changes for your animations" ([web.dev](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count)). Animating `width`, `top` or `margin` makes the browser redo layout every frame.
- Respect **reduced motion**: MDN notes that animations such as "scaling or panning large objects can be vestibular motion triggers" ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)). Example 07 checks `prefers-reduced-motion` and turns off the loops.
- Rendered videos aren't affected by the browser's speed, because they're rendered frame by frame ([chapter 7](07-video-pipeline.md)).

▶ **Try it:** `examples/html/05-squash-stretch.html` for squash, stretch and anticipation together. [Open the live demo](examples/05-squash-stretch.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/05-squash-stretch.html). <a id="ex-05"></a>

## Exercise

Take `00-hello-gsap.html`. Make the dot (1) anticipate (move left 30 px first), (2) travel on an arc, (3) squash when it stops, and (4) have a small "tail" dot that follows through. Then show it to someone and ask: does it feel alive?

[Open the live demo](examples/00-hello-gsap.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/00-hello-gsap.html).

## Sources

- *The Illusion of Life* and the 12 principles (summary): <https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation>
- AlanBeckerTutorials, *12 Principles of Animation (Official Full Series)*: <https://www.youtube.com/watch?v=uDqjIdI4bF4> (view count via TubeAlfred, 20 Nov 2026)
- Alex Grigg, *Animation Basics in 14 Minutes (6 Big ideas for beginners)*: <https://www.youtube.com/watch?v=pF--YKCCUMw> (quote from transcript)
- Emil Kowalski, *Great animations*: <https://emilkowal.ski/ui/great-animations>
- Josh W. Comeau, *A Friendly Introduction to Spring Physics*: <https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/>
- Josh W. Comeau, *An Interactive Guide to SVG Paths*: <https://www.joshwcomeau.com/svg/interactive-guide-to-paths/>
- GSAP Eases, CustomEase, MotionPathPlugin, CSSPlugin: <https://gsap.com/docs/v3/Eases/>, <https://gsap.com/docs/v3/Eases/CustomEase/>, <https://gsap.com/docs/v3/Plugins/MotionPathPlugin/>, <https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/>
- Remotion `spring()` and motion blur: <https://www.remotion.dev/docs/spring>, <https://www.remotion.dev/docs/motion-blur>
- MDN: easing-function, transform-origin, offset-path, blur(), prefers-reduced-motion
- web.dev, compositor-only properties: <https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count>
- cubic-bezier.com, easings.net
