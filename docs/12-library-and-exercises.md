# 12 · Library, exercises & extras

## The starter kit in this repo

| Folder | What's inside | Use it to… |
|---|---|---|
| `tokens/` | Little Lantern tokens (DTCG JSON) + generated CSS/JS | Start a brand: copy, rename, change values |
| `library/` | `life-kit.js` (breathe, blink, float, sway, arrive, idle), `text-kit.js` (word reveal), Remotion `life-kit.tsx`, `CHECKS.md` | Make things alive without rewriting code |
| `examples/html/` | 10 small single-page demos (00-09). [Open the list](examples.md) | Learn one idea at a time |
| `examples/remotion-hello/` | Minimal Remotion video with tokens, spring, breath, blinks, word reveal | Start any video project |
| `scripts/` | `build-tokens.mjs`, `check-examples.mjs`, `render-frames.mjs` | Tokens → code, smoke-test, render HTML to MP4 |
| `prompts/` | Ready prompts for Claude, OpenAI, Gemini, Grok, Cursor | Copy, fill the brackets |
| `checklists/` | QA before render, publish, usage-saving, new-brand setup | Tick before each step |

## Starter template: how to begin a new project

```bash
# 1. copy the kit (or click "Use this template" on GitHub once the repo is public)
cp -r coded-motion my-video && cd my-video
# 2. make it yours
$EDITOR tokens/little-lantern.tokens.json   # rename + change values
node scripts/build-tokens.mjs
# 3. start from the Remotion example
cd examples/remotion-hello && npm install && npm run studio
```

## Exercises (stand-alone; the [curriculum](curriculum/README.md) orders them by week)

| # | Exercise | Practises | Done when |
|---|---|---|---|
| E1 | Change `00-hello-gsap` so the dot goes right, then down, then fades. [Open the live demo](examples/00-hello-gsap.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/00-hello-gsap.html) | Timelines | Plays in order without gaps |
| E2 | In `01-easing`, add your own CustomEase and describe its "personality" in 3 words. [Open the live demo](examples/01-easing.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/01-easing.html) | Easing | A friend can guess which ball is yours |
| E3 | Make a pendulum with the wrong anchor, then fix it | Anchor points | It swings from the top |
| E4 | Bouncing ball with squash, stretch and anticipation | Squash & stretch | Volume looks constant |
| E5 | A leaf falling on an arc (MotionPath) with `autoRotate` | Arcs | No straight lines |
| E6 | A caption of 8 words, word-by-word, with the current word highlighted | Text, stagger | Readable on a phone |
| E7 | Give any object an idle with `CM.idle()` | Life kit | It never looks frozen |
| E8 | Turn E7 into a frame-driven page and render a 12-frame contact sheet | Video pipeline | Sheet shows the motion |
| E9 | Rebuild E7 in Remotion with `useBreath` and `blinkAt` | Remotion | Stills match the HTML |
| E10 | Prompt an agent with the skeleton in chapter 8 to make a 15 s reel; review 3 stills; give 3 precise notes | Directing AI | Final render needs no rewrite |

## Glossary, cheat sheet, sources

- [Glossary](glossary.md): every term in plain words
- [Fix stiff motion](fix-stiff-motion.md): symptom → cause → fix
- [All sources](sources.md)

## Keeping this guide current

| What | How often | How |
|---|---|---|
| [Trends](09-trends.md) | Every 3 months | Re-run searches (YouTube, X, Instagram, TikTok); date every number; drop stale items |
| [Prompting / AI docs](08-prompting-ai.md), [agent file table](11-agent-instructions.md) | Every 3 months, or when a tool ships a major version | Re-read the official pages linked in each chapter |
| Library versions (GSAP, Remotion) | When upgrading | Bump versions, run `npm run check` and a Remotion still |
| All links | Every 3 months | A link checker in CI (e.g. [lychee](https://github.com/lycheeverse/lychee)) once the repo is public |
| Changes | Every edit | One line in `CHANGELOG.md` |
