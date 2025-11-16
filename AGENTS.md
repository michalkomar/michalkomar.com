# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single-page app; keep hero, services, and CTA sections modular via HTML comments already in place.
- `styles.css` hosts hand-tuned overrides for Tailwind defaults; scope new selectors with descriptive prefixes (e.g., `.cta-`).
- Structured content lives in `about.json`, `ai-profile.json`, and `updates.json`; keep keys camelCase and mirror fields referenced by SEO snippets inside `index.html`.
- Static assets such as `favicon.svg`, `_headers`, and `robots.txt` deploy as-is to Cloudflare Pages; avoid deeply nested folders so the flat Pages deploy stays predictable.

## Build, Test, and Development Commands
```bash
npm install            # One-time install; required for Wrangler CLI
npx wrangler pages dev . --local true   # Preview the static site with CF Pages parity
npm run deploy         # Deploy the current directory to michalkomar-com project
```
Run commands from the repo root; deployments rely on your `wrangler.toml` or environment variables for API credentials.

## Coding Style & Naming Conventions
- Follow the existing 4-space indentation in `index.html`; keep sections separated by HTML comments for quick scrolling.
- Prefer semantic HTML tags (`section`, `article`, `header`) before adding extra `div`s; align Tailwind utility stacks from general → specific (layout, spacing, color).
- In `styles.css`, group related utilities under concise comments and use kebab-case class names. Run `npx prettier@latest index.html styles.css --write` if you introduce large blocks.

## Testing Guidelines
- No automated suite exists yet; before each PR, run the Wrangler dev server, test in both light/dark schemes, and check responsive breakpoints at 375px, 768px, and 1280px.
- Validate structured data using Google’s Rich Results Test and ensure the JSON-LD in `index.html` matches the latest `about.json` values.

## Commit & Pull Request Guidelines
- Match the existing imperative, sentence-style commits (`Add light/dark mode support`, `Remove FAQ entry`). Keep scope per commit small and reference issues with `#<id>` when applicable.
- PRs should summarize the user-visible change, list manual test steps, include screenshots for visual tweaks, and confirm that `npm run deploy` (or a dry run) succeeds.
