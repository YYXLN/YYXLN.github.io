import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { convertMarkdownToStyledHTML } from "./renderer.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const quotes = [
  "“Where is the life we have lost in living? Where is the wisdom we have lost in knowledge? Where is the knowledge we have lost in information?”",
  "“Perhaps you seek too much — as a result you seek so little.”"
];

function build(source, output, title, pageQuotes = quotes, options = {}) {
  const markdown = fs.readFileSync(path.join(ROOT, source), "utf8");
  const html = convertMarkdownToStyledHTML(markdown, { title, quotes: pageQuotes, ...options });
  fs.writeFileSync(path.join(ROOT, output), html);
  console.log("Built", output);
}

build("cv.md", "cv.html", "CV · Yuxin Ye", []);
build("cv.md", "concepts/linear.html", "About · Yuxin Ye", [], { rootPrefix: "../" });
for (const file of fs.readdirSync(path.join(ROOT, "concepts")).sort()) {
  if (!file.endsWith(".md")) continue;
  const title = file === "linear.md" ? "About · Yuxin Ye" : "Thoughts · Yuxin Ye";
  build(`concepts/${file}`, `concepts/${file.replace(/\.md$/, ".html")}`, title, quotes, { pageKind: file === "index.md" ? "thoughts-index" : "article" });
}
