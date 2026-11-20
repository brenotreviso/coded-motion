# Brand check

- [ ] Every colour, font, size, space, duration, easing and spring is a token (no raw values in scene code)
- [ ] Text/background colour pairs have enough contrast (WCAG AA: 4.5:1 for normal text, 3:1 for large text — [W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html))
- [ ] Motion personality written in 3 words (e.g. "warm, unhurried, kind") and matches the easing/duration tokens
- [ ] Mascot rules: idle always on, what it never does (e.g. no sharp jumps)
- [ ] Fonts are licensed for video use (Fraunces and Nunito: [SIL Open Font License](https://github.com/google/fonts/blob/main/ofl/fraunces/OFL.txt))
- [ ] Tokens file validates as DTCG JSON; `tokens.css` / `tokens.js` regenerated
