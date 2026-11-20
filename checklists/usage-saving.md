# Usage-saving checklist (every AI session)

Details and sources: [chapter 10](../docs/10-usage-and-cost.md).

- [ ] Plan first (plan mode); approve before code is written
- [ ] Point the agent to exact files (`@file`) instead of "look around"
- [ ] Reuse `library/` parts; ask the agent to check it before writing new code
- [ ] Commit after every scene (checkpoint) so mistakes cost one scene, not the project
- [ ] Check with stills / contact sheets, not full renders
- [ ] Feedback is precise: frame number + problem + wanted result + one fix
- [ ] Smaller/cheaper model for simple edits; strongest model for planning and hard bugs
- [ ] Stable prompt prefix (system prompt + brand files first, unchanged) to benefit from caching
- [ ] Start a fresh session (`/clear`) for a new task; compact long ones
- [ ] Final render once; versioned file name
