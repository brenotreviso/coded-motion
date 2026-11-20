# Week 2 · Easing and timing

**Goal:** make motion feel like it has weight and personality.

## Lesson

### 1. Timing = how long
The same move feels different at different speeds. Fast = light, energetic. Slow = heavy, calm. Our brand uses these **duration tokens**: quick 0.2 s, base 0.4 s, gentle 0.7 s, slow 1.2 s.

### 2. Easing = how the speed changes
Nothing in real life starts or stops instantly. **Easing** describes speed over time:
- **ease-out** (`power2.out`): starts fast, slows down → things *arriving*.
- **ease-in** (`power2.in`): starts slow, speeds up → things *leaving*.
- **ease-in-out** (`power2.inOut`): slow-fast-slow → things *moving* from A to B.
- **linear** (`none`): constant speed → only for constant spins or scrolls.

```js
gsap.to("#ball", { x: 600, duration: 0.7, ease: "power2.out" });
```
Open `examples/html/01-easing.html`: nine balls, same distance and duration, different eases. Watch which ones feel "robotic" (linear) and which feel "alive".

### 3. Bezier curves for custom easing
An easing curve can be written as 4 numbers: `cubic-bezier(0.16, 1, 0.3, 1)`. Play with them at [cubic-bezier.com](https://cubic-bezier.com/) and compare named curves at [easings.net](https://easings.net/). In GSAP use `CustomEase`:
```js
gsap.registerPlugin(CustomEase);
CustomEase.create("my-arrive", "0.16,1,0.3,1");
```

### 4. Springs and overshoot
Some motion overshoots and settles, like a spring. Try `back.out(1.7)` (small overshoot) and `elastic.out(1, 0.4)` (wobble). Use them for characters, not for text.

### 5. Stagger
Several items starting one after another:
```js
gsap.from(".word", { y: 30, opacity: 0, stagger: 0.06, ease: "power2.out" });
```

## Project · "Three balls, three personalities"

Three balls cross the screen. Make one feel **shy**, one **excited**, one **sleepy** using only duration, easing and delay. Don't change colour or size.

**Done when:** a friend can match each ball to its word without being told.

## Checklist
- [ ] I can explain ease-in, ease-out, ease-in-out and when to use each
- [ ] I made a custom curve with `CustomEase`
- [ ] I used `back.out` or `elastic.out` and know why not to use it on text
- [ ] I used `stagger`
- [ ] Nothing in my project is linear unless it's a constant spin
- [ ] Optional: read *Timing*, *Easing* and *Springs* in [chapter 4](../docs/04-motion-principles.md)
