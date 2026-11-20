# Glossary

Plain-language definitions. If a word in the guide isn't here, open an issue.

| Term | Meaning |
|---|---|
| **Agent (AI coding agent)** | An AI tool that can read files, write code and run commands in a project (Claude Code, Cursor, Codex, Grok Build). |
| **AGENTS.md** | A Markdown file at the root of a repo with instructions for AI agents. Read by Cursor, Codex and Grok Build directly, and by Claude Code when there's no CLAUDE.md. |
| **Alias (token)** | A token that points to another token, e.g. `text → {color.ink}`. |
| **Anchor point** | The point an object rotates and scales around. In CSS: `transform-origin`. |
| **Anticipation** | A small move in the opposite direction before a main move. |
| **Arc** | A curved path of motion. Natural movement usually follows arcs. |
| **Bezier curve** | A curve defined by end points and control points that "pull" it. Used for paths and easing. |
| **Caching (prompt caching)** | The AI provider reuses work for a prompt that starts exactly like a recent one, so it's cheaper and faster. |
| **Canvas (2D)** | An HTML element you paint pixels on with JavaScript every frame. |
| **Checkpoint** | A saved state you can return to (a git commit, a Claude Code checkpoint). |
| **Codec** | The method used to compress video (we use H.264). |
| **Composition (Remotion)** | One video definition: a React component + size, fps and length. |
| **Contact sheet** | A grid or folder of every Nth frame, to check motion quickly. |
| **Control point** | A point that bends a bezier curve without being on it. |
| **CRF** | ffmpeg quality setting for H.264; lower = better quality, bigger file (18-20 is high quality). |
| **cubic-bezier()** | CSS way to write an easing curve with four numbers. |
| **Design system** | The shared set of decisions and parts (tokens, components, rules) that keeps a brand consistent. |
| **Design token** | A named design value stored as data, e.g. `motion.duration.base = 400ms`. |
| **DTCG** | W3C Design Tokens Community Group; publishes the token file format we use (2025.10). |
| **Duration** | How long a tween takes. |
| **Easing** | How speed changes during a tween (slow-fast-slow…). |
| **Ease-in / ease-out / ease-in-out** | Starts slow / ends slow / both. |
| **Exaggeration** | Pushing a movement further than reality so it reads clearly. |
| **ffmpeg** | Free command-line tool to convert images and audio into video (and much more). |
| **Follow-through** | Loose parts keep moving after the main body stops, then settle. |
| **fps** | Frames per second. We use 30. |
| **Frame** | One still image in an animation or video. |
| **Frame-driven** | Animation calculated from the frame number, so frame N always looks the same. Needed for video rendering. |
| **GSAP** | GreenSock Animation Platform, a JavaScript animation library; free for all users. |
| **Headless browser** | A browser running without a window, controlled by a script (used to capture frames). |
| **Idle** | The small "alive" motion a character does when not acting (breathing, blinking). |
| **Interpolate** | Calculate in-between values (Remotion's `interpolate()` maps frame numbers to values). |
| **Keyframe** | A moment where you define exactly what something looks like; the computer fills in between. |
| **Layering** | Splitting a scene into background / mid / foreground / text so each can move separately. |
| **Lottie** | A JSON animation format, usually exported from After Effects, played by small runtimes. |
| **Motion blur** | The smear of fast-moving objects; in code it must be faked or sampled. |
| **Motion path** | A path an object follows (e.g. GSAP MotionPathPlugin, CSS `offset-path`). |
| **Overlapping action** | Different parts of a character move at slightly different times. |
| **p5.js** | A beginner-friendly JavaScript library for drawing and animating on a canvas. |
| **Parallax** | Far layers move less than near layers, creating depth. |
| **Pose to pose** | Define key poses first, then fill the in-betweens (how code tweening works). |
| **Position parameter (GSAP)** | Where in a timeline a tween starts: `"-=0.2"`, `"<"`, `2`, a label… |
| **Reduced motion** | A user setting asking for less animation; detect with `prefers-reduced-motion`. |
| **Remotion** | A framework to write videos as React components and render them to MP4. |
| **Render** | Turn code into frames or a video file. |
| **Rive** | A tool + runtimes for interactive vector animation with state machines. |
| **Safe margin / safe area** | Space near the frame edges kept free of important text, because app UI covers it. |
| **Secondary action** | A smaller action supporting the main one (blinking while walking). |
| **Sequence (Remotion)** | A wrapper that starts its children at a later frame. |
| **Skill (agent skill)** | A folder with a `SKILL.md` (name + description + instructions) an agent loads when the task matches. |
| **Spacing** | How far an object moves between frames; controls the *feel* of a move. |
| **Spring** | Physics-based motion defined by stiffness, damping and mass; can overshoot and settle. |
| **Squash & stretch** | Changing shape on impact/speed while keeping volume constant. |
| **Stagger** | Starting the same animation on several items one after another. |
| **Staging** | Presenting an idea so the viewer can't miss it (one focal point). |
| **Storyboard** | The plan of a video as a series of beats or frames. |
| **Style frame** | A finished still of a key moment, used to agree on the look before animating. |
| **SVG** | Scalable Vector Graphics: shapes described as code in the page. |
| **Three.js** | A JavaScript library for 3D graphics in the browser (WebGL). |
| **Timeline** | A container that arranges tweens in time. |
| **Timing** | How long (how many frames) an action takes. |
| **transform-origin** | CSS property that sets the anchor point. |
| **Tween** | One animation of one target from one state to another. |
| **Web Audio API** | Browser API to generate and process sound in code. |
| **yoyo** | GSAP option that plays a tween forwards then backwards when repeating. |
