# Week 3 · Arcs, anchors, squash & follow-through

**Goal:** fix the most common reasons beginner animation looks stiff.

## Lesson

### 1. Anchor points (`transform-origin`)
Things rotate and scale around an **anchor point**. A door swings from its hinge; a lantern hangs from its top. Default is the centre, which is often wrong.
```js
gsap.to("#lantern", { rotation: 15, transformOrigin: "50% 0%", yoyo: true, repeat: -1 });
```
`"50% 0%"` = middle of the top edge. Compare the three lanterns in `examples/html/03-transform-origin.html`.

[Open the live demo](../examples/03-transform-origin.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/03-transform-origin.html).

### 2. Arcs
Living things move on curves. Use GSAP's MotionPathPlugin:
```js
gsap.registerPlugin(MotionPathPlugin);
gsap.to("#leaf", { duration: 2, ease: "power1.inOut",
  motionPath: { path: "#arc", align: "#arc", alignOrigin: [0.5, 0.5], autoRotate: true } });
```
See `examples/html/02-arcs.html`: a straight path vs an arc. The arc wins every time.

[Open the live demo](../examples/02-arcs.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/02-arcs.html).

### 3. Squash & stretch
Squash on landing (wider, shorter); stretch while falling fast (thinner, taller). Keep the volume about the same: if `scaleY` goes to 0.8, `scaleX` goes to about 1.2. Anchor at the **bottom** so it squashes into the floor. See `examples/html/05-squash-stretch.html`.

[Open the live demo](../examples/05-squash-stretch.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/05-squash-stretch.html).

### 4. Anticipation
Before a big move, a small move the other way. A jump starts with a crouch.

### 5. Follow-through & overlapping action
When the body stops, loose parts (hair, ears, a flame) keep going a little, then settle. Start them slightly later (`"<0.08"`) and let them overshoot.

### 6. Motion blur (bonus)
Fast motion in real cameras smears. In code we fake it: stretch by speed, or draw a few faded copies. See `examples/html/04-motion-blur.html`.

[Open the live demo](../examples/04-motion-blur.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/04-motion-blur.html).

## Project · "The bouncing lantern"

A lantern (a rounded rectangle with a little flame) falls, lands, bounces twice and settles. Include:
anticipation before the first jump · stretch while falling · squash on landing (bottom anchor) · the flame following through (lags then catches up) · the path as an arc.

**Done when:** it passes rows 1-8 of the [fix-stiff-motion cheat sheet](../docs/fix-stiff-motion.md).

## Checklist
- [ ] I set `transformOrigin` on purpose for everything that rotates or scales
- [ ] At least one movement follows an arc (motion path)
- [ ] Squash and stretch keep the volume roughly constant
- [ ] There's anticipation before the big move
- [ ] A loose part follows through and settles after the body stops
- [ ] I compared my work to examples 02, 03, 05
