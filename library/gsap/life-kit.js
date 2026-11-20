/* Coded Motion library · life-kit.js (GSAP 3)
 * Reusable "make it alive" helpers. Load after gsap.min.js. Exposes window.CM.
 * Every default comes from tokens (motion.duration.*, motion.easing.*). Override per call.
 */
(function () {
  const CM = (window.CM = window.CM || {});

  /** Breathe: scale a body around its base. Returns the tween. */
  CM.breathe = function (target, { cycle = 3.2, amount = 0.035, origin = "50% 100%" } = {}) {
    gsap.set(target, { transformOrigin: origin });
    return gsap.to(target, { scaleY: 1 + amount, scaleX: 1 - amount * 0.43, duration: cycle / 2,
      ease: "sine.inOut", yoyo: true, repeat: -1 });
  };

  /** Blink at irregular intervals. Returns a function that stops blinking. */
  CM.blink = function (eyes, { close = 0.07, open = 0.12, minGap = 1.8, maxGap = 4.5 } = {}) {
    gsap.set(eyes, { transformOrigin: "50% 50%" });
    let call;
    const once = () => gsap.timeline({ onComplete: () => { call = gsap.delayedCall(gsap.utils.random(minGap, maxGap), once); } })
      .to(eyes, { scaleY: 0.1, duration: close, ease: "power2.in" })
      .to(eyes, { scaleY: 1, duration: open, ease: "power2.out" });
    call = gsap.delayedCall(gsap.utils.random(0.5, minGap), once);
    return () => call && call.kill();
  };

  /** Float: gentle up/down drift on a different rhythm from breathing. */
  CM.float = function (target, { distance = 10, cycle = 4.2 } = {}) {
    return gsap.to(target, { y: -distance, duration: cycle / 2, ease: "sine.inOut", yoyo: true, repeat: -1 });
  };

  /** Follow-through sway for a loose part (flame, ear, leaf), anchored where it attaches. */
  CM.sway = function (part, { angle = 7, cycle = 2.1, lag = 0.35, origin = "50% 100%" } = {}) {
    gsap.set(part, { transformOrigin: origin });
    return gsap.fromTo(part, { rotation: -angle }, { rotation: angle, duration: cycle / 2, ease: "sine.inOut",
      yoyo: true, repeat: -1, delay: lag });
  };

  /** Arrive: enter from below with the brand "enter" ease and a tiny settle. Needs CustomEase "ll-enter" or falls back. */
  CM.arrive = function (target, { from = 60, duration = 0.7, delay = 0 } = {}) {
    const ease = (window.CustomEase && CustomEase.get && CustomEase.get("ll-enter")) ? "ll-enter" : "expo.out";
    return gsap.from(target, { y: from, opacity: 0, duration, delay, ease });
  };

  /** All of the above for a character with a body, eyes and an optional loose part. Respects reduced motion. */
  CM.idle = function ({ root, body, eyes, loose }) {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = [];
    if (!reduce) {
      if (body) parts.push(CM.breathe(body));
      if (root) parts.push(CM.float(root));
      if (loose) parts.push(CM.sway(loose));
    }
    const stopBlink = eyes ? CM.blink(eyes) : () => {};
    return { kill() { parts.forEach((t) => t.kill()); stopBlink(); } };
  };
})();
