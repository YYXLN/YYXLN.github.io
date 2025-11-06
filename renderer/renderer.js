// renderer/renderer.js

/**
 * Convert Markdown to a full HTML page using the shared /style.css theme.
 *
 * Usage (Node):
 *   import { marked } from "marked";
 *   import { convertMarkdownToStyledHTML } from "./renderer/renderer.js";
 *   global.marked = marked; // expose to function
 *   const html = convertMarkdownToStyledHTML("# Hello", {
 *     title: "Ashley Ye",
 *     quotes: [
 *       "“Where is the life we have lost in living? Where is the wisdom we have lost in knowledge? Where is the knowledge we have lost in information?”",
 *       "“Perhaps you seek too much — as a result you seek so little.”"
 *     ],
 *     shimmerTitle: true
 *   });
 *
 * Options:
 *   - title: string (default "Ashley Ye")
 *   - quotes: string[] up to 2 lines; second line fades via .q2 (CSS handles delay)
 *   - shimmerTitle: boolean (default true) adds .shimmer class to H1
 *   - cssHref: string (default "/style.css?v=1") path to shared stylesheet
 */

export function convertMarkdownToStyledHTML(markdown, opts = {}) {
    const {
      title = "Ashley Ye",
      quotes = [],
      shimmerTitle = true,
      cssHref = "../style.css?v=1"
    } = opts;
  
    // Prefer marked if present; fall back to minimal paragraph conversion
    const mdToHtml = (text) => {
      if (typeof marked !== "undefined" && marked?.parse) {
        return marked.parse(text);
      }
      // Minimal fallback: paragraph-ize by blank lines; keep single line breaks
      return text
        .split(/\n{2,}/)
        .map(p => `<p>${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
        .join("\n");
    };
  
    const quotesHTML = renderQuotes(quotes);
    const shimmerClass = shimmerTitle ? "shimmer" : "";
  
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${escapeAttr(cssHref)}">
  </head>
  <body>
    <header>
      <h1 class="${shimmerClass}">${escapeHtml(title)}</h1>
    </header>
  
    <main class="container">
      ${mdToHtml(String(markdown ?? ""))}
    </main>
  
    ${quotesHTML}
  
    <footer>
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(title)}. All rights reserved.</p>
    </footer>
  </body>
  </html>`;
  }
  
  function renderQuotes(quotes) {
    if (!Array.isArray(quotes) || quotes.length === 0) return "";
    const line1 = quotes[0] ? `<p>${escapeHtml(quotes[0])}</p>` : "";
    const line2 = quotes[1] ? `<p class="q2">${escapeHtml(quotes[1])}</p>` : "";
    return `
    <div class="quote">
      ${line1}
      ${line2}
    </div>`;
  }
  
  function escapeHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  
  function escapeAttr(s = "") {
    // same as escapeHtml but also escape single quotes for attributes if needed
    return escapeHtml(s).replace(/'/g, "&#39;");
  }
  
  // Optional CommonJS compatibility (if ever needed):
  // module.exports = { convertMarkdownToStyledHTML };
  