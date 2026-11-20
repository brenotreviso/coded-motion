# 1 · Workflow end to end

> **Goal of this chapter:** know every step from "I have an idea" to "the video is posted and saved for reuse", and what you hand over at each step.

Professional motion designers and the creators now making videos with AI agents follow nearly the same path: **plan in words, check in pictures, render last.** The expensive step (a full render, or a long AI session) only happens once the cheap steps say it is right.

## The 10 steps

| # | Step | What you make | Done when… | Cost |
|---|---|---|---|---|
| 1 | **Brief** | 5 lines: topic, audience, one job for the video, format, length | You can say the video's single job in one sentence | Very low |
| 2 | **Script** | The words: voiceover or captions, max ~6 words per caption line | Read aloud, it fits the length | Very low |
| 3 | **Storyboard** | 5-7 "beats" in text: what's on screen, what moves, what's said | Each beat has one main action | Low |
| 4 | **Style frames** | 2-3 still images of key moments, using the brand tokens | They look on-brand at phone size | Low |
| 5 | **Build** | The code: one file per scene, using tokens and library parts | Every beat plays in the browser | Medium |
| 6 | **Stills review** | Screenshots of 3+ key frames | No overlaps, text readable, nothing stiff (see the [QA checklist](checklists/qa-before-render.md)) | Low |
| 7 | **Preview render** | Low-res or every-10th-frame preview | Timing feels right | Low |
| 8 | **Final render** | Full MP4 at 1080 × 1920, 30 fps | Plays muted and still makes sense | High (once) |
| 9 | **Sound & captions check** | Audio level, caption timing, safe margins | [Publish checklist](checklists/publish.md) all ticked | Low |
| 10 | **Archive** | Commit the code, save the render as `v03`, move any reusable part into `library/` | Next video can start from this one | Very low |

## Step by step, in plain words

### 1. Brief

Write it down, even for a 10-second clip:

```
Topic:    Small habits that make a home feel warm
Audience: Busy parents scrolling at night
Job:      Make them feel calmer and save the post
Format:   Vertical reel, 1080 × 1920, 30 fps, 20 s, works muted
Brand:    Little Lantern (tokens/little-lantern.tokens.json)
```

The **one job** idea comes from a creator workflow post by @lateascent on X ("the video has one job: [counter / checklist / before and after]") ([post](https://x.com/lateascent/status/2112959072743886912)). It stops videos from trying to do everything.

### 2. Script

Short lines. Every caption line ≤ 6 words is a rule taken from the same lateascent prompt ("phone-readable text, max 6 words per line"). Read it aloud with a timer: the script sets the length, not the other way round.

### 3. Storyboard (in text)

A storyboard is the comic-strip version of the video. You don't need drawings. Text works, and AI agents read text best:

```
Beat 1 (0-3 s):  Dark room. Glow (mascot) blinks awake. Caption: "Evenings can feel heavy."
Beat 2 (3-7 s):  Glow lights one candle. Warm light spreads. Caption: "Start with one small light."
...
```

Several creators ask the AI to **show the storyboard first and wait for approval** before any code: for example @woojinrad's prompt ("Show me the storyboard first, then render it to MP4") ([post](https://x.com/woojinrad/status/2106083299462455731)).

### 4. Style frames

Before animating, make 2-3 still pictures of key moments. They answer "does this look like our brand?" cheaply. In code, a style frame is just your scene paused at one moment (screenshot it).

### 5. Build

- One file (or one component) per scene.
- Colours, fonts, durations and easings **only from tokens** ([chapter 3](03-design-system.md)).
- Reuse parts from `library/` before writing new ones ([chapter 10](10-usage-and-cost.md)).
- Animate by **time or frame number**, not by "whenever the browser gets to it" (needed for video, [chapter 7](07-video-pipeline.md)).

### 6. Stills review

Export frames at the key moments (e.g. frames 60, 240, 420) and look at them at phone size. This step is in several published AI-video prompts, e.g. "before the final render, export stills at frames 60, 240 and 420 and wait for my ok" (lateascent, above) and "Render stills, score them 1-10 for hook, phone readability and motion, fix the 3 worst problems and repeat until every score is 8+" (@kaijucode, [post](https://x.com/kaijucode/status/2117604049969369485)).

### 7-8. Preview, then final render

Render cheap first: half size, or every 10th frame. On our test machine, the 4-second example `08-frame-render.html` took **about 2 s** as a 12-frame quarter-size preview versus **about 8 s** as a full 120-frame half-size render (our own measurement, 20 Nov 2026, using `scripts/render-frames.mjs`). The bigger the video, the bigger the saving.

[Open the live demo](examples/08-frame-render.html) · [View source on GitHub](https://github.com/brenotreviso/coded-motion/blob/main/examples/html/08-frame-render.html).

### 9. Sound & captions

Sound comes last because it depends on final timing. Many short-form viewers watch muted, so design so **the video makes sense without sound** (a rule in lateascent's prompt: "make it work muted").

### 10. Archive

Commit the code with a clear message, name the render with a version (`glow-intro_v03.mp4`), and copy anything reusable into `library/`. This is what makes video number 10 much faster than video number 1.

## Hand-offs between people (or agents)

| From → To | Hand over |
|---|---|
| Writer → Designer | Brief + script |
| Designer → Animator | Storyboard + style frames + tokens |
| Animator → Reviewer | 3 stills + a preview render |
| Reviewer → Animator | Precise notes: *frame number + what's wrong + what you want* |
| Anyone → Library | The reusable part, named and documented |

## Exercise

Write a brief, a 4-line script and a 5-beat text storyboard for a 15-second reel about "one small habit". Don't animate anything yet.

## Sources

- @lateascent on X, workflow post and prompt: <https://x.com/lateascent/status/2112959072743886912> (checked via X API, Nov 2026)
- @kaijucode on X, workflow prompt: <https://x.com/kaijucode/status/2117604049969369485> (checked via X API, Nov 2026)
- @woojinrad on X, storybook explainer prompt: <https://x.com/woojinrad/status/2106083299462455731> (checked via X API, Nov 2026)
- Render timings: our own measurement with `scripts/render-frames.mjs` on 20 Nov 2026; your times will differ.
