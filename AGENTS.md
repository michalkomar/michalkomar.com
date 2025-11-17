# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the entire product: it contains the faux-terminal UI, all styling, JSON-LD, meta tags, and both the ASCII command templates and the mobile-only `plain-only` fallbacks. There is no external build step or component library, so edits must keep markup readable and well-commented.
- Legacy assets (`styles.css`) remain only for reference; do not reintroduce new global CSS files unless the owner requests it. Machine-readable data (`about.json`, `ai-profile.json`) and infrastructure files (`robots.txt`, `_headers`, `sitemap.xml`) should stay aligned with any visible content changes. (The previous `updates.json` feed has been retired.)

## Build, Test, and Development Commands
```bash
npm install                       # install wrangler for deployments
npx wrangler pages dev . --local true   # local preview with Cloudflare Pages router
npm run deploy                    # deploy to michalkomar-com on Cloudflare Pages
```
No bundler is required; the HTML file loads directly in any browser for quick checks.

## Coding Style & Naming Conventions
- Follow the monospace CLI aesthetic: short lines, lowercase commands, and explicit `<template data-command="...">` blocks. If you add a new command, provide both `.ascii-only` and `.plain-only` variants so small screens stay legible.
- Keep CSS within the main `<style>` block. Use CSS variables, `clamp()`, and `@media (prefers-color-scheme)` helpers exactly as the file does now. Respect the accessibility tweaks (wrapping, `overflow-wrap`, prompt label spacing) when editing.
- Metadata: whenever you change copy about services, markets, or stats, update the JSON-LD, GEO meta tags, and the off-screen semantic sections that mirror terminal content.

## Testing Guidelines
- Manual tests only. Before opening a PR: run `npx wrangler pages dev` and exercise every command (`help`, `contact`, `contact li/x/gh`, etc.) in desktop and mobile widths, verifying that no horizontal scroll appears and keyboard history (↑/↓) works.
- Validate structured data (Google Rich Results) and confirm `robots.txt`, `sitemap.xml`, and `about.json` still respond with current dates.

## Commit & Pull Request Guidelines
- Use concise, imperative commits (e.g., `feat: add contact command`). Include screenshots or screen recordings for UI changes, noting both light/dark modes and a 375px viewport.
- PR descriptions should mention which commands were affected, which manual tests were run (`wrangler pages dev`, mobile Safari/Chrome checks), and any SEO/meta updates applied.
