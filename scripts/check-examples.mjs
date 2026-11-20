// Opens every examples/html/*.html in headless Chrome, waits 2.5 s, and reports
// console errors, page errors and failed requests. Saves a screenshot per example to out/checks/.
// Needs: npm install, and Chrome/Chromium. Set CHROME_PATH if it isn't /usr/bin/google-chrome.
import puppeteer from "puppeteer-core";
import { readdirSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dir = resolve("examples/html");
const files = readdirSync(dir).filter((f) => f.endsWith(".html")).sort();
mkdirSync("out/checks", { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--allow-file-access-from-files"],
});
let failed = 0;
for (const f of files) {
  const page = await browser.newPage();
  await page.setViewport({ width: 960, height: 900 });
  const problems = [];
  page.on("console", (m) => m.type() === "error" && problems.push("console: " + m.text()));
  page.on("pageerror", (e) => problems.push("pageerror: " + e.message));
  page.on("requestfailed", (r) => problems.push("requestfailed: " + r.url()));
  await page.goto(pathToFileURL(resolve(dir, f)).href, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2500));
  const gsapOk = await page.evaluate(() => typeof window.gsap === "object");
  if (!gsapOk) problems.push("gsap did not load");
  await page.screenshot({ path: `out/checks/${f.replace(".html", ".png")}` });
  console.log(`${problems.length ? "FAIL" : "OK  "} ${f}${problems.length ? "\n   " + problems.join("\n   ") : ""}`);
  failed += problems.length ? 1 : 0;
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
