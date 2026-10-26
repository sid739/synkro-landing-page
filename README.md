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
| `src/scripts/motion.ts` | Scroll-triggered animations (reveal, staggered card sequences, typing, count-up, `data-loop` replays). |
| `src/scripts/cards.ts` | The light that follows the pointer across feature cards. |
| `src/scripts/hero.ts` | The homepage hero: sizes the sync timeline beside the headline and swaps the headline's word on each cut. |
| `src/components/SearchShowcase.astro` | "Describe your scene": example briefs type themselves and their results drop in (`src/data/search.ts`). |
| `src/components/TrackLabel.astro`, `Waveform.astro` | Music details: section labels as numbered tracks with an equaliser, and a waveform under each section title that sweeps into colour. |
| `src/components/BigMarquee.astro` | Oversized words drifting across the page, nudged along by scrolling. |
| `src/components/SyncPanel.astro` | The hero's sync timeline: the category reel on V1, a waveform on A1, a playhead that lands on a cue at every cut, and the matched track with its rights holders. |
| `tools/intro-film/` | Source of the homepage intro film (`public/intro/`). See "Intro film" below. |
| `public/` | Static files: `og.png` share image, favicon, `robots.txt`, artist photos, label logos. |

Adding a glossary term or a user type is a data change only: add an entry to `glossary` in `src/data/site.ts` or `roles` in `src/data/roles.ts`. The page, sitemap entry, structured data and `llms.txt` line are generated from it.

## Intro film

The homepage opens on a 9-second muted film (`public/intro/`) that plays once per browser session, full screen over the site, in 4K on large or high-resolution screens. It is drawn frame by frame on a canvas by `tools/intro-film/render.html` in Playwright's Chromium and encoded with ffmpeg; both need to be installed. To change it, edit that file, then from `tools/intro-film/`:

```bash
cp ../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2 archivo.woff2
cp ../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2 manrope.woff2
./prepare-footage.sh   # grades the clips in footage/ into frames
npx http-server -p 8765 -s . &
# Near-lossless masters, one per shape (large; keep them out of the repo).
CRF=12 LEVEL=5.1 node render.cjs 3840 2160 /tmp/master-4k.mp4
CRF=12 node render.cjs 1080 1920 /tmp/master-portrait.mp4
# What the page serves.
X="-an -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart"
V="-an -c:v libvpx-vp9 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p"
I=../../public/intro
ffmpeg -y -i /tmp/master-4k.mp4 $X -level:v 5.1 -crf 22 $I/synkro-intro-4k.mp4
ffmpeg -y -i /tmp/master-4k.mp4 -vf scale=1920:1080:flags=lanczos $X -level:v 4.0 -crf 21 $I/synkro-intro.mp4
ffmpeg -y -i /tmp/master-4k.mp4 -vf scale=1920:1080:flags=lanczos $V -crf 30 $I/synkro-intro.webm
ffmpeg -y -i /tmp/master-portrait.mp4 $X -level:v 4.0 -crf 22 $I/synkro-intro-portrait.mp4
ffmpeg -y -i /tmp/master-portrait.mp4 $V -crf 31 $I/synkro-intro-portrait.webm
```

Each category (Film, TV, Ads, Trailers, Games, Streaming) has its own clip. To change one, put the new clip in `footage/`, point its `clip` line in `prepare-footage.sh` at it (start time, length, grade), and re-run the steps above. The overhead guitar-and-records clip plays behind the closing Sync Anything. The hero's sync timeline uses the same graded category clips: after `prepare-footage.sh`, run `./make-hero-reel.sh` to rebuild `public/hero/`. The clips are from Pexels, which allows commercial use without credit.

## SEO and AEO built in

- Static HTML for every page, with one `h1`, a unique title and meta description, and a canonical URL.
- Open Graph and Twitter card tags with a 1200×630 share image.
- schema.org JSON-LD on every page: Organization and WebSite everywhere, plus SoftwareApplication, FAQPage, HowTo, Article, BreadcrumbList and DefinedTerm/DefinedTermSet where they apply.
- Answer-first copy: question headings answered directly in the first sentences, so answer engines can quote them.
- `sitemap-index.xml` (generated), `robots.txt` and `llms.txt`.
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
