# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal website (michalkomar.com) consisting of a single-page HTML site with CSS styling. The site is deployed on Cloudflare Pages.

## Architecture

- **index.html**: Single-page personal website with comprehensive SEO metadata, structured data (JSON-LD), and social sharing tags
- **styles.css**: Styling with responsive design and dark mode support via `prefers-color-scheme`
- **_headers**: Cloudflare Pages headers configuration for security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy)
- **robots.txt**: Search engine crawler directives
- **sitemap.xml**: XML sitemap for search engine indexing
- **about.json**: Machine-readable profile for AI crawlers (Perplexity, ChatGPT, Gemini)

## Development

### Local Development
Simply open `index.html` in a browser - no build process required.

### Deployment

#### Using Wrangler CLI (Recommended)
```bash
npm run deploy
```

This deploys directly to Cloudflare Pages using Wrangler. On first deploy, you may need to authenticate:
```bash
npx wrangler login
```

#### Using GitHub Integration
The site can also be configured for Cloudflare Pages with zero build steps. Deploy by:
1. Pushing to GitHub
2. Connecting repository in Cloudflare Dashboard → Pages
3. Build command: (leave empty)
4. Build output directory: `/`

### Design Principles
- The site uses system fonts and dark mode media queries for automatic theme switching
- Responsive design with breakpoints at 600px for mobile
- Security headers are configured in `_headers` for Cloudflare Pages

## SEO Optimization

### Target Keywords
The site is optimized for:
- "Michal Komar"
- "J&T Banka AI consultant"
- "AI banking strategy"
- "digital banking innovation"

### SEO Features
- **Metadata**: Comprehensive meta tags with proper title, description, and keywords
- **Structured Data**: JSON-LD schema for Person type with job title and organization
- **Open Graph**: Social sharing optimization for Facebook, LinkedIn, Twitter
- **Twitter Cards**: Large image cards for better social media visibility
- **Auto-generated OG Image**: Using og-image.vercel.app (no local image hosting needed)
- **AI Crawler Support**: about.json provides machine-readable profile data

### SEO Testing & Validation

After deployment, validate SEO implementation:

```bash
# Test robots.txt
curl https://michalkomar.com/robots.txt

# Test sitemap.xml
curl https://michalkomar.com/sitemap.xml

# Test structured data
curl https://michalkomar.com/about.json
```

**Online validation tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Lighthouse SEO Audit: Run in Chrome DevTools (Target: Score ≥ 90)
- OpenGraph Preview: https://www.opengraph.xyz/

### Search Console Setup
1. Submit sitemap to Google Search Console: https://search.google.com/search-console
2. Submit to Bing Webmaster Tools: https://www.bing.com/webmasters
3. Monitor indexing status and search performance
