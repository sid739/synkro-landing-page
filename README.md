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
| `src/data/site.ts` | All copy: hero, workflow steps, catalog stats, labels, artists, FAQ and glossary terms. Edit content here first. |
| `src/data/schema.ts` | Helpers that build schema.org structured data (FAQPage, BreadcrumbList, SoftwareApplication). |
| `src/styles/global.css` | Design tokens (light and dark), type scale, buttons, deck motifs. |
| `src/components/` | Homepage sections, header, footer, SEO head, FAQ, waitlist form. |
| `src/pages/` | Routes. `glossary/[slug]` generates one page per entry in `site.ts`. |
| `src/pages/llms.txt.ts` | Generates `/llms.txt`, a plain-text summary of the site for AI assistants. |
| `src/scripts/motion.ts` | Scroll-triggered animations (reveal, staggered card sequences, typing, count-up). |
| `public/` | Static files: `og.png` share image, favicon, `robots.txt`, artist photos, label logos. |

Adding a glossary term is a data change only: add an entry to `glossary` in `src/data/site.ts`. The page, sitemap entry, structured data and `llms.txt` line are generated from it.

## SEO and AEO built in

- Static HTML for every page, with one `h1`, a unique title and meta description, and a canonical URL.
- Open Graph and Twitter card tags with a 1200×630 share image.
- schema.org JSON-LD on every page: Organization and WebSite everywhere, plus SoftwareApplication, FAQPage, HowTo, Article, BreadcrumbList and DefinedTerm/DefinedTermSet where they apply.
- Answer-first copy: question headings answered directly in the first sentences, so answer engines can quote them.
- `sitemap-index.xml` (generated), `robots.txt` and `llms.txt`.
- Light and dark themes that follow the visitor's system setting, with a toggle that remembers their choice.
- Self-hosted fonts, compressed images and a few kilobytes of JavaScript, for fast Core Web Vitals.

## Content

All product copy comes from the current zenmusicgroup.com landing page, with the product name changed to Synkro. Artist photos and label logos are copies of the live site's files (`public/artists`, `public/labels`).

Animations are driven by `src/scripts/motion.ts` with data attributes (`data-reveal`, `data-play`, `data-type`, `data-count`). Every animated element is complete in the HTML, so crawlers, visitors without JavaScript and visitors with reduced motion see the finished content.

The production domain is set in `astro.config.mjs` (`site`), `src/data/site.ts` (`site.url`) and `public/robots.txt`. Change all three if the domain changes.

## Before launch

- [ ] Confirm the production domain and update the three places above.
- [ ] Decide the Synkro contact addresses (currently hello@ and contact@zenmusicgroup.com) and social profiles.
- [ ] Add Terms of Service and Privacy Policy pages (the footer links to the zenmusicgroup.com versions for now).
- [ ] Deploy to Vercel (framework preset: Astro, no extra configuration needed) and submit the sitemap in Google Search Console and Bing Webmaster Tools.
