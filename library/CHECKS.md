# CHECKS: rules learned from mistakes

Every time something goes wrong and gets fixed, add one line here: **symptom → rule**. Agents read this file before building. (Idea credited to Sirio's "checks" file, [video](https://www.youtube.com/watch?v=mV74tDW0mc0).)

| # | Symptom | Rule |
|---|---|---|
| 1 | Puppeteer hung when rendering frames | `window.renderFrame` must return nothing. Returning the GSAP timeline makes Puppeteer try to serialise it. |
| 2 | First frames rendered in the fallback font | Load fonts before rendering: `document.fonts.ready` in HTML; `@remotion/google-fonts` `loadFont()` in Remotion. |
| 3 | Words jumped after the web font loaded | Run SplitText after `document.fonts.ready`. |
| 4 | Lantern rotated around its middle and looked fake | Set `transformOrigin` to the attachment point before rotating. |
| 5 | Character looked frozen between actions | Every character runs an idle (breathe + blink) at all times. |
| 6 | Half-size Remotion previews weren't faster for a simple scene | For quick checks render chosen frames (`--frames=a,b,c`), not a smaller full video. |
