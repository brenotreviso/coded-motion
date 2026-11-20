# Week 4 · Brand tokens, text and a living character

**Goal:** make work that looks like one brand, and a character that never looks frozen.

## Lesson

### 1. Design tokens
A **design token** is a named design decision stored as data, e.g. `color.apricot = #f2a65a` or `motion.duration.gentle = 700ms`. Our made-up brand **Little Lantern** keeps all of them in `tokens/little-lantern.tokens.json`. A script turns them into CSS variables:
```bash
node scripts/build-tokens.mjs   # writes tokens/tokens.css and tokens/tokens.js
```
Use them in CSS: `background: var(--color-cream);`. In GSAP read them with `getComputedStyle(document.documentElement).getPropertyValue("--color-apricot")`. **Rule:** no raw colours or durations in scene code.

Read the [brand book](../docs/02-brand-book.md) and the [design system chapter](../docs/03-design-system.md).

### 2. Text reveals
Text should be easy to read on a phone: big, short lines, on screen long enough. GSAP's SplitText splits text into words so you can reveal them one by one:
```js
document.fonts.ready.then(() => {
  const split = SplitText.create(".caption", { type: "words", mask: "words" });
  gsap.from(split.words, { yPercent: 110, duration: 0.7, stagger: 0.06, ease: "ll-enter" });
});
```
Wait for fonts first, or the words are measured in the wrong font. See `examples/html/06-text-reveal.html`.

### 3. A breathing idle
A character that stands perfectly still looks dead. The minimum **idle**: breathe (tiny scale up and down, anchored at the base), blink at random intervals, maybe float a little. See `examples/html/07-breathing-idle.html`, then do the same with one line using the library:
```js
CM.idle({ body: "#glow", eyes: ".eye", flame: "#flame" });
```
(see `examples/html/09-library-demo.html`).

### 4. Layering and staging
Split the scene into layers: background, character, text. Move them separately (far layers less). Show **one** main thing at a time so the eye knows where to look.

## Project · "A 10-second branded title card"

Cream background, Glow (or your own simple character) idling in the centre, a 5-7 word title revealing word by word, one highlighted word in the accent colour, a gentle exit.

**Done when:** every value comes from tokens, the character never freezes, and the title is readable on your phone.

## Checklist
- [ ] I ran `build-tokens.mjs` and used `var(--…)` everywhere
- [ ] Text reveals after `document.fonts.ready`
- [ ] My character breathes and blinks the whole time
- [ ] Highlight colour has enough contrast (see the brand book's contrast table)
- [ ] One focal point at a time
- [ ] Passes the [brand check](../checklists/brand-check.md)
