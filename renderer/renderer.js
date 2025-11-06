/**
 * Convert Markdown to a full HTML page with Ashley's classic/edgy/cozy style.
 *
 * Requirements in browser: include marked.js (or any markdown parser) before this script:
 * <script src="https://unpkg.com/marked/marked.min.js"></script>
 *
 * In Node: npm i marked, then: const { marked } = require('marked');
 *
 * @param {string} markdown - Your markdown content
 * @param {object} opts
 * @param {string} [opts.title="Ashley Ye"] - Page title & H1 heading
 * @param {string[]} [opts.quotes] - Array of up to 2 strings. If 2 given, second line fades in later.
 * @param {boolean} [opts.shimmerTitle=true] - Shimmering aura around the title
 * @returns {string} - A complete HTML string
 */
function convertMarkdownToStyledHTML(markdown, opts = {}) {
    const {
      title = "Ashley Ye",
      quotes = [],
      shimmerTitle = true
    } = opts;
  
    // Choose markdown parser
    const mdToHtml = (text) => {
      if (typeof marked !== "undefined") {
        return marked.parse(text);
      }
      // Fallback (very minimal) if marked isn't available:
      // Converts only paragraphs and line breaks—replace if you need more features.
      return text
        .split(/\n{2,}/)
        .map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
        .join("\n");
    };
  
    const quotesHTML = (function () {
      if (!quotes || quotes.length === 0) return "";
      const q1 = quotes[0] ? `<p>${escapeHtml(quotes[0])}</p>` : "";
      const q2 = quotes[1] ? `<p class="q2">${escapeHtml(quotes[1])}</p>` : "";
      return `
        <div class="quote">
          ${q1}
          ${q2}
        </div>
      `;
    })();
  
    const shimmerClass = shimmerTitle ? " shimmer" : "";
  
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${escapeHtml(title)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      :root{
        --bg: #0f0f11;
        --panel: #141417;
        --ink: #e8e1d9;
        --muted: #b8afa4;
        --accent: #c5a07a;
        --accent-strong: #b18459;
        --hairline: rgba(197,160,122,0.22);
        --veil: rgba(20,20,23,0.55);
      }
      *{margin:0;padding:0;box-sizing:border-box}
      html, body{
        font-family: "Playfair Display", serif;
        background:
          radial-gradient(1200px 600px at 50% -10%, rgba(197,160,122,0.10), transparent 60%),
          radial-gradient(800px 500px at 80% 110%, rgba(197,160,122,0.08), transparent 60%),
          var(--bg);
        color: var(--ink);
        line-height: 1.65;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 56px 22px 96px;
        letter-spacing: 0.1px;
      }
      header{
        text-align:center;
        margin-bottom: 28px;
      }
      header h1{
        font-weight: 600;
        font-size: clamp(2.4rem, 4vw, 3.4rem);
        letter-spacing: 0.6px;
        color: #e8e1d9;
        position: relative;
        text-shadow:
          0 0 6px rgba(197,160,122,0.25),
          0 0 12px rgba(197,160,122,0.15),
          0 0 18px rgba(197,160,122,0.1);
      }
      /* Subtle shimmering aura around the title */
      .shimmer {
        animation: shimmerGlow 5s ease-in-out infinite alternate;
      }
      @keyframes shimmerGlow {
        0% {
          text-shadow:
            0 0 4px rgba(197,160,122,0.10),
            0 0 10px rgba(197,160,122,0.05),
            0 0 16px rgba(197,160,122,0.0);
          opacity: 0.95;
        }
        50% {
          text-shadow:
            0 0 8px rgba(197,160,122,0.30),
            0 0 20px rgba(197,160,122,0.25),
            0 0 30px rgba(197,160,122,0.15);
          opacity: 1;
        }
        100% {
          text-shadow:
            0 0 4px rgba(197,160,122,0.10),
            0 0 10px rgba(197,160,122,0.05),
            0 0 16px rgba(197,160,122,0.0);
          opacity: 0.95;
        }
      }
      .container{
        width: 100%;
        max-width: 860px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.02), transparent 30%),
          var(--panel);
        border: 1px solid var(--hairline);
        border-radius: 14px;
        padding: 26px 24px;
        box-shadow:
          0 10px 30px rgba(0,0,0,0.35),
          inset 0 1px 0 rgba(255,255,255,0.03);
      }
      .container h2, .container h3, .container h4 {
        color: var(--muted);
        letter-spacing: 0.4px;
        margin-top: 0.5rem;
        margin-bottom: 0.6rem;
        font-weight: 500;
      }
      .container h2{ font-size: 1.55rem; }
      .container h3{ font-size: 1.3rem; }
      .container h4{ font-size: 1.1rem; }
  
      .container p { margin: 0.6rem 0; }
      .container ul, .container ol { margin: 0.6rem 1.2rem; }
      .container li { margin: 0.3rem 0; }
      .container a{
        color: var(--accent);
        text-decoration: none;
        border-bottom: 1px dashed rgba(197,160,122,0.35);
        padding-bottom: 1px;
        transition: color .2s ease, border-color .2s ease;
      }
      .container a:hover{
        color: var(--accent-strong);
        border-color: rgba(197,160,122,0.6);
      }
      .container code {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(197,160,122,0.18);
        padding: 0.06rem 0.3rem;
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
        font-size: 0.92em;
        color: var(--ink);
      }
      pre code {
        display: block;
        padding: 0.8rem 1rem;
        overflow-x: auto;
      }
  
      /* Fade-in for quotes */
      @keyframes fadeInSoft { from { opacity: 0; } to { opacity: 1; } }
      .quote{
        position: fixed;
        left: 50%;
        bottom: 64px;
        transform: translateX(-50%);
        width: min(96%, 1100px);
        text-align: center;
        color: rgba(232,225,217,0.40);
        font-weight: 400;
        font-size: 0.70rem;
        line-height: 1.35;
        pointer-events: none;
        filter: drop-shadow(0 1px 0 rgba(0,0,0,0.25));
      }
      .quote p{
        margin: 4px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        opacity: 0;
        animation: fadeInSoft 1.8s ease-in forwards;
      }
      .quote p.q2{
        animation-delay: 1.5s; /* delayed second line */
      }
  
      footer{
        position: fixed;
        bottom: 0; left: 0; width: 100%;
        text-align: center;
        padding: 10px 14px;
        font-size: 0.70rem;
        color: rgba(184,175,164,0.40);
        background: linear-gradient(180deg, transparent, var(--veil));
        border-top: 1px solid var(--hairline);
        letter-spacing: 0.35px;
        backdrop-filter: blur(2px);
      }
    </style>
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
  
  // Basic HTML-escaper for injected strings
  function escapeHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  
  // Node export (optional)
  if (typeof module !== "undefined") {
    module.exports = { convertMarkdownToStyledHTML };
  }
  