// Renders a frame-driven HTML page (one that defines window.renderFrame(n) and window.TOTAL_FRAMES)
// to numbered PNGs, then (optionally) to MP4 with ffmpeg.
// Usage:
//   node scripts/render-frames.mjs <page.html> <outDir> [--every=N] [--scale=0.5] [--mp4]
//   --every=10   cheap preview: only every 10th frame (a "contact sheet")
//   --scale=0.5  cheap preview: half resolution
//   --mp4        after frames, run ffmpeg to make <outDir>.mp4 (needs ffmpeg on PATH)
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const [page_, outDir, ...flags] = process.argv.slice(2);
if (!page_ || !outDir) { console.error("usage: node scripts/render-frames.mjs <page.html> <outDir> [--every=N] [--scale=S] [--mp4]"); process.exit(1); }
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const every = Number(opt.every || 1), scale = Number(opt.scale || 1);
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"], protocolTimeout: 60000 });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: scale });
await page.goto(pathToFileURL(resolve(page_)).href + "?render=1", { waitUntil: "networkidle0" });
await page.evaluate(async () => { await document.fonts.ready; return true; });
const total = await page.evaluate(() => window.TOTAL_FRAMES);
let i = 0;
for (let n = 0; n < total; n += every) {
  await page.evaluate((f) => { window.renderFrame(f); }, n);
  await page.screenshot({ path: `${outDir}/frame-${String(i++).padStart(5, "0")}.png` });
}
await browser.close();
console.log(`Rendered ${i} of ${total} frames to ${outDir}`);
if (opt.mp4) {
  const fps = Math.round(30 / every);
  execFileSync("ffmpeg", ["-y", "-v", "error", "-framerate", String(fps), "-i", `${outDir}/frame-%05d.png`,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", `${outDir}.mp4`], { stdio: "inherit" });
  console.log(`Wrote ${outDir}.mp4`);
}
