// Coded Motion library · Remotion life kit (frame-driven, deterministic).
// Copy into your Remotion project's src/ folder. Values default to Little Lantern tokens.
import { Easing, interpolate } from "remotion";

/** Breathing scale for a body anchored at its base. Use with transformOrigin: "50% 100%". */
export const useBreath = (frame: number, fps: number, cycleSeconds = 3.2, amount = 0.035) => {
  const s = Math.sin((frame / fps) * ((2 * Math.PI) / cycleSeconds));
  return { scaleX: 1 - amount * 0.43 * s, scaleY: 1 + amount * s };
};

/** True while the eyes should be closed. Pass irregular start frames, e.g. [70, 118, 190]. */
export const blinkAt = (frame: number, starts: number[], closedFrames = 3) =>
  starts.some((f) => frame >= f && frame < f + closedFrames);

/** 0→1 progress for word i of a word-by-word reveal (token easing "enter"). */
export const wordProgress = (frame: number, i: number, staggerFrames = 4, lengthFrames = 12) =>
  interpolate(frame, [i * staggerFrames, i * staggerFrames + lengthFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
