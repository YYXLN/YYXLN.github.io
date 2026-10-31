import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "cv.html", ...fs.readdirSync(path.join(root, "concepts")).filter(f => f.endsWith(".html")).map(f => `concepts/${f}`)];
const errors = [];
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes("style.css?v=6")) errors.push(`${page}: shared theme missing`);
  if (page !== "index.html" && !html.includes('aria-label="Main navigation"')) errors.push(`${page}: navigation missing`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (target.startsWith("file:")) errors.push(`${page}: filesystem URL ${target}`);
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(target)) continue;
    const pathname = decodeURIComponent(target.split(/[?#]/)[0]);
    if (!pathname) continue;
    if (pathname.endsWith(".md")) errors.push(`${page}: visitor link points to Markdown ${target}`);
    if (!fs.existsSync(path.resolve(root, path.dirname(page), pathname))) errors.push(`${page}: missing target ${target}`);
  }
}
if (errors.length) throw new Error(errors.join("\n"));
console.log(`Checked shared styling, navigation, and local links on ${pages.length} pages.`);
