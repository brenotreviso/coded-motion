# Cursor Agent prompts

Cursor reads `AGENTS.md` (root and subfolders) and skills from `.agents/skills/` (plus `.claude/skills/` for compatibility) ([rules](https://cursor.com/docs/context/rules), [skills](https://cursor.com/docs/context/skills)). Use `@` mentions to attach exact files and paste screenshots for visual problems ([prompting agents](https://cursor.com/docs/agent/prompting)). Use [Plan Mode](https://cursor.com/docs/agent/planning) for new videos.

## 1. New scene (Plan Mode)

```
/coded-motion
Plan a new scene for @examples/remotion-hello/src: [beat description], [N] seconds, caption "[text]".
Use parts from @library/README.md and values from @tokens/little-lantern.tokens.json only.
Show the plan; after I approve, build it, then render stills at frames [a,b,c].
```

## 2. Fix from a screenshot

```
[paste screenshot]
This is frame [N] of @src/scenes/[file].tsx. Problem: [e.g. caption overlaps the mascot; the flame doesn't move].
Fix only this, using @docs/fix-stiff-motion.md row "[row]". Render the same frame again and show it.
```

## 3. Token change across the project

```
Replace every hard-coded colour or duration in @src with the matching token from @tokens/tokens.js. List any value that has no token instead of inventing one.
```
