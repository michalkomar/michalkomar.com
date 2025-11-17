# michalkomar.com

Single-page faux-terminal website for Michal Komar. The entire experience lives in `index.html`, which ships markup, styles, metadata, and the JavaScript command router without a build step.

## Project Layout
- `index.html` – terminal UI, command templates (`.ascii-only` + `.plain-only`), inline CSS, JSON-LD, and semantic fallbacks for screen readers.
- `about.json`, `ai-profile.json` – machine-readable mirrors of the hero copy and expertise areas. Keep them updated whenever visible content changes.
- `_headers`, `robots.txt`, `sitemap.xml` – Cloudflare security headers plus crawler directives. `sitemap.xml` now lists only the HTML + JSON profiles (the old `updates.json` feed has been removed).
- `styles.css` – historical reference only; do not import it in production.

## Local Development
```bash
npx wrangler pages dev . --local true   # optional router that mimics Cloudflare Pages
```
You can also open `index.html` directly in a browser for a quick pass. No bundler or dev server is required.

## Manual Test Checklist
1. Exercise all commands (`help`, `about`, `focus`, `faq`, `contact`, `contact li/x/gh`, `clear`).
2. Verify keyboard history (↑/↓) and `Escape` behavior, plus the live clock update.
3. Resize to 375 px, tablet, and desktop widths to ensure `.ascii-only` and `.plain-only` swaps behave with no horizontal scroll.
4. Run structured-data validation (Google Rich Results) and confirm `robots.txt`, `sitemap.xml`, and `about.json` reflect the latest dates.

## Deployment
```bash
npm install            # installs Wrangler dependency if you need it
npm run deploy         # wraps `wrangler pages publish` to michalkomar-com
```
You can also deploy manually through the Cloudflare Pages UI by pointing it at the GitHub repo (build command empty, output `/`).

## Housekeeping
- When editing copy, update: command templates, the hidden semantic `<section>`, JSON-LD inside `index.html`, plus `about.json`/`ai-profile.json`.
- Keep GEO meta tags, canonical URL, and social cards aligned with the current content.
- Track tonal consistency with the CLI aesthetic (lowercase commands, monospace text, accessible contrast).
