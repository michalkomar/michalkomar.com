# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview
Single-file personal site (`index.html`) rendered as a faux terminal that responds to typed commands. There is no framework, bundler, or external stylesheet—everything (HTML, CSS, JS, metadata) lives in `index.html`. Deploys to Cloudflare Pages.

## Architecture & Key Files
- **index.html** – Terminal window markup, inline CSS for light/dark themes, JavaScript command router, SEO meta tags, JSON-LD, `<noscript>` fallback, and accessible off-screen sections that mirror the terminal content. Command responses exist in `<template data-command="...">` blocks with two variants:
  - `.command-block.ascii-only` for desktop CLI styling
  - `.command-block.plain-only` for mobile friendly text
- **about.json / ai-profile.json** – Machine-readable profile for AI crawlers. Update when visible copy changes. (The standalone `updates.json` feed has been removed.)
- **robots.txt, sitemap.xml, _headers** – Crawling rules, sitemap metadata, and Cloudflare security headers.
- **social-card.png** – 1200×630 raster asset referenced by Open Graph/Twitter tags. Update when narrative changes.
- **styles.css** – Historical stylesheet; do not use unless explicitly instructed.

## Development & Preview
```bash
npm install                       # install wrangler dependency
npx wrangler pages dev . --local true   # watch mode with CF Pages routing
npm run deploy                    # pushes the current tree to Cloudflare Pages
```
You can also open `index.html` directly in the browser for quick checks.

## Terminal UI Rules
- Commands must remain in lowercase (`help`, `contact li`, etc.). Adding a new command requires adding both ASCII and plain blocks, updating the off-screen semantic content, and documenting it in `help`.
- The prompt is `root:~$` and supports history nav (↑/↓) plus `clear`. Preserve the JS history behavior when editing.
- Mobile accessibility: `.ascii-only` blocks hide at ≤640px, while `.plain-only` blocks show text without headings. Don’t remove the wrapping safeguards (`overflow-wrap: anywhere`, `clamp()` fonts, etc.).
- Keep the `<noscript>` block in sync with the visible command list so the site remains informative when JS is disabled.

## SEO & GEO
- GEO meta tags (region, placename, coordinates) and Person JSON-LD must stay synced with visible content. Whenever you update location references or service offerings, update JSON-LD plus `about.json`/`ai-profile.json` and adjust the off-screen `<section>` content.
- Keep `about.json`, `ai-profile.json`, and `sitemap.xml` dates in sync whenever visible content changes.

## Testing Checklist
1. `npx wrangler pages dev . --local true` – ensure all commands render, the clock updates, and no console errors.
2. Test at 375px (mobile), 768px, and desktop widths. Verify no horizontal scrolling and that the plain blocks appear on mobile.
3. Manual keyboard test: type a few commands, use ↑/↓, `clear`, and `contact li/x/gh` links.
4. Validate structured data (Google Rich Results), and load `robots.txt`, `sitemap.xml`, and `about.json` to ensure dates/links remain accurate.

## Content Updates
- Touching terminal copy requires updating: command templates (ASCII + plain), the hidden semantics block near the top, JSON-LD, and any related JSON files.
- Mention new services/stats consistently across hero text, focus areas, FAQ, and contact hints.

Follow these steps and keep commits focused (imperative tense). Screenshots or short videos of terminal interactions are highly encouraged for pull requests.
