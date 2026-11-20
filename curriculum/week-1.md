# Week 1 · Your first animation

**Goal:** make something move on a web page with code, and understand every line.

## Lesson

### 1. One file, three languages
A web page is an **HTML** file. Inside it:
- **HTML** says *what* is on the page (a heading, a circle).
- **CSS** says *how it looks* (colour, size, position).
- **JavaScript** says *what happens* (movement).

### 2. Drawing with SVG
**SVG** draws shapes with code. They stay sharp at any size.

```html
<svg width="400" height="400" viewBox="0 0 400 400">
  <circle id="dot" cx="80" cy="200" r="40" fill="#f2a65a" />
</svg>
```
`cx`/`cy` = centre position, `r` = radius, `fill` = colour.

### 3. Your first tween with GSAP
A **tween** moves one thing from one state to another. GSAP is a free animation library ([gsap.com](https://gsap.com/)). Load it, then tween:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js"></script>
<script>
  gsap.to("#dot", { x: 240, duration: 1 });
</script>
```
Read it as: "GSAP, animate `#dot` **to** 240 pixels right, taking 1 second."

- `gsap.to()` animates *to* values; `gsap.from()` animates *from* values to where it already is.
- `duration` is in **seconds**.

### 4. A timeline: several steps in order
```js
const tl = gsap.timeline();
tl.to("#dot", { x: 240, duration: 1 })
  .to("#dot", { y: -100, duration: 0.5 })
  .to("#dot", { opacity: 0, duration: 0.5 });
```
Each step starts when the previous one ends. Add `"-=0.2"` after the options to start a step 0.2 s early (overlap).

### 5. See the reference
Open `examples/html/00-hello-gsap.html` in Chrome. Right-click → **Inspect** → **Console**: no red errors means it's working. Change one number, save, refresh. Repeat until you can predict what changes.

## Project · "A dot that says hello"

Make one HTML file where:
1. A cream background (`#fbf4e9`) and an apricot dot appear.
2. The dot moves right, then jumps up and comes back down, then grows a little.
3. The word "hello" fades in under it.

**Done when:** it plays in order, has no console errors, and you can explain every line to someone else.

## Checklist
- [ ] I can say what HTML, CSS and JavaScript each do
- [ ] I drew a shape with SVG and changed its colour and size
- [ ] I used `gsap.to`, `gsap.from` and a `gsap.timeline()`
- [ ] I overlapped two steps with `"-=0.2"`
- [ ] My file opens with no red errors in the console
- [ ] Optional: I read [chapter 0](../docs/00-start-here.md) and the GSAP part of [chapter 6](../docs/06-animation-libraries.md)
