// A 5-second vertical intro: Glow (a made-up mascot) springs in, breathes, and a caption appears word by word.
// Remotion rule: everything is calculated from the frame number. No CSS transitions, no setTimeout.
import { AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "./brand";

const Glow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Enter with a spring (physics-based: overshoots a little, then settles).
  const enter = spring({ frame, fps, config: brand.spring.bouncy });
  const y = interpolate(enter, [0, 1], [700, 0]);

  // 2. Breathe: a slow sine wave. 3.2 s per full breath (tokens: motion.duration.breath).
  const breath = Math.sin((frame / fps) * ((2 * Math.PI) / 3.2));
  const scaleY = 1 + 0.035 * breath;
  const scaleX = 1 - 0.015 * breath; // wider when shorter: volume feels constant

  // 3. Blink: eyes close for 3 frames at frame 70 and 118 (irregular on purpose).
  const blinking = [70, 118].some((f) => frame >= f && frame < f + 3);

  return (
    <div style={{ position: "absolute", left: 340, top: 520, width: 400, height: 400, transform: `translateY(${y}px)` }}>
      <div
        style={{
          width: 400, height: 400, borderRadius: "50% 50% 46% 46%", background: brand.apricot,
          boxShadow: `0 0 160px ${brand.honey}`,
          transform: `scale(${scaleX}, ${scaleY})`, transformOrigin: "50% 100%", // anchor at the base
        }}
      >
        {[130, 250].map((left) => (
          <div key={left} style={{
            position: "absolute", left, top: 150, width: 26, height: blinking ? 4 : 38,
            borderRadius: 20, background: brand.ink,
          }} />
        ))}
      </div>
    </div>
  );
};

const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame(); // inside a <Sequence>, frame 0 = when the sequence starts
  const words = text.split(" ");
  return (
    <div style={{
      position: "absolute", left: brand.safe, right: brand.safe, top: 1150, textAlign: "center",
      fontFamily: brand.displayFont, fontWeight: 600, fontSize: 96, lineHeight: 1.15, color: brand.ink,
    }}>
      {words.map((w, i) => {
        const start = i * 4; // 4 frames apart ~ 133 ms stagger
        const progress = interpolate(frame, [start, start + 12], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1), // tokens: motion.easing.enter
        });
        return (
          <span key={i} style={{ display: "inline-block", marginRight: 24, opacity: progress,
            transform: `translateY(${(1 - progress) * 40}px)` }}>{w}</span>
        );
      })}
    </div>
  );
};

export const GlowIntro: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: brand.cream }}>
    <Glow />
    <Sequence from={40}>
      <Caption text="Small lights make warm rooms." />
    </Sequence>
  </AbsoluteFill>
);
