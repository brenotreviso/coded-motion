// Copied from tokens/little-lantern.tokens.json (run `node scripts/build-tokens.mjs` at the repo root
// to regenerate tokens/tokens.js, and keep these in sync). Agents: read colours from here, never hard-code.
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";

// Load the brand fonts so every rendered frame waits for them (no fallback-font frames).
const fraunces = loadFraunces("normal", { weights: ["600"], subsets: ["latin"] });
const nunito = loadNunito("normal", { weights: ["400", "700"], subsets: ["latin"] });

export const brand = {
  cream: "#fbf4e9",
  ink: "#3b2f2a",
  apricot: "#f2a65a",
  honey: "#f9d27d",
  sage: "#9bb59a",
  dusk: "#5e668d",
  displayFont: `${fraunces.fontFamily}, Georgia, serif`,
  bodyFont: `${nunito.fontFamily}, Arial, sans-serif`,
  safe: 120, // px margin from every edge
  spring: {
    gentle: { stiffness: 100, damping: 15, mass: 1 },
    bouncy: { stiffness: 180, damping: 10, mass: 1 },
  },
} as const;
