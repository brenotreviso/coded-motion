# 3 · Design system & tokens

> **Design system:** the set of reusable decisions and parts (colours, type, spacing, motion, components) that keeps everything consistent.
> **Design token:** one of those decisions, given a name and stored as data. `color.apricot = #f2a65a` is a token. So is `motion.duration.base = 400ms`.

## Why tokens matter even more for motion

Colours are easy to see when they're wrong. Motion isn't. Two scenes with slightly different easings just feel "off" without anyone knowing why. Tokens fix that: **every duration and every easing in every video comes from the same short list.** They also make AI agents far more consistent, because "use `motion.easing.enter`" is impossible to misread.

## The file format

We store tokens in JSON following the **W3C Design Tokens Community Group (DTCG) Format Module, version 2025.10**, which the spec page describes as stable ([designtokens.org/TR/2025.10/format](https://www.designtokens.org/TR/2025.10/format/)). Each token has a `$value`, and a `$type` (set on the token or inherited from its group).

```json
"motion": {
  "duration": {
    "$type": "duration",
    "base": { "$value": { "value": 400, "unit": "ms" } }
  },
  "easing": {
    "$type": "cubicBezier",
    "enter": { "$value": [0.16, 1, 0.3, 1] }
  }
}
```

What the spec says about these two types (paraphrased):

- **duration**: an object with a numeric `value` and a `unit` of `"ms"` or `"s"`.
- **cubicBezier**: an array of four numbers `[P1x, P1y, P2x, P2y]`; the x values must be between 0 and 1, the y values can be anything (that's how overshoot curves work).

Tokens can point to other tokens (**aliases**): `"text": { "$value": "{color.ink}" }`. Change `ink` and `text` follows.

The spec has **no spring type**, so we keep springs under `$extensions` (the spec's official place for custom data).

## Our token file

Full file: [`tokens/little-lantern.tokens.json`](https://github.com/brenotreviso/coded-motion/blob/main/tokens/little-lantern.tokens.json). Groups:

| Group | Examples | Notes |
|---|---|---|
| `color.*` | cream, ink, apricot… plus aliases text, background, accent | Hex included for humans |
| `font.*` | display, body, weights, sizes | Sizes are for a 1080-px-wide frame |
| `space.*` | 1-6 (8 → 104 px), `safe` = 120 px | Spacing scale grows roughly ×1.6 each step |
| `radius.*` | soft, round | |
| `motion.duration.*` | instant 100, quick 200, base 400, gentle 700, slow 1200, breath 3200, stagger 60 (ms) | |
| `motion.easing.*` | enter, exit, move, soft, linear | cubic-bezier arrays |
| `motion.spring` | gentle, bouncy, snappy | `$extensions`, Remotion-style config |
| `motion.video` | fps 30, reel/feed/square/wide sizes | `$extensions` |

## Using tokens in code

Run once (no install needed):

```bash
node scripts/build-tokens.mjs
```

It writes **`tokens/tokens.css`** (CSS variables) and **`tokens/tokens.js`** (a JS object).

**In HTML / CSS:**

```css
.card {
  background: var(--color-paper);
  border-radius: var(--radius-soft);
  transition: transform var(--motion-duration-base) var(--motion-easing-enter);
}
```

**In GSAP:** register the token curves once with CustomEase, then use names:

```js
gsap.registerPlugin(CustomEase);
CustomEase.create("ll-enter", "0.16,1,0.3,1");   // motion.easing.enter
gsap.to(".card", { y: 0, duration: 0.4, ease: "ll-enter" }); // 0.4 s = motion.duration.base
```

**In Remotion:**

```tsx
import { Easing, interpolate, spring } from "remotion";
const x = interpolate(frame, [0, 12], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
const s = spring({ frame, fps, config: { stiffness: 180, damping: 10, mass: 1 } }); // spring.bouncy
```

## How the big design systems treat motion (to learn from)

- **IBM Carbon** splits motion into *productive* (fast, subtle, for tasks) and *expressive* (bigger, for important moments), and says larger movements should take longer ([Carbon motion](https://carbondesignsystem.com/elements/motion/overview/)). Its checklist asks whether micro-interactions fall within a 90-120 ms duration.
- **Material Design 3** publishes motion easing and duration tokens ([M3 motion](https://m3.material.io/styles/motion/overview)).
- **Apple Human Interface Guidelines** says: "Add motion purposefully, supporting the experience without overshadowing it" and "Don't add motion for the sake of adding motion" ([Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion)).

Our *Little Lantern* tokens are slower than UI systems on purpose. Videos are watched, not clicked, so a gentle brand can afford 400-700 ms moves. Emil Kowalski's advice for **interfaces** is the opposite, "your animations should also usually be shorter than 300ms" ([great animations](https://emilkowal.ski/ui/great-animations)), and that's right for buttons and menus. **Know which one you're making.**

## Rules for tokens

1. **No raw values in scene code.** If you need a new value, add a token first.
2. **Few tokens.** 5-7 durations and 4-5 easings is plenty. More means nobody remembers them.
3. **Name by purpose, not by look:** `easing.enter`, not `easing.fastSlow`.
4. **Version the token file** with the code (git). A brand change becomes one reviewed commit.

## Exercise

Add a token `motion.duration.blink` = 120 ms, rebuild, and use it in `examples/html/07-breathing-idle.html` instead of the hard-coded numbers.

## Sources

- DTCG Format Module 2025.10 (duration, cubicBezier, aliases, $extensions): <https://www.designtokens.org/TR/2025.10/format/>
- IBM Carbon motion: <https://carbondesignsystem.com/elements/motion/overview/>
- Material Design 3 motion: <https://m3.material.io/styles/motion/overview>
- Apple HIG motion: <https://developer.apple.com/design/human-interface-guidelines/motion>
- Emil Kowalski, *Great animations*: <https://emilkowal.ski/ui/great-animations>
- GSAP CustomEase: <https://gsap.com/docs/v3/Eases/CustomEase/>
- Remotion `interpolate` and `spring`: <https://www.remotion.dev/docs/interpolate>, <https://www.remotion.dev/docs/spring>
