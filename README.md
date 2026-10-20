# Synkro marketing site

The public website for Synkro (formerly Zen Music Group). It is a static [Astro](https://astro.build) site: every page is sent to the browser as complete HTML, so search engines and AI answer engines can read all of it without running JavaScript. The licensing app lives in a separate repository (`Zen-Music-Tech/frontend`).

## Commands

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # type-check, then build to dist/
npm run preview   # serve the built site
```

## Where things are

| Path | What it holds |
|------|---------------|
| `src/data/site.ts` | All brand facts, stats, copy shared across pages, team, FAQs, audiences and glossary terms. Edit content here first. |
| `src/data/schema.ts` | Helpers that build schema.org structured data (FAQPage, BreadcrumbList, SoftwareApplication). |
| `src/styles/global.css` | Design tokens (light and dark), type scale, buttons, deck motifs. |
| `src/components/` | Homepage sections, header, footer, SEO head, FAQ, waitlist form. |
| `src/pages/` | Routes. `for/[slug]` and `glossary/[slug]` generate one page per entry in `site.ts`. |
| `src/pages/llms.txt.ts` | Generates `/llms.txt`, a plain-text summary of the site for AI assistants. |
| `public/` | Static files: `og.png` share image, favicon, `robots.txt`, team photos. |

Adding a glossary term or an audience page is a data change only: add an entry to `glossary` or `audiences` in `src/data/site.ts`. The page, sitemap entry, structured data and `llms.txt` line are generated from it.

## SEO and AEO built in

- Static HTML for every page, with one `h1`, a unique title and meta description, and a canonical URL.
- Open Graph and Twitter card tags with a 1200×630 share image.
- schema.org JSON-LD on every page: Organization and WebSite everywhere, plus SoftwareApplication, FAQPage, Article, BreadcrumbList, DefinedTerm/DefinedTermSet and AboutPage where they apply.
- Answer-first copy: question headings answered directly in the first sentences, so answer engines can quote them.
- `sitemap-index.xml` (generated), `robots.txt` and `llms.txt`.
- Light and dark themes that follow the visitor's system setting, with a toggle that remembers their choice.
- Self-hosted fonts and almost no JavaScript, for fast Core Web Vitals.

## Configuration

Copy `.env.example` to `.env` and set:

- `PUBLIC_WAITLIST_ENDPOINT`: the URL the waitlist form POSTs `{ "email", "role" }` to as JSON. Until it is set, the form validates input and tells the visitor it is not connected yet.

The production domain is set in `astro.config.mjs` (`site`), `src/data/site.ts` (`site.url`) and `public/robots.txt`. Change all three if the domain changes.

## Before launch

- [ ] Confirm the production domain and update the three places above.
- [ ] Connect the waitlist endpoint.
- [ ] Get partners' approval to name Believe, Bella Figura and Felt Music publicly.
- [ ] Confirm the public figures in `stats` and the Proof section (songs live, pilots, deals closed).
- [ ] Replace the team photos cropped from the investor deck with original high-resolution files.
- [ ] Add LinkedIn and other profiles to `site.social` so structured data links the company's profiles (`sameAs`).
- [ ] Deploy to Vercel (framework preset: Astro, no extra configuration needed) and submit the sitemap in Google Search Console and Bing Webmaster Tools.
