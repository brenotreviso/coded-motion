# Library: reusable parts

**Rule for humans and agents: look here before writing anything new.** Each part is token-driven, takes parameters, and has one line below. Add a part only after it's been used in a real piece and approved.

| Part | File | What it does | Demo |
|---|---|---|---|
| `CM.breathe(target, {cycle, amount, origin})` | `gsap/life-kit.js` | Breathing scale around the base (volume-preserving) | `examples/html/09-library-demo.html` |
| `CM.blink(eyes, {close, open, minGap, maxGap})` | `gsap/life-kit.js` | Irregular blinks; returns a stop function | 09 |
| `CM.float(target, {distance, cycle})` | `gsap/life-kit.js` | Gentle vertical drift | 09 |
| `CM.sway(part, {angle, cycle, lag, origin})` | `gsap/life-kit.js` | Follow-through sway for a loose part | 09 |
| `CM.arrive(target, {from, duration, delay})` | `gsap/life-kit.js` | Brand "enter" arrival | 09 |
| `CM.idle({root, body, eyes, loose})` | `gsap/life-kit.js` | All of the above at once; respects reduced motion; returns `{ kill() }` | 09 |
| `CM.wordReveal(el, {stagger, rise, highlightClass, wordTime})` | `gsap/text-kit.js` | Word-by-word rise + karaoke highlight; returns a timeline | 09 |
| `useBreath`, `blinkAt`, `WordReveal` | `remotion/life-kit.tsx` | Frame-driven versions for Remotion | copy into `src/` |

## How to add a part

1. Make it work inside a real project first.
2. Replace every raw value with a token or a parameter whose default *is* a token value.
3. Add one line to the table above + a demo (or a still in `previews/`).
4. If fixing it taught you something, add a rule to [`CHECKS.md`](CHECKS.md).

Ideas for next parts: paper-wipe transition, iris transition, label chip, paper-grain overlay (Canvas), night-sky background, felt-piano note (Web Audio).
