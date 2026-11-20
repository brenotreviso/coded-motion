# Gemini prompts

Follows Google's Gemini 3 core principles: be precise and direct; use one consistent structure (XML-style tags or Markdown); put critical constraints at the start; with long context, "supply all the context first" and put the instructions "at the very end" ([prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)).

## 1. New video (long-context layout: context first, task last)

```xml
<role>Motion designer writing frame-driven animation code. Precise, brief answers.</role>
<constraints>
Only token values from the brand file. No image or video generators. Never invent facts.
Every animation driven by the frame number. Output code files, not explanations.
</constraints>

<context>
[paste tokens/little-lantern.tokens.json]
[paste docs/02-brand-book.md sections 3-6]
[paste library/README.md]
</context>

Based on the information above:
<task>
Write a single self-contained HTML file using GSAP 3 (CDN) that is frame-driven for rendering:
[paste HTML TECH block]
Format: [20] s, 1080x1920, 30 fps. Topic: [idea]. One job: [job]. Captions: [script].
Style: [STYLE line]. Character life: [LIFE block].
First reply with only the 5-7 beat storyboard. After I approve, reply with the full file.
</task>
```

## 2. Reviewing stills (multimodal)

```xml
<task>
Attached: 3 stills (frames 30, 75, 140) of a 1080x1920 video, and the brand tokens above.
For each still give: brand/warmth 1-10, phone readability 1-10, problems with exact positions.
Then list the 3 most important fixes as code-level instructions.
</task>
```
