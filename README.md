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
| `src/data/roles.ts` | Who it's for: the eight user types (homepage switcher and `/for/*` pages) and the AI principles. |
| `src/data/schema.ts` | Helpers that build schema.org structured data (FAQPage, BreadcrumbList, SoftwareApplication). |
| `src/styles/global.css` | Design tokens (light and dark), type scale, buttons, dot-grid motif, motion. |
| `src/components/` | Homepage sections, header, footer, SEO head, FAQ, call to action. |
| `src/pages/` | Routes. `for/[slug]` and `glossary/[slug]` generate one page per entry in the data files. |
| `src/pages/llms.txt.ts` | Generates `/llms.txt`, a plain-text summary of the site for AI assistants. |
| `src/scripts/motion.ts` | Scroll-triggered animations (reveal, staggered card sequences, typing, count-up). |
| `src/scripts/record.ts` | The homepage hero: the turning vinyl record, its tonearm, and the scroll from the record into the example results. |
| `tools/intro-film/` | Source of the homepage intro film (`public/intro/`). See "Intro film" below. |
| `public/` | Static files: `og.png` share image, favicon, `robots.txt`, artist photos, label logos. |

Adding a glossary term or a user type is a data change only: add an entry to `glossary` in `src/data/site.ts` or `roles` in `src/data/roles.ts`. The page, sitemap entry, structured data and `llms.txt` line are generated from it.

## Intro film

The homepage opens on a 12-second muted film (`public/intro/`). It is drawn frame by frame on a canvas by `tools/intro-film/render.html` in Playwright's Chromium and encoded with ffmpeg; both need to be installed. To change it, edit that file, then from `tools/intro-film/`:

```bash
cp ../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2 archivo.woff2
cp ../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2 manrope.woff2
npx http-server -p 8765 -s . &
CRF=28 node render.js 1920 1080 ../../public/intro/synkro-intro.mp4
CRF=28 node render.js 720 1280 ../../public/intro/synkro-intro-portrait.mp4
CRF=33 node render.js 1920 1080 ../../public/intro/synkro-intro.webm
CRF=33 node render.js 720 1280 ../../public/intro/synkro-intro-portrait.webm
ffmpeg -y -ss 11 -i ../../public/intro/synkro-intro.mp4 -frames:v 1 -q:v 4 ../../public/intro/poster.jpg
ffmpeg -y -ss 11 -i ../../public/intro/synkro-intro-portrait.mp4 -frames:v 1 -q:v 4 ../../public/intro/poster-portrait.jpg
```

To use real footage instead, replace the MP4 and WebM files and the posters; nothing else changes.

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
