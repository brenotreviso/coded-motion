# 2 · Brand book: *Little Lantern* (a worked example)

> **What is a brand book?** A short rulebook that says how a brand looks, sounds and *moves*, so that anyone (a new designer, a student, an AI agent) makes things that feel like the same brand.

**Little Lantern is made up for this guide.** It is a fictional studio that makes calm, cosy short videos about small everyday comforts. Any resemblance to a real brand is accidental. Copy its structure for your own brand, not its content.

## 1. Who we are

- **One line:** Small lights for long days.
- **Personality (3 words):** warm, gentle, unhurried.
- **We are not:** loud, flashy, sarcastic, salesy.
- **Audience:** tired adults scrolling at night who want a calm minute.

## 2. Voice (how we write)

| Do | Don't |
|---|---|
| Short, kind sentences. "Start with one small light." | Hype: "This will CHANGE YOUR LIFE!!" |
| Talk to one person ("you") | Talk to "everyone", "guys" |
| One idea per caption line, max 6 words | Paragraphs on screen |
| Real facts with a source on screen if we use numbers | Invented statistics |

## 3. Colour

All colours live in [`tokens/little-lantern.tokens.json`](https://github.com/brenotreviso/coded-motion/blob/main/tokens/little-lantern.tokens.json).

| Token | Hex | Use |
|---|---|---|
| `color.cream` | `#fbf4e9` | Background (paper) |
| `color.paper` | `#f4e7d5` | Cards, second layer |
| `color.ink` | `#3b2f2a` | Text and outlines (never pure black) |
| `color.apricot` | `#f2a65a` | Main accent, mascot body, glow |
| `color.honey` | `#f9d27d` | Light, highlights |
| `color.sage` | `#9bb59a` | Plants, calm secondary accent |
| `color.dusk` | `#5e668d` | Night scenes, shadows |
| `color.rose` | `#e8a0a0` | Cheeks, tiny warm details |

**Rules:** one accent at a time per scene. Backgrounds are cream or dusk, never white or black. Text is ink on cream, or cream on dusk.

**Contrast (measured with the WCAG formula):** ink on cream 11.8:1 · ink on paper 10.6:1 · ink on apricot 6.4:1 · cream on dusk 5.1:1 · honey on dusk 3.9:1 (large text only, e.g. a highlighted caption word at 56 px+) · apricot on cream 1.9:1 (**never** for text). WCAG AA asks for at least 4.5:1 for normal text and 3:1 for large text ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).

## 4. Type

- **Display (headlines, captions):** Fraunces, weight 600. A soft serif ([Google Fonts](https://fonts.google.com/specimen/Fraunces), SIL Open Font License).
- **Body (small text, labels):** Nunito, 400 / 700. A rounded sans ([Google Fonts](https://fonts.google.com/specimen/Nunito)).
- **Sizes on a 1080-px-wide video:** caption 56 px, headline 96 px, small 36 px.
- **Safe margin:** keep text at least 120 px from every edge (our house rule; platform interfaces cover parts of the screen, so check your own app's overlays).

## 5. Shapes and imagery

- Round corners (`radius.soft = 16px`), soft blobs, paper texture.
- No photos of real people. No human skin tones on figures; characters are objects or creatures (a lantern, a cup, a cat).
- Mascot: **Glow**, a round apricot lantern-blob with two dot eyes and a small flame. No arms or legs. It is easy to animate well and hard to animate badly ([Open the live demo](examples/07-breathing-idle.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/07-breathing-idle.html)).

## 6. Motion personality (the part most brand books forget)

Our motion is **gentle and unhurried**. That becomes concrete rules:

| Rule | Token / value |
|---|---|
| Things arrive softly: fast start, long soft landing | `motion.easing.enter` = `cubic-bezier(0.16, 1, 0.3, 1)` |
| Moves across the screen ease in *and* out | `motion.easing.move` = `cubic-bezier(0.65, 0, 0.35, 1)` |
| Loops (breathing, floating) use sine-like curves | `motion.easing.soft` = `cubic-bezier(0.37, 0, 0.63, 1)` |
| Normal move takes 400 ms; scene changes 1.2 s | `motion.duration.base`, `motion.duration.slow` |
| Lists and words appear 60 ms apart | `motion.duration.stagger` |
| Small overshoot allowed (springs), never big bounces | `spring.gentle` for most, `spring.bouncy` only for the mascot |
| Characters are never fully still: breathe, blink | `motion.duration.breath` = 3.2 s per breath |
| Respect "reduce motion" settings on websites | see [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) |

**Never:** fast shakes, flashing, hard cuts every half-second, elastic bounces on text.

## 7. Sound

Soft piano or felt-piano tones, slow attack (sound fades in rather than clicking), no beeps, no end chime. One sound per visible change. Credit to the lateascent prompt pattern ("one soft UI sound per change: short sine tones, slow attack, no beeps, no end chime") ([post](https://x.com/lateascent/status/2112959072743886912)).

## 8. Formats

| Name | Size | Use |
|---|---|---|
| Reel / Short / TikTok | 1080 × 1920 (9:16) | Main format |
| Feed | 1080 × 1350 (4:5) | Feed posts |
| Square | 1080 × 1080 | Carousels |
| Wide | 1920 × 1080 | YouTube |

## Template: make your own brand book

Copy this page, keep the 8 headings, replace every value, and then update the token file to match. **A brand book without a token file drifts; a token file without a brand book has no reasons.** Keep both.

## Sources

- Fraunces and Nunito on Google Fonts: <https://fonts.google.com/specimen/Fraunces>, <https://fonts.google.com/specimen/Nunito>
- MDN, `prefers-reduced-motion`: <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>
- Easing curves named after easings.net: <https://easings.net>
- lateascent prompt: <https://x.com/lateascent/status/2112959072743886912>
