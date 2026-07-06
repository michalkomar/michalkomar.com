# michalkomar.com

Personal site of **[Michal Komar](https://michalkomar.com)** — AI consultant at J&T Banka in Prague, Czech Republic. Agentic AI, enterprise AI integration, and intelligent automation for banks and regulated enterprises, across the EU and worldwide.

The whole site is **one hand-written HTML file** rendered as an interactive terminal: no framework, no build step, no fonts fetched, no cookies, no tracking. It deploys to Cloudflare Pages straight from this repo.

**Try it live: [michalkomar.com](https://michalkomar.com)** — type `help`, or `neofetch`, or just scroll: the full profile is also rendered as a Unix man page, `MICHALKOMAR(1)`.

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | The entire product: terminal UI, command router, man page, inline CSS, JSON-LD |
| `llms.txt` | Structured profile for AI assistants and LLM crawlers |
| `about.json` / `ai-profile.json` | Machine-readable profile mirrors (CORS-enabled) |
| `robots.txt` / `sitemap.xml` / `_headers` | Crawler directives, sitemap, Cloudflare security headers |
| `social-card.png` | 1200×630 Open Graph / Twitter card |

## Terminal features

- Real shell ergonomics: tab completion, zsh-style ghost suggestions, persistent history (`↑`/`↓`), `Ctrl+L`, `Ctrl+C`, `Esc`
- A small virtual filesystem: `ls`, `cat work.md`, `cat services.md`, `cat contact.md`…
- `man michal` — the readable profile, styled as a genuine man page (also what search engines index)
- `theme dark|light|auto`, a tmux-style status bar with Prague time, and a few undocumented commands (`help --all`)
- Mobile-first: tap chips instead of typing, no horizontal scroll down to 320 px, amber-phosphor dark theme and paper light theme
- Progressive enhancement: with JavaScript disabled, the boot card and man page still render everything

## Develop & deploy

```bash
npm install                            # wrangler
npx wrangler pages dev . --local true  # local preview
npm run deploy                         # Cloudflare Pages (or push — Git integration deploys automatically)
```

## About Michal

- **LinkedIn:** [linkedin.com/in/michalkomar](https://www.linkedin.com/in/michalkomar/)
- **X:** [x.com/michalkomar](https://x.com/michalkomar)
- **GitHub:** [github.com/michalkomar](https://github.com/michalkomar)

© Michal Komar. Content is his; feel free to borrow ideas from the code.
