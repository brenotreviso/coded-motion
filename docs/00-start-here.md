# 0 · Start here

> **In one sentence:** coded motion means making animation by *writing instructions* (code) that say where things are at every moment, instead of dragging keyframes around in an app like After Effects.

## Why code?

- **Repeatable.** Change one colour in one file and every video updates.
- **Precise.** "Move 400 pixels in 0.4 seconds with this curve" is exact. You can reuse it next week.
- **AI-friendly.** AI models can't push sliders, but they write code very well. Several creators now make whole videos by asking Claude to write the code and letting a browser render it (see [9 · Trends](09-trends.md)).
- **Free tools.** Everything in this guide uses free software. GSAP has been free for everyone since Webflow took it over ([gsap.com/pricing](https://gsap.com/pricing/)). Remotion is free for individuals and companies of up to 3 people; bigger companies need a paid licence ([remotion.dev pricing](https://www.remotion.dev/docs/license/pricing)).

## New words (you'll see these everywhere)

| Word | Plain meaning |
|---|---|
| **Frame** | One still picture. Video is many frames shown quickly. |
| **fps** (frames per second) | How many frames per second. We use **30**. |
| **Tween** | One animation of one thing from state A to state B ("in-be*tween*"). |
| **Timeline** | A list of tweens arranged in time, like a music score. |
| **Easing** | How the speed changes during a tween (slow start, fast end…). |
| **Keyframe** | A moment where you say exactly what something looks like. The computer fills in between. |
| **Token** | A named design value, like `color.apricot = #f2a65a` or `duration.base = 400ms`. |
| **Render** | Turning code into frames or a video file. |

More in the [Glossary](glossary.md).

## The tool map (what to learn, in order)

```
Learn the ideas ─────────► HTML + CSS + SVG (shapes and text)
                           │
Animate them ────────────► GSAP (tweens, timelines, easing)       ← chapters 4 & 6
                           │
Draw lots of things fast ► Canvas 2D / p5.js                      ← chapter 5
                           │
Make a video file ───────► Remotion (React → MP4)                 ← chapter 7
                           or: frame-driven HTML + headless Chrome + ffmpeg
                           │
Side paths ──────────────► Three.js (3D), Lottie & Rive (designer-made files), Motion (React UI)
```

**Why this order?** GSAP on plain HTML gives you the fastest feedback: save, refresh, see it move. Remotion adds React and a render step, so it comes after you are comfortable with timing and easing.

## How to use this guide

Read a chapter, then look at the example it talks about. You can do that in two ways.

### Option A · Click and watch

You do not need to download or install anything.

1. Open the [Examples](examples.md) page, or click **Open the live demo** in the chapter you are reading.
2. The animation opens in your **browser**: the program you already use for websites (Chrome, Safari, Firefox or Edge).
3. Watch it. Click another demo when you want a different idea.

### Option B · Change one number

Do this when you want to edit an example and see your change.

1. Open this project on GitHub: [brenotreviso/coded-motion](https://github.com/brenotreviso/coded-motion). A **repository** (people also say **repo**) is the project's folder, stored on that website.
2. Click the green **Code** button, then **Download ZIP**. A **ZIP** is one packed file that holds every file in the project.
3. **Unzip** it so your computer turns that packed file back into a normal folder. On a Mac, double-click the ZIP. On Windows, right-click it and choose **Extract All**.
4. Open the folder, then `examples`, then `html`. Each demo is one file ending in `.html`. Pick the one that matches the chapter, for example `00-hello-gsap.html`.
5. Open that file in a **plain text editor**: a program that shows the file as letters you can change, and does not add its own formatting. [VS Code](https://code.visualstudio.com/) is a free one. On a Mac, TextEdit works after you choose **Format → Make Plain Text**.
6. Find a number such as `duration: 1`. **Duration** means how many seconds that movement takes. Change `1` to `3`.
7. Save the file.
8. Open that same file in your browser (double-click it, or drag it onto a browser window). The dot should move more slowly. Change the number again, save, then **refresh** the page (reload it with the round arrow, or Command+R / Ctrl+R) to see the new speed.

Then do the exercise at the end of the chapter, or follow the [6-week curriculum](curriculum/README.md).

**For AI agents:** don't read everything. Read [`AGENTS.md`](https://github.com/brenotreviso/coded-motion/blob/main/AGENTS.md) first; it tells you which chapter to open for which job.

## What you need installed

| Tool | Why | Needed from |
|---|---|---|
| A browser (Chrome, Edge, Firefox, Safari) | Opens every HTML example | Week 1 |
| A code editor (VS Code, Cursor…) | Edit files | Week 1 |
| [Node.js](https://nodejs.org/) (LTS version) | Runs Remotion and the helper scripts | Week 5 |
| [ffmpeg](https://ffmpeg.org/) | Turns frames into MP4 (only for the HTML render path) | Week 5 |
| An AI coding agent (optional) | Claude Code, Cursor, Codex or Grok Build | Any time |

## Sources for this chapter

- GSAP pricing page: "GSAP is now 100% free for all users, thanks to Webflow's support." [gsap.com/pricing](https://gsap.com/pricing/) (checked 20 Nov 2026)
- Remotion licence and pricing: [remotion.dev/docs/license/pricing](https://www.remotion.dev/docs/license/pricing) (checked 20 Nov 2026)
