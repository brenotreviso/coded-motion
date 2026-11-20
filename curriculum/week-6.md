# Week 6 · Directing an AI agent + final project

**Goal:** get an AI agent to build a branded video you'd be proud of, without wasting usage, and check its work like a director.

## Lesson

### 1. What the agent reads
This repo has an `AGENTS.md` (rules for any AI agent) and a skill at `.agents/skills/coded-motion/SKILL.md` (the step-by-step method). Cursor, Codex and Grok Build read `AGENTS.md`; Claude Code reads `CLAUDE.md`, which imports `AGENTS.md`. Details: [chapter 11](../docs/11-agent-instructions.md).

### 2. The workflow
1. **Brief** (one job, format, audience).
2. **Plan** in plan mode → storyboard → you approve.
3. **Build** scene by scene, committing after each (checkpoints).
4. **Check** with stills; give precise feedback.
5. **Render** once. Archive.
Full version: [chapter 1](../docs/01-workflow.md).

### 3. Writing the prompt
Use the skeleton in [chapter 8](../docs/08-prompting-ai.md) or a ready prompt from [prompts/](../prompts/README.md). Describe style as **materials** ("coloured pencil on cream paper"), not adjectives ("beautiful, modern").

### 4. Giving feedback
Bad: "make it better". Good: "Frames 40-70: Glow looks frozen. Add the idle from the cheat sheet. Don't change anything else." Use the [fix-stiff-motion](../docs/fix-stiff-motion.md) rows as your vocabulary.

### 5. Saving usage
Plan first, point to exact files, reuse the library, preview with stills, small model for small edits, one final render. See [chapter 10](../docs/10-usage-and-cost.md) and the [usage checklist](../checklists/usage-saving.md).

### 6. Teach the library
When you fix something twice, save it: a new function in `library/`, or one line in `library/CHECKS.md`. Next time the agent reuses it.

## Final project · "A 15-20 second reel, directed"

Pick one small idea (a tip, a feeling, a 3-step how-to). Using an AI agent and this repo:
- brief + storyboard approved before any code
- at least one character with a full idle, a word-by-word caption, one arc, one follow-through
- at least 2 rounds of still-based feedback written in the "frame + problem + fix" format
- final MP4 + `PROGRESS.md` + your prompts, handed in together

**Done when:** it passes [QA before render](../checklists/qa-before-render.md) and [publish](../checklists/publish.md), and you can point to each motion principle in it.

## Checklist
- [ ] The agent planned before coding and I approved the plan
- [ ] Every scene is a git commit
- [ ] I reviewed stills, not just the final video
- [ ] My feedback used frame numbers and named fixes
- [ ] I added one thing to `library/` or `CHECKS.md`
- [ ] Final render is versioned and archived with its prompt
