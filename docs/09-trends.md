# 9 · Trends now (November 2026)

> **Snapshot date: 20 November 2026.** Trends move fast. Every number below says where it came from and when. Re-check before you teach from it. This chapter is refreshed quarterly (see [chapter 12](12-library-and-exercises.md#keeping-this-guide-current)).

## 1. The big shift: "AI-written code" videos

Through autumn 2026, a wave of short videos on X, Instagram, TikTok and YouTube were made **without any image or video generator**: an AI coding agent (most often Claude Opus 5.5 in Claude Code, by the creators' own accounts) wrote HTML/Canvas/SVG/Three.js or Remotion code, and a browser rendered it frame by frame.

Evidence you can open:

- **A public prompt collection**: [*awesome-opus5-5-videos*](https://github.com/yihui-dev/awesome-opus5-5-videos) lists 703 videos with their prompts and original posts (16,023 GitHub stars on 20 Nov 2026, via the GitHub API). We counted the tech tags in its data file on 20 Nov 2026: `canvas` 267, `svg` 183, `threejs` 131, `shader` 92, `gsap` 86, `css` 57, `audio` 39. Categories: motion 369, 3D 117, explainer 116, interactive 101. (Our count; videos can have several tags.)
- **Agent tooling for video**: Remotion's official Agent Skills ([docs](https://www.remotion.dev/docs/ai/skills), [repo](https://github.com/remotion-dev/skills)); HeyGen's open-source **HyperFrames** (87,404 GitHub stars, Apache-2.0, 20 Nov 2026) ([repo](https://github.com/heygen-com/hyperframes)); **Lemo-Opuscar**, "99 film styles for your coding agent" (19,041 stars) ([repo](https://github.com/lemomo-ai/lemo-opuscar)).
- **Tutorial demand on YouTube** (views read via TubeAlfred / YouTube on 19-20 Nov 2026; "published" is YouTube's relative date on that day):

| Video | Channel | Views | Published |
|---|---|---|---|
| [How to Make Viral Animated Shorts Using Claude (Full Workflow)](https://www.youtube.com/watch?v=OtbLL6OBNE4) | Mr omi | ~1.24 M | n/a |
| [I Made VIRAL Animation Videos Using Claude Code (FREE Plugin)](https://www.youtube.com/watch?v=3tpaWHaiLQ8) | Grow With Kaz | 505,307 | 2 weeks ago |
| [Claude Opus 5.5: How To Make Motion Graphics](https://www.youtube.com/watch?v=cDb-wPq0Iyk) | Rourke | ~407 K | n/a |
| [How to Make Motion Graphics With Claude AI for FREE](https://www.youtube.com/watch?v=u_J77nEB15M) | Nafay 3D | 189,418 | 3 weeks ago |
| [Create Motion Graphics with Claude Code + Remotion](https://www.youtube.com/watch?v=MAhkbZHcbLA) | Zinho Automates | 131,458 | 9 months ago |
| [How to Create Viral Animated Videos with Claude Code in 66 Different Styles](https://www.youtube.com/watch?v=wRQjaZg6RKk) | Nick Automates | ~126 K | n/a |
| [How to Make YouTube Explainer Videos With Claude (Not Higgsfield)](https://www.youtube.com/watch?v=mV74tDW0mc0) | Sirio | 98,903 | 3 weeks ago |
| [I Built The Ultimate Claude Motion Graphics Skill (Steal This)](https://www.youtube.com/watch?v=9UmUhSPJe0I) | Sharbel A. | 47,884 | 5 days ago |

## 2. The format that keeps winning

From the reference reels and X videos we decoded in November 2026 (11 examples sent by Breno, plus ~25 code-made references):

- **Vertical 9:16** (sometimes 4:5; 16:9 for long X/YouTube pieces).
- **One idea, told as a tiny story**, often a question ("Why did GTA 6 take 13 years?", "What makes a place feel like home?").
- **Text-led**: voiceover plus **word-by-word captions with the current word highlighted**, or label chips/cards.
- **Simple stylised scenes** that change with every sentence: low-poly 3D, flat cartoon, line art, paper and pencil textures.
- **Made to batch**: a template + a new script = a new video.

⚠ Of those 11 reference examples, only one explicitly said Claude was involved, one was explicitly hand-made, and the rest didn't state their method. **The look is easy to copy with code; that doesn't mean every video with that look was coded.**

## 3. Styles getting traction (all code-only, with links)

| Style | Example (creator's stated method) | Why it works |
|---|---|---|
| Paper cut-out / shadow theatre | [@x4b47x, "What makes a place feel like home?"](https://x.com/x4b47x/status/2103019799614034026): "pure javascript animation… paper cut-out shadow theatre style with gentle, fitting audio (made in code)" | Silhouettes hide stiff drawing; warm and emotional |
| Crayon / coloured pencil storybook | [@0xCodez, cat playing piano](https://x.com/0xCodez/status/2104257855142474136); [@woojinrad, storybook explainer](https://x.com/woojinrad/status/2106083299462455731): "drawn entirely in JavaScript on an HTML canvas… No image generator" | Hand-made texture without hand-drawing |
| Cosy scenes, no people | [@itsolelehmann, four seasons from a train window](https://x.com/itsolelehmann/status/2103124033365762215): "100% Claude Code with no other AI tools… or reference images"; [@blitast_studio, CatWalk](https://x.com/blitast_studio/status/2104003920251257328) | Calm loops; no character risk |
| Soft squishy characters | [@JakubAntowski, felt beret blob](https://x.com/JakubAntowski/status/2105245285916020905); [@angie_carel, Jiggle Buddies](https://x.com/angie_carel/status/2103876982819954689) | Breathing + squash fixes "stiff" |
| Hand-drawn story | [@N01ennn, a little agent at its desk](https://x.com/N01ennn/status/2108520767092597182) (121,923 views per X API, Nov 2026) | Story + texture |
| Kinetic typography | [@Gdgtify, BUILD THE FLOOR](https://x.com/Gdgtify/status/2103458245213929495); [@adrianduta96, "make it catchy"](https://x.com/adrianduta96/status/2109187815195992248) | Works muted; pure type |
| Explainer with 2D characters in a 3D world | [Mr omi's walkthrough](https://www.youtube.com/watch?v=OtbLL6OBNE4) | Matches the viral "Why did X happen?" format |

## 4. What the experts are teaching right now

**AI-video creators (YouTube, Nov 2026)**, summarised from the video transcripts:

- **Sharbel A.** ([video](https://www.youtube.com/watch?v=9UmUhSPJe0I)): the model writing code is only part of the job: "The other 90% though is the setup around it, aka the rules, the brand, the sound, and the checking." His skill captures the brand once ("it saves all of it so that next time… it already knows your brand"), keeps a library ("over 260 animations"), and has the agent score itself on "The hook, the brand, the motion, how easy it is to read, the pacing, and the polish." It can also render overlays "with a see-through background".
- **Sirio** ([video](https://www.youtube.com/watch?v=mV74tDW0mc0)): the animation "is just a web page, just an HTML… the part that makes it good is actually the instructions behind it, so the skill." Build a **template library** ("almost 300 boards, and over 200 of them are templates") and a **checks file** where "every mistake turns into a rule". His stack: "all HTML plus a free animation library called GSAP."
- **Zinho Automates** ([video](https://www.youtube.com/watch?v=MAhkbZHcbLA)): Remotion + Claude Code from scratch: install the Remotion skill, prompt, render. "Claude writes all of the Remotion code behind the scenes."
- **Mr omi** ([video](https://www.youtube.com/watch?v=OtbLL6OBNE4)): study a reference channel's shorts, then have Claude build 2D characters in a 3D world in code, frame by frame (per the video's transcript).

**Animation fundamentals (still the base of everything):**

- **Alex Grigg**, *Animation Basics in 14 Minutes* ([video](https://www.youtube.com/watch?v=pF--YKCCUMw)): timing vs spacing (see [chapter 4](04-motion-principles.md)).
- **Alan Becker**, *12 Principles of Animation* ([series](https://www.youtube.com/watch?v=uDqjIdI4bF4)).

**Web motion articles:**

- Emil Kowalski, *Great animations* ([article](https://emilkowal.ski/ui/great-animations)): springs, speed, interruptibility, performance, reduced motion. Also his course [animations.dev](https://animations.dev).
- Josh W. Comeau: [spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/), [CSS transitions](https://www.joshwcomeau.com/animation/css-transitions/), [keyframe animations](https://www.joshwcomeau.com/animation/keyframe-animations/), [SVG paths](https://www.joshwcomeau.com/svg/interactive-guide-to-paths/).

**Channels worth following** (all checked to exist on 20 Nov 2026): [The Coding Train](https://www.youtube.com/@TheCodingTrain) (creative coding, p5.js), [Kevin Powell](https://www.youtube.com/@KevinPowell) (CSS), [Hyperplexed](https://www.youtube.com/@Hyperplexed) (web effects), [Fireship](https://www.youtube.com/@Fireship) (fast overviews), [GSAP](https://www.youtube.com/@GreenSockLearning), [Remotion](https://www.youtube.com/@remotion_dev), [Rive](https://www.youtube.com/@Rive_app), [Chris Courses](https://www.youtube.com/@ChrisCourses) (canvas/game), [Bruno Simon](https://www.youtube.com/@BrunoSimon) (Three.js; course: [Three.js Journey](https://threejs-journey.com)), [School of Motion](https://www.youtube.com/@SchoolofMotion) (motion design craft; [blog](https://www.schoolofmotion.com/blog)).

## 5. How to read trend claims (hype filter)

- **Prefer posts that share the prompt or code.** "Made in 2 minutes" claims are usually unverifiable.
- **Check the method.** Some "Claude-made" videos used image generators for backgrounds or storyboards. In our November research we excluded examples where the creator said they started from AI images.
- **Views ≠ results for you.** A tutorial with 1 M views tells you interest is high, not that the technique fits your brand.
- **Date everything.** A trend table without dates is useless three months later.

## Sources

- awesome-opus5-5-videos: <https://github.com/yihui-dev/awesome-opus5-5-videos> (data file read 20 Nov 2026; GitHub API stars)
- HyperFrames: <https://github.com/heygen-com/hyperframes> · Lemo-Opuscar: <https://github.com/lemomo-ai/lemo-opuscar> · Remotion skills: <https://github.com/remotion-dev/skills>, <https://www.remotion.dev/docs/ai/skills>
- YouTube videos listed above (titles and channels confirmed via YouTube oEmbed on 20 Nov 2026; views via TubeAlfred search on 19-20 Nov 2026)
- X posts (existence and view counts via the X API, Nov 2026): @x4b47x 2103019799614034026 · @0xCodez 2104257855142474136 · @woojinrad 2106083299462455731 · @itsolelehmann 2103124033365762215 · @blitast_studio 2104003920251257328 · @JakubAntowski 2105245285916020905 · @angie_carel 2103876982819954689 · @N01ennn 2108520767092597182 · @Gdgtify 2103458245213929495 · @adrianduta96 2109187815195992248 · @lateascent 2112959072743886912 · @kaijucode 2117604049969369485 · @Ravenlabap 2121275733846667372 · @zacxbt 2103808699466944604 (pixel wizard prompt)
- Emil Kowalski: <https://emilkowal.ski/ui/great-animations>, <https://animations.dev> · Josh W. Comeau articles (links above)
