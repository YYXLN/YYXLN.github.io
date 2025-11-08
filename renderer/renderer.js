// renderer/renderer.js

export function convertMarkdownToStyledHTML(markdown, opts = {}) {
    // Build an absolute URL to /style.css relative to this file (works anywhere)
    const resolvedCssHref =
      opts.cssHref ??
      new URL("../style.css?v=4", import.meta.url).href;
  
    const {
      title = "Ashley Ye",
      quotes = [],
      shimmerTitle = true,
    } = opts;
  
    const cssLink = `<link rel="stylesheet" href="${escapeAttr(resolvedCssHref)}">`;
    const quotesHTML = renderQuotes(quotes);
    const shimmerClass = shimmerTitle ? "shimmer" : "";
  
    // Prefer marked if present; fall back to minimal paragraph conversion
    const mdToHtml = (text) => {
      if (typeof marked !== "undefined" && marked?.parse) {
        return marked.parse(text);
      }
      return String(text ?? "")
        .split(/\n{2,}/)
        .map(p => `<p>${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
        .join("\n");
    };
  
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${escapeHtml(title)}</title>
    ${cssLink}
  </head>
  <body>
    <header>
      <h1 class="${shimmerClass}">${escapeHtml(title)}</h1>
    </header>
  
    <main class="container">
      ${mdToHtml(markdown)}
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
    return escapeHtml(s).replace(/'/g, "&#39;");
  }
  