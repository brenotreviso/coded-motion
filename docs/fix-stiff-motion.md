# Fix stiff motion: cheat sheet

Symptom → probable cause → fix (with the GSAP/Remotion move). Start at the top; the first three rows fix most "stiff" animation.

| Symptom | Probable cause | Fix | Code |
|---|---|---|---|
| Looks robotic / mechanical | Linear easing | Ease everything: arrivals `ease-out`, moves `ease-in-out`, exits `ease-in` | `ease: "ll-enter"` / `Easing.bezier(0.16,1,0.3,1)` |
| Character looks frozen or "pasted on" | No idle | Breathe + irregular blinks + slight float at all times | `CM.idle({...})` / `useBreath`, `blinkAt` |
| Everything stops at once, like a slideshow | No overlap / follow-through | Delay loose parts 50-150 ms and let them overshoot; overlap tweens | position `"<0.08"`, `back.out(2)` |
| Rotation looks fake (spins around the middle) | Wrong anchor point | Set `transformOrigin` to the hinge / base / attachment | `transformOrigin: "50% 0%"` |
| Movement feels like a robot arm | Straight-line paths | Move on arcs: motion path or different eases on x and y | `motionPath: { path, autoRotate: true }` |
| Limbs bend awkwardly | Too many joints animated independently | Simplify the design: fewer limbs, or none; animate the body as one squashy mass | Use a blob/creature character |
| Big moves feel weightless | No anticipation | Small opposite move (5-15 %) before the main one | `tl.to(x, {y: 10, duration: 0.15}).to(x, {y: -200 …})` |
| Landings feel hard | No squash / settle | Squash on contact (scaleX↑ scaleY↓), then spring back | `elastic.out(1, 0.35)` or `spring()` |
| Everything moves at the same speed | One duration for all | Small things faster, big things slower; use the duration tokens | `quick` / `base` / `gentle` |
| Lists appear as one block | No stagger | Stagger 40-80 ms | `stagger: 0.06` |
| Busy, hard to follow | Too many things moving | Stage it: one main action at a time; dim the rest | Sequence beats; lower opacity of background |
| Fast motion strobes | No motion blur | Stretch-by-speed, trails, or sampled motion blur | example 04; `@remotion/motion-blur` |
| Loops look mechanical | Same rhythm everywhere, perfect repeats | Different cycle lengths (e.g. breath 3.2 s, float 4.2 s); random blink gaps | life-kit defaults |
| Text bounces annoyingly | Elastic/bounce on text | Text only gets `enter` easing; save bounces for the mascot | |
| Feels "AI generic" | No brand rules | Load tokens + brand book; describe materials (paper, crayon, felt) | prompt skeleton, chapter 8 |
| Choppy in the browser | Animating layout properties | Animate `transform` and `opacity` only | web.dev guidance |

**How to give the fix to an AI agent:** frame number + symptom + row from this table. Example: *"Frames 40-70: Glow looks frozen. Apply the idle from the cheat sheet (breathe + blink + float)."*

Sources: principles in [chapter 4](04-motion-principles.md) and its sources; the "stiff limbs → simpler characters" advice comes from our own November 2026 review, where the coded references that read as warm and alive mostly used silhouettes, blobs or animals.
