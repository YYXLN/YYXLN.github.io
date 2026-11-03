import { marked } from "marked";

const escapeHtml = (value = "") => String(value)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const renderer = new marked.Renderer();
renderer.link = function ({ href, title, tokens }) {
  const url = href.replace(/\.md(?=[?#]|$)/i, ".html");
  return `<a href="${escapeHtml(url)}"${title ? ` title="${escapeHtml(title)}"` : ""}>${this.parser.parseInline(tokens)}</a>`;
};

export function convertMarkdownToStyledHTML(markdown, opts = {}) {
  const { title = "Yuxin Ye", quotes = [] } = opts;
  const isCV = title.startsWith("CV");
  const root = opts.rootPrefix ?? (isCV ? "./" : "../");
  const isThoughtsIndex = opts.pageKind === "thoughts-index";
  const active = isCV ? "cv" : title.startsWith("About") ? "about" : "thoughts";
  const nav = (id, label, href) => `<a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="description" content="${isCV ? "Yuxin Ye's CV: Qwen RL infrastructure, training and inference systems, and research." : "Yuxin Ye's notes on reinforcement learning, language models, and systems."}">
  <title>${escapeHtml(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${root}style.css?v=6">
</head>
<body class="reading-page">
  <a class="skip-link" href="#main">Skip to content</a>
  <header>
    <div class="brand">Yuxin Ye</div>
    <span class="tagline">A Thinking Space</span>

  </header>
  <main id="main" class="container prose">
    <nav class="page-nav" aria-label="Main navigation">
      ${nav("home", "Home", `${root}index.html`)}
      ${nav("thoughts", "Thoughts", `${root}concepts/index.html`)}
      ${nav("about", "About", `${root}cv.pdf`)}
      ${nav("cv", "CV", `${root}cv.pdf`)}
    </nav>
    ${!isThoughtsIndex && active === "thoughts" ? '<a class="back-link" href="index.html">← All thoughts</a>' : ""}
    ${isCV || active === "about" ? `<div class="cv-actions"><a href="${root}cv.pdf">Download CV (PDF) ↗</a></div>` : ""}
    ${marked.parse(markdown, { renderer })}
  </main>
  ${quotes.length ? `<aside class="quote" aria-label="Words to think with">${quotes.slice(0, 2).map(q => `<p>${escapeHtml(q)}</p>`).join("")}</aside>` : ""}
  <footer>
    <span>&copy; ${new Date().getFullYear()} Yuxin Ye</span>
    <nav aria-label="Social links">
      <a href="https://www.linkedin.com/in/yuxin-ye-9928ab183/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a href="https://github.com/YYXLN" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      <a href="mailto:yeyuxin9816@gmail.com">Email ↗</a>
    </nav>
  </footer>
</body>
</html>`.replace(/^[ \t]+$/gm, "");
}
