# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal website (michalkomar.com) - single-page HTML with Tailwind CSS, deployed on Cloudflare Pages.

## Architecture

### Core Files
- **index.html**: Single-page site with Tailwind CSS (CDN), embedded styles for theme support, comprehensive SEO metadata, structured data (JSON-LD), Open Graph tags
- **styles.css**: Legacy CSS file (not currently used - index.html uses inline styles + Tailwind)

### SEO & AI Crawler Support
- **about.json**: Machine-readable profile for AI crawlers (Perplexity, ChatGPT, Gemini)
- **ai-profile.json**: Extended profile with expertise and focus areas
- **updates.json**: Timeline of recent updates/milestones (update dates when making changes)
- **sitemap.xml**: XML sitemap (update lastmod dates when deploying)
- **robots.txt**: Search engine crawler directives
- **_headers**: Cloudflare Pages headers for security (X-Frame-Options, X-Content-Type-Options, etc.)

## Development & Deployment

### Local Preview
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

Or simply open `index.html` in a browser (no build process).

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

First-time setup requires authentication:
```bash
npx wrangler login
```

### Updating Dependencies
```bash
npm install  # Updates wrangler to version in package.json
```

## Design System

### Theming
- **Light/Dark Mode**: Automatic via `@media (prefers-color-scheme: dark)`
- Embedded `<style>` block in index.html overrides Tailwind colors for proper contrast in both modes
- `.text-white`, `.text-gray-*` classes have custom contrast overrides for light mode
- `.btn-primary` class provides consistent button styling across themes

### Typography & Layout
- Primary font: Inter (Google Fonts)
- Fallback: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- Responsive breakpoints: Tailwind defaults (md: 768px)
- Glassmorphism cards: `.glass-card` class (backdrop-blur, semi-transparent bg)

### Color System
- Accent color: Sky blue (#0284c7 light, #38bdf8 dark)
- Light mode: Dark text (#1f2937, #4b5563) on light bg (#f8f9fa)
- Dark mode: Light text (#d1d5db) on dark bg (#050505) with dot pattern overlay

## SEO & Metadata

### Target Keywords
- "Michal Komar"
- "J&T Banka AI consultant"
- "AI banking strategy"
- "digital banking innovation"

### Implementation
- **JSON-LD**: Person schema in index.html with job title, organization, sameAs links
- **Open Graph**: Facebook, LinkedIn, Twitter sharing tags
- **OG Image**: Auto-generated via og-image.vercel.app (no local image)
- **AI Crawlers**: about.json, ai-profile.json for LLM-based search (Perplexity, ChatGPT, Gemini)

### Validation
```bash
# Test endpoints
curl https://michalkomar.com/robots.txt
curl https://michalkomar.com/sitemap.xml
curl https://michalkomar.com/about.json
```

Validation tools:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Lighthouse SEO (target: ≥90)
- OpenGraph Preview: https://www.opengraph.xyz/

## Important Notes

### When Making Content Changes
1. Update `updates.json` with new entry (date, timestamp, description)
2. Update `sitemap.xml` lastmod dates to current date
3. Keep footer copyright year current
4. Maintain consistent tone: direct, concise, focused on value

### Styling Constraints
- **DO NOT** modify light/dark mode color overrides without testing both themes
- **DO NOT** remove `!important` flags in custom style block (needed to override Tailwind)
- Test contrast in both modes after any text/background color changes
- glassmorphism effect requires both `backdrop-filter` and `-webkit-backdrop-filter`
