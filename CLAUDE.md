# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview
Single-file personal site (`index.html`) for Michal Komar — an interactive terminal (TUI) plus a fully indexable man-page profile. No framework, no bundler, no external fonts or stylesheets; everything lives in `index.html`. Public repo; deploys to Cloudflare Pages via Git integration (pushing to `main` deploys production).

## Architecture (`index.html`)
1. **Head** — SEO/GEO meta, Open Graph/Twitter, and a JSON-LD `@graph` (WebSite + ProfilePage + Person + FAQPage).
2. **Terminal** (`.term`, 100dvh) — static boot block (`#boot`: motd + neofetch identity card with the `<h1>`), live output (`#out`, `role="log"`), sticky prompt form, quick-command chips, tmux-style status bar with Prague clock and theme toggle.
3. **Man page** (`#man`) — the readable profile styled as `MICHALKOMAR(1)`. This is the primary SEO surface: real, visible content (NAME, SYNOPSIS, DESCRIPTION, OPTIONS, TRACK RECORD, PHILOSOPHY, FAQ, PROJECTS, ENVIRONMENT incl. a Czech paragraph, HISTORY, SEE ALSO, BUGS, COLOPHON). Never hide it or move it off-screen.
4. **Templates** (`<template data-cmd="...">`) — one reflowable variant per command output. No ASCII boxes with right-hand borders; blocks must wrap at 320px. (The old `.ascii-only`/`.plain-only` dual system is gone — do not reintroduce it.)
5. **Script** — command registry `CMDS` (drives `help` and tab completion), `ALIAS` map (legacy commands like `w`, `ps`, `finger --linkedin` must keep working), virtual files in `FILES`, history in `localStorage`, ghost autosuggest, `Ctrl+L`/`Ctrl+C`/`Esc`, theme cycling (`auto|dark|light` via `data-theme` on `<html>`).

## Supporting files
- `llms.txt` — structured profile for AI assistants; the richest machine-readable surface.
- `about.json` / `ai-profile.json` — profile mirrors (CORS-enabled via `_headers`).
- `robots.txt` — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …).
- `sitemap.xml`, `_headers`, `favicon.svg`, `social-card.png`.

## Adding a command
1. Add to `CMDS` (or `ALIAS`) in the script — `help` and completion update automatically.
2. If it prints content, add a `<template data-cmd="...">` block (single variant, reflowable).
3. If the content is substantive, mirror it in the man page + `llms.txt` + JSON files.

## Content rules
- Every factual claim must stay grounded in verified sources (own site history, LinkedIn, Trask/Ackee case studies). Key verified stats: 2M+ messages/day, 17 backend systems, 350ms→80ms latency, mobile bank live 2024 used by ~⅓ of clients, J&T since 2019, AI Consultant since June 2025.
- Name: "Michal Komar" for English branding, "Michal Komár" as Czech alternate — both intentional, keep both in meta/JSON-LD.
- **No personal email addresses anywhere** — the repo is public. Contact = LinkedIn/X/GitHub only.
- When visible copy changes, update in lockstep: man page, templates, JSON-LD, `llms.txt`, `about.json`, `ai-profile.json`, and `dateModified`/`lastmod` dates (sitemap + JSON).

## Design tokens
Amber-phosphor dark theme (default) / warm-paper light theme; system monospace stack (no webfonts). All colors are CSS custom properties in `:root` / `[data-theme="light"]` — keep AA contrast (amber on dark bg ≈ 9:1, bronze on paper ≈ 4.7:1). Respect `prefers-reduced-motion`; input font-size must stay ≥16px (iOS zoom).

## Development & Testing
```bash
npm run dev      # wrangler pages dev . --local true
npm test         # syntax-checks the inline JS
npm run deploy   # manual deploy (Git push also auto-deploys)
```
Manual checklist: exercise commands + aliases, tab completion, ↑/↓ history, Ctrl+L, theme cycle; test 320/375/768/desktop widths (no horizontal scroll); check the man page renders with JS disabled; validate structured data (Google Rich Results test).

Keep commits focused, imperative tense. Screenshots (dark + light, 375px + desktop) encouraged in PRs.
