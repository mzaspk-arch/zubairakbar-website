# zubairakbar.com

Personal website of Zubair Akbar — built and maintained by **Xpert Group FZE-LLC**.

Next.js (App Router) + TypeScript, server-rendered for SEO, runs on Node.js 20.9+ (Node 22 recommended).

## Where things live

| What | File / folder |
|---|---|
| Text, links, SaaS products, brands, social profiles | `lib/site.ts` |
| Page layouts | `app/**/page.tsx` |
| Blog articles (Markdown) | `content/blog/<topic>/<slug>.md` |
| Colours and styles | `app/globals.css` |
| Images and logos | `public/images/` |
| Contact form email sender | `app/api/contact/route.ts` |
| Settings and secrets (server only) | `.env` — copy from `.env.example`, never commit |

Blog topics: `uae-tax`, `pakistan-tax`, `saas`, `ai-automation`. A topic page stays hidden from Google (noindex) until it has at least one article.

### Add a blog article
1. Copy `content/blog/uae-tax/small-business-relief-uae.md` to the right topic folder with a new file name (the file name becomes the URL).
2. Edit the front matter (title, description, dates, cover text, FAQ) and the body.
3. Commit and push to `main` — the site rebuilds and deploys automatically.

## Run locally
```bash
npm install
cp .env.example .env    # fill in values
npm run dev             # http://localhost:3000
```

## Production (CloudPanel Node.js site)
```bash
npm ci --include=dev
npm run build
pm2 start ecosystem.config.js && pm2 save
```
Later deployments: `bash scripts/deploy.sh` (pull → install → build → zero-downtime reload).

### Automatic deployment
`.github/workflows/deploy.yml` type-checks and builds every push, then on `main` connects to the server over SSH and runs `scripts/deploy.sh`.
Repository secrets required: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `SSH_PORT`, `SITE_PATH`.

## SEO built in
Per-page titles, descriptions, canonical URLs, Open Graph/Twitter cards, generated share images, JSON-LD (Person, WebSite, BreadcrumbList, FAQPage, BlogPosting, SoftwareApplication list), `/sitemap.xml`, `/robots.txt`, clean URLs (`.html` → clean redirect), `www` → apex redirect, self-hosted fonts, consent-gated analytics.

© Xpert Group FZE-LLC. All rights reserved.
