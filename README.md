# The Coded Motion Guide

Make warm, alive motion graphics with code (HTML + GSAP, Remotion) and direct AI agents to do it well, without wasting usage.

Written for **beginners**: every term is defined ([glossary](docs/glossary.md)), every step is small, and every external claim links to a source checked on 20 Nov 2026 ([sources](docs/sources.md)).

## Start here

| If you want to… | Go to |
|---|---|
| Learn step by step | [6-week curriculum](curriculum/README.md) |
| Read the guide | [docs/index.md](docs/index.md) (also builds as a website, see below) |
| Make a video with an AI agent | [AGENTS.md](AGENTS.md) + [prompts/](prompts/README.md) |
| Fix animation that looks stiff | [Fix-stiff-motion cheat sheet](docs/fix-stiff-motion.md) |
| See working code | [examples/](examples/html) |

## What's inside

```
coded-motion/
├── README.md · AGENTS.md · CLAUDE.md · CHANGELOG.md · LICENSE (CC BY 4.0) · LICENSE-CODE (MIT)
├── docs/                 13 chapters (00-12) + fix-stiff-motion, glossary, sources
├── curriculum/           README + week-1 … week-6 (lesson, project, checklist)
├── prompts/              Claude, OpenAI, Gemini, Grok, Cursor + shared snippets
├── checklists/           new project, brand, QA before render, publish, usage-saving
├── tokens/               Little Lantern design tokens (DTCG JSON) → tokens.css / tokens.js
├── library/              reusable parts: gsap/life-kit.js, gsap/text-kit.js, remotion/life-kit.tsx, CHECKS.md
├── examples/html/        00-09 single-file GSAP demos (open in Chrome)
├── examples/remotion-hello/  minimal Remotion video
├── templates/            brief.md, PROGRESS.md
├── scripts/              build-tokens, check-examples, render-frames
├── .agents/skills/coded-motion/SKILL.md   (symlinked into .claude/skills and .grok/skills)
└── mkdocs.yml            docs website (Material for MkDocs)
```

## Run it

Needs [Node.js](https://nodejs.org/) and Google Chrome.

```bash
npm install                       # puppeteer-core for the scripts
npm run tokens                    # tokens JSON → tokens/tokens.css + tokens/tokens.js
npm run check                     # open every HTML example in headless Chrome; fail on console errors
npm run render -- examples/html/08-frame-render.html out/frames --scale=0.5 --mp4   # HTML → MP4
```
If Chrome isn't at `/usr/bin/google-chrome`, set `CHROME_PATH`.

Remotion example: see [examples/remotion-hello/README.md](examples/remotion-hello/README.md).

Docs website:
```bash
pip install mkdocs-material
mkdocs serve        # http://127.0.0.1:8000
```

## Notes

- **Windows + symlinks:** the skill lives in `.agents/skills/coded-motion/` and is symlinked into `.claude/skills/` and `.grok/skills/`; the docs website links `docs/curriculum`, `docs/prompts`, `docs/checklists` the same way. On Windows, enable symlinks before cloning (`git config --global core.symlinks true` plus Developer Mode), or copy the folders.
- **Third-party licences:** GSAP is free under its own [Standard "no charge" license](https://gsap.com/community/standard-license/) (not MIT). Remotion is free for individuals and companies of up to 3 people; larger companies need a [company licence](https://www.remotion.dev/docs/license). Fonts (Fraunces, Nunito) are under the SIL Open Font License.
- **Little Lantern** and its mascot **Glow** are made up for teaching.

## Licence

- Text, images and docs: [Creative Commons Attribution 4.0](LICENSE) (CC BY 4.0).
- Code (examples, library, scripts, tokens): [MIT](LICENSE-CODE).

© 2026 Breno Bergamin (Breno Treviso)
