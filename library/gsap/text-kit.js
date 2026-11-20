/* Coded Motion library · text-kit.js (GSAP 3 + SplitText)
 * Load after gsap.min.js and SplitText.min.js. Exposes window.CM.wordReveal.
 */
(function () {
  const CM = (window.CM = window.CM || {});
  /**
   * Word-by-word reveal + optional karaoke highlight.
   * @param {string|Element} el  caption element
   * @param {object} o  { stagger = 0.06 (token motion.duration.stagger), rise = 110 (%),
   *                      highlightClass = "on", wordTime = 0.32 (s per spoken word, 0 = no highlight) }
   * @returns {gsap.core.Timeline}
   */
  CM.wordReveal = function (el, { stagger = 0.06, rise = 110, highlightClass = "on", wordTime = 0.32 } = {}) {
    gsap.registerPlugin(SplitText);
    const split = SplitText.create(el, { type: "words", mask: "words" });
    const tl = gsap.timeline();
    tl.from(split.words, { yPercent: rise, duration: 0.6, ease: "power3.out", stagger });
    if (wordTime > 0) {
      tl.addLabel("speak", "+=0.2");
      split.words.forEach((w, i) => tl.call(() => {
        split.words.forEach((x) => x.classList.remove(highlightClass)); w.classList.add(highlightClass);
      }, null, `speak+=${i * wordTime}`));
      tl.call(() => split.words.forEach((x) => x.classList.remove(highlightClass)), null, `speak+=${split.words.length * wordTime + 0.3}`);
    }
    return tl;
  };
})();
