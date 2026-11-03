# Yuxin Ye’s personal website

The home page, Thoughts, and optional HTML CV share `style.css`. About me opens the standalone `cv.pdf`, preserving its original PDF formatting. The original homepage style and writing are preserved; the display name is Yuxin Ye. The live site is hosted on GitHub Pages at https://yyxln.github.io/.

## Edit and build

- Edit `index.html` for the home page.
- Edit `concepts/*.md` for Thoughts. The About link opens `cv.pdf`; the old About URL redirects there. Local `.md` links become `.html` links during the build.
- Edit `cv.md` for both CV formats. The current role includes work verified against company Codex records: Qwen training/rollout infrastructure, ACS sandbox integration and replay validation, and long-horizon agent evaluation harnesses.

```sh
npm ci
npm run build
npm run check
```

Generated HTML is checked in so GitHub Pages can serve it directly. The build is safe to repeat and does not replace the home page.

## Printable CV

The PDF uses the same `cv.md` source. To update both formats after editing the CV:

```sh
python3 -m pip install reportlab
npm run build:cv
npm run build
npm run check
```

The explicit `PDF_PAGE_BREAK` comment separates experience/education from projects/skills in the two-page PDF. It is invisible in the HTML version. Inspect the PDF after changes to confirm the two-page layout.

## Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. Check the home page, Thoughts, About, CV, and an individual note on desktop and mobile before publishing.
