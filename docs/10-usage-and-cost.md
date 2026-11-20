# 10 · Usage & cost: save as you build, reuse everything

> **Goal:** spend less AI usage (tokens, credits, plan limits) and less render time per finished video, and make every new video cheaper than the last.

**Where the cost goes:** (1) the AI reading and writing (every message re-sends context), (2) re-doing work that was lost or drifted, (3) renders you throw away. The habits below attack all three.

## 1. Save as you build (checkpoints)

**New word:** a *checkpoint* is a saved state you can go back to.

- **Git commit after every approved step:** storyboard approved → commit; scene 1 works → commit. Anthropic's own prompting guide recommends this for agents: "Use git for state tracking: Git provides a log of what's been done and checkpoints that can be restored" ([Claude best practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices)).
- **Claude Code also checkpoints automatically:** "Every prompt you send that starts a turn creates a new checkpoint"; `/rewind` (or Esc twice) restores code, conversation or both; it keeps snapshots for the 100 most recent checkpoints in a session, and by default deletes them about 30 days after the session last saved one ([checkpointing docs](https://code.claude.com/docs/en/checkpointing)). Treat this as an undo button, **not** a replacement for git.
- **A progress file:** keep `PROGRESS.md` in the project ("Scene 1 ✅, scene 2 needs blink fix"). Anthropic's guide suggests progress notes and reviewing "progress.txt, tests.json, and the git logs" when starting a fresh context. A new session reads one small file instead of re-discovering everything.

## 2. Versioned files and renders

- **Never overwrite a render.** `glow-intro_full_v01.mp4`, `_v02`… Keep the brief and the git commit hash next to it (`renders/glow-intro_v02.txt`).
- **One file per scene** so a fix touches one small file (cheaper for the AI to read and rewrite).
- **Tokens in one file** so a brand change is one edit, not a hunt through 40 files.

## 3. Cheap previews before full renders

Go up the ladder only when the step below looks right:

| Step | What | Cost |
|---|---|---|
| 1 | Text storyboard | Almost free |
| 2 | 3 key stills (`remotion render … --frames=30,75,140`, or a paused HTML page) | Seconds |
| 3 | Contact sheet: every 10th frame, small size | Seconds |
| 4 | Full-length preview | Minutes |
| 5 | Final render | Once |

**What we measured** (our machine, 8 CPU cores, 20 Nov 2026; your numbers will differ):

| Render | Time |
|---|---|
| Remotion example, 3 stills at half size | 4.2 s |
| Remotion example, full 150 frames at half size | 17.5 s |
| Remotion example, full 150 frames at full 1080 × 1920 | 17.6 s |
| HTML example 08, 12-frame contact sheet at ¼ size | ~2 s |
| HTML example 08, all 120 frames at half size + MP4 | ~8 s |

Lesson: **skipping frames saved far more than lowering resolution.** For this simple scene, half-size Remotion renders were no faster. Stills are the cheapest real check.

## 4. A reusable scene / component library

This is the biggest long-term saving. The YouTube creators teaching this right now all say it (see [chapter 9](09-trends.md)): Sirio builds "templates for literally everything" and explains "Every effect that I like, I built once as a template, so I never have to explain to AI again"; Sharbel A.'s skill ships "over 260 animations".

Our structure (`library/`):

```
library/
  README.md            ← index: one line per part, with a preview GIF/PNG
  characters/glow/     ← the mascot: idle (breathe, blink), happy, sleepy
  text/                ← word-reveal, highlight-current-word, label-chip
  transitions/         ← paper-wipe, soft-fade, iris
  backgrounds/         ← paper-grain, night-sky, window
  sounds/              ← synth recipes (felt piano note, soft whoosh)
```

Rules for library parts:

1. **Token-driven**: no raw colours or durations inside.
2. **Parameterised**: `wordReveal({ text, start, stagger })`, not a copy with hard-coded words.
3. **Documented in one line** in `library/README.md` + a preview image, so an agent can choose without opening the code.
4. **Promote after use**: a part goes into the library after it has been used in a real video and approved.
5. **A "checks" file** (`library/CHECKS.md`): every mistake you fix once becomes a rule (Sirio's "every mistake turns into a rule").

## 5. Caching: keep the start of your prompt the same

AI providers give big discounts (or speed-ups) when the *beginning* of a request is identical to a recent one. That's **prompt caching**.

| Provider | What their docs say |
|---|---|
| Anthropic | `cache_control` caches prompt prefixes "to cut costs and latency", with 5-minute or 1-hour lifetimes ([prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)). Claude Code "automatically optimizes costs through prompt caching" ([costs](https://code.claude.com/docs/en/costs)). |
| OpenAI | Caching "reuses work when requests share the same prompt prefix"; cached input is "discounted up to 95%" ([prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). |
| Google Gemini | "Implicit caching is enabled by default for all Gemini 2.5 and newer models" ([context caching](https://ai.google.dev/gemini-api/docs/caching)). |
| xAI | "Place system prompts, few-shot examples, and reference documents at the beginning where they form a stable prefix" and only append messages: "Any edit, removal, or reorder breaks the cache" ([best practices](https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices)). |

**What that means for you:** keep `AGENTS.md`, tokens and the brand book stable and at the start; put the changing request at the end; don't keep editing your instruction files mid-project.

## 6. Pick the right model (and effort) for the job

- Claude Code's cost docs: "Sonnet handles most coding tasks well and costs less than Opus. Reserve Opus for complex architectural decisions or multi-step reasoning", and for simple subagent tasks "specify `model: haiku`" ([costs](https://code.claude.com/docs/en/costs)).
- You can also lower the **effort** level (`/effort`) for simpler tasks (same page).
- Our rule of thumb: **strongest model for the first build of a new scene type and for hard bugs; a cheaper/faster model for edits, renames, token swaps and small timing fixes.**

## 7. Keep the conversation small

From the same Claude Code docs: "Use `/clear` to start fresh when switching to unrelated work. Stale context wastes tokens on every subsequent message", and use `/compact` with instructions on what to keep. Check usage with `/usage`.

Practical habits:

- One scene per session (or per subagent).
- Point at files (`@scenes/02-candle.tsx`) instead of pasting them.
- Paste a screenshot of the bad frame rather than describing it in 200 words.

## 8. Precise feedback

Vague feedback causes full rewrites; precise feedback causes one-line fixes.

| ❌ Expensive | ✅ Cheap |
|---|---|
| "Make it better" | "Frame 120: the arm snaps. Add 4 frames of ease-out and follow-through on the hand." |
| "It feels stiff" | "Glow doesn't breathe between frames 0-60. Add the library idle." |
| "Change the colours" | "Use `color.dusk` for the background in scene 3." |

@Ravenlabap on X made the same point: the fix was "naming exactly what looked cheap instead of asking it to 'make it better'" ([post](https://x.com/Ravenlabap/status/2121275733846667372)).

## Checklist

See [`checklists/usage-saving.md`](checklists/usage-saving.md).

## Sources

- Claude prompting best practices (git for state, progress notes): <https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices>
- Claude Code checkpointing: <https://code.claude.com/docs/en/checkpointing> · costs: <https://code.claude.com/docs/en/costs>
- Anthropic prompt caching: <https://docs.claude.com/en/docs/build-with-claude/prompt-caching>
- OpenAI prompt caching: <https://developers.openai.com/api/docs/guides/prompt-caching>
- Gemini caching: <https://ai.google.dev/gemini-api/docs/caching>
- xAI prompt caching best practices: <https://docs.x.ai/developers/advanced-api-usage/prompt-caching/best-practices>
- Sirio and Sharbel A. videos: see [chapter 9](09-trends.md)
- Render timings: our measurements, 20 Nov 2026
