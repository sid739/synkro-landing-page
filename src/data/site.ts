// Single source of truth for the site's copy and brand facts. All product copy comes from the
// current zenmusicgroup.com landing page, with the product name changed to Synkro.

export const site = {
  name: "Synkro",
  legalName: "Zen Music Group",
  url: "https://synkro.com",
  tagline: "Music licensing, in one place",
  footerLine: "Built for buyers, labels, publishers, and rights holders",
  description:
    "Synkro helps creative teams find the right music by feeling, understand the rights behind every track, and clear sync licenses in days, not months. Discovery, rights, negotiation, and payment in one workflow.",
  locale: "en_US",
  email: "hello@zenmusicgroup.com",
  contactEmail: "contact@zenmusicgroup.com",
  terms: "https://www.zenmusicgroup.com/terms",
  privacy: "https://www.zenmusicgroup.com/privacy",
  social: {
    linkedin: "https://www.linkedin.com/company/zen-music-group",
    instagram: "https://www.instagram.com/zen_music_group",
  },
} as const;

export const earlyAccessHref = `mailto:${site.email}?subject=${encodeURIComponent(`${site.name} early access`)}`;
export const demoHref = `mailto:${site.email}?subject=${encodeURIComponent(`${site.name} demo request`)}`;

export const nav = [
  { href: "/#how", label: "How it works" },
  { href: "/#catalog", label: "Catalog" },
  { href: "/#roles", label: "Who it's for" },
  { href: "/sync-licensing/", label: "Guide" },
] as const;

export const builtFor = ["Music Supervisors", "Labels & Publishers", "Creative Teams"] as const;

export const artists = [
  { name: "Aphex Twin", genre: "IDM & Electronic", photo: "/artists/aphex-twin.jpg" },
  { name: "M83", genre: "Synthpop & Ambient", photo: "/artists/m83.jpg" },
  { name: "A.R. Rahman", genre: "Cinematic & World", photo: "/artists/ar-rahman.jpg" },
  { name: "Royel Otis", genre: "Indie Pop", photo: "/artists/royel-otis.jpg" },
  { name: "Sara Landry", genre: "Hard Techno", photo: "/artists/sara-landry.jpg" },
  { name: "Novo Amor", genre: "Indie Folk", photo: "/artists/novo-amor.jpg" },
  { name: "Vancouver Sleep Clinic", genre: "Ambient Pop", photo: "/artists/vancouver-sleep-clinic.jpg" },
  { name: "Sabaton", genre: "Power Metal", photo: "/artists/sabaton.jpg" },
  { name: "Petit Biscuit", genre: "Melodic Electronic", photo: "/artists/petit-biscuit.jpg" },
] as const;

export const phases = ["Discover & search", "Clearance & drafting", "Deliver"] as const;

export type Step = {
  n: string;
  phase: 0 | 1 | 2;
  title: string;
  badge: string;
  feature: string;
  tagline: string;
  body: string;
  mock: { text: string; kind?: "ok" | "play" | "plus" | "file" | "label" }[];
  mixer?: { label: string; holder: string; value: number }[];
};

export const steps: Step[] = [
  { n: "01", phase: 0, title: "Find music", badge: "Instant", feature: "Intelligent search", tagline: "Find the perfect song, instantly",
    body: "Find the right song instantly. Input briefs or reference tracks to locate matching acoustics in sub-seconds.",
    mock: [{ text: "Search: upbeat electronic, energetic chord progressions", kind: "label" }, { text: "01_horizon_cut.wav · 98% Acoustic Match", kind: "play" }] },
  { n: "02", phase: 0, title: "Verify rights", badge: "Instant", feature: "Instant splits audit", tagline: "100% ownership transparency",
    body: "Clear splits automatically. Reconciles master and publishing registries in real-time to avoid production delays.",
    mock: [{ text: "Split registry audit complete", kind: "ok" }],
    mixer: [{ label: "Master", holder: "Believe", value: 50 }, { label: "Publishing", holder: "Sony", value: 25 }, { label: "Publishing", holder: "Warner", value: 25 }] },
  { n: "03", phase: 1, title: "Pitch clients", badge: "Instant", feature: "Portal pitching", tagline: "Frictionless client portals",
    body: "Pitch with synced video. Creative leads audition, rate, and approve track placements directly in-browser.",
    mock: [{ text: "Pitch link: Campaign Horizon", kind: "label" }, { text: "scene_cut_v2.mp4", kind: "file" }, { text: "Linked player", kind: "play" }] },
  { n: "04", phase: 1, title: "Request sync", badge: "Instant", feature: "One-click requests", tagline: "Pre-populated deal terms",
    body: "Automate intake. Key deal parameters are pre-validated and routed directly to verified sync desks.",
    mock: [{ text: "Outgoing license request", kind: "label" }, { text: "Territory: Worldwide" }, { text: "Term: 1 Year" }, { text: "Pre-populated terms routed to verified holders", kind: "ok" }] },
  { n: "05", phase: 1, title: "Negotiate", badge: "A few days", feature: "Unified deal rooms", tagline: "Secure workspace bidding",
    body: "Banish email chains. Align counter-offers, terms, and chat in one secure, transparent workspace.",
    mock: [{ text: "Buyer proposed: $5,000 all-in" }, { text: "Holder counter: $6,000" }, { text: "Deal workspace aligned", kind: "ok" }] },
  { n: "06", phase: 1, title: "Draft contract", badge: "1-2 days", feature: "Assisted drafting", tagline: "AI redlining in minutes",
    body: "Draft sync agreements in minutes. Built-in compliance checks catch territory and split conflicts instantly.",
    mock: [{ text: "Clause 7.1: worldwide rights approved", kind: "plus" }, { text: "Clause 7.2: split payouts enabled", kind: "plus" }, { text: "Checked against 14 compliance rules", kind: "ok" }] },
  { n: "07", phase: 2, title: "Payout splits", badge: "Instant", feature: "Instant settlement", tagline: "Escrow-based split payouts",
    body: "Direct split payouts. Escrow funds disburse directly to all rights holders upon signature, with no quarterly delays.",
    mock: [{ text: "$6,000 Escrow Disbursed", kind: "label" }, { text: "Believe: 50%" }, { text: "Sony: 25%" }, { text: "Warner: 25%" }] },
  { n: "08", phase: 2, title: "Get files", badge: "Instant", feature: "Broadcast delivery", tagline: "Certified clearance package",
    body: "Ready to air. Download broadcast WAVs, stem files, signed license PDFs, and cue sheets in one package.",
    mock: [{ text: "clearance_pack_certified.zip", kind: "file" }, { text: "Download package", kind: "ok" }] },
];

export type Stat = { value?: number; suffix?: string; text?: string; label: string; body: string; wide?: boolean };

export const catalogStats: Stat[] = [
  { value: 100000, suffix: "+", label: "Catalog", body: "master recordings ready to be discovered, filtered, shortlisted, and routed into licensing workflows.", wide: true },
  { value: 1000, suffix: "+", label: "Subgenres", body: "niche musical subgenres for extremely precise search and filtering." },
  { value: 10000, suffix: "+", label: "Artists", body: "creators represented across the catalog." },
  { value: 11000, suffix: "+", label: "Albums & Releases", body: "distinct releases spanning singles, EPs, and full-length records.", wide: true },
  { value: 60000, suffix: "+", label: "One-Stop", body: "tracks cleared for both master and publishing, ready for immediate sync licensing.", wide: true },
  { value: 20, suffix: "+", label: "Labels & Publishers", body: "labels, publishers and music companies, from Believe and Nuclear Blast to R&S Records and Bella Figura.", wide: true },
  { text: "1956–2026", label: "Catalog era", body: "seven decades of recordings, from early masters to this week's releases.", wide: true },
];

export const labels = [
  { name: "Believe", file: "logo-believe.png" },
  { name: "Versatile", file: "logo-versatile.png" },
  { name: "R&S Records", file: "logo-rs-records.png" },
  { name: "Communion", file: "logo-communion.png" },
  { name: "Blurred Recordings", file: "logo-blurred-recordings.png" },
  { name: "Ishtar Music", file: "logo-ishtar.png" },
  { name: "Bella Figura Music", file: "logo-bella-figura-white.png" },
  { name: "Allpoints Label Services", file: "logo-allpoints.png" },
  { name: "Greco-Roman", file: "logo-greco-roman.png" },
  { name: "Naive", file: "logo-naive.png" },
  { name: "Animal63", file: "logo-animal63.png" },
  { name: "b:electronic", file: "logo-belectronic.png" },
  { name: "Felt Music", file: "logo-felt-music.png" },
  { name: "Think Music", file: "logo-think-music.png" },
  { name: "All Night Long", file: "logo-all-night-long.png" },
  { name: "Nuclear Blast Records", file: "logo-nuclear-blast.png" },
] as const;

export const licensees = ["Production Houses", "Sync Agencies", "Ad Agencies", "Gaming Studios", "Film & TV", "Streaming", "Supervisors"] as const;
export const rightsHolders = ["Record Labels", "Publishers", "Distributors", "Catalog Owners"] as const;

export type Faq = { q: string; a: string };

export const homeFaq: Faq[] = [
  { q: "Can we clear tracks if one of the co-publishers is not a registered Synkro user?", a: "Yes. Unregistered co-owners receive secure, sign-in-free portal links via email. They can review the terms sheet, chat directly in the negotiation thread, upload redlines, and execute digital signatures without needing to create a permanent account." },
  { q: "Does Synkro use AI-generated music?", a: "No. Synkro has no AI-generated catalog. Every track in the platform was recorded by a human artist. AI is used only to power the search and discovery experience. Every license on Synkro pays a human being for their work." },
  { q: "Does Synkro use my uploaded briefs, videos, or reference tracks to train AI models?", a: "Absolutely not. We enforce strict privacy boundaries. Any creative briefs, script PDFs, reference audio tracks, or videos you upload to Synkro are processed in isolated, transient memory buffers for search calculations only. Your confidential assets are never used to train public or proprietary models, nor are they ever shared with third parties." },
  { q: "Does Synkro use my catalog's music to train AI models?", a: "No. We believe in absolute artist sovereignty. We never use any music from our labels, publishers, or independent artists to train AI generation models. Audio analysis is purely descriptive (extracting tempo, key, structure, and emotional profiles) to help buyers search and find your tracks." },
  { q: "How safe and secure is my music stored on Synkro?", a: "Your catalog is hosted on enterprise-grade, encrypted cloud storage with strict access controls. Audio previews are low-bitrate streams, and original master WAV files are stored in cold storage, accessible only when a sync transaction is successfully completed, fully signed, and paid for." },
  { q: "How fast can a sync license be cleared on Synkro?", a: "Synkro is designed to clear sync licenses rapidly. It can range from instantly up to a week depending on the rights holder. The platform accelerates the traditional timeline by bringing discovery, early rights visibility, and multi-party negotiation into a single synchronized workspace." },
  { q: "Whose contracts are used for licensing on Synkro?", a: "Licensing is executed using the contracts of the rights holders who own the music. Synkro does not impose third-party template agreements; instead, it provides a digital workspace where rights holders upload their own contracts, allowing buyers to review, redline, and negotiate terms with smart mapping on the backend." },
];

export type Term = { slug: string; term: string; short: string; body: string[]; related: string[] };

export const glossary: Term[] = [
  {
    slug: "sync-license",
    term: "Sync license",
    short: "Permission to pair a piece of music with moving pictures, such as a film, ad, game or video.",
    body: [
      "A sync (synchronization) license gives a licensee the right to use a musical composition in timed relation with visual media: a film scene, a TV episode, an advert, a trailer, a game or a social video.",
      "Using a recording needs two permissions. The sync license covers the composition and comes from the publishers who represent the songwriters. The master use license covers the specific recording and comes from whoever owns that master, usually a record label.",
      "A sync license sets the media the music can appear in, the term (how long), the territory (where), the fee, and any exclusivity.",
    ],
    related: ["master-use-license", "one-stop", "music-clearance"],
  },
  {
    slug: "master-use-license",
    term: "Master use license",
    short: "Permission to use a specific sound recording, granted by the owner of the master.",
    body: [
      "A master use license grants the right to use a particular recording of a song. It is granted by the owner of the master recording, which is usually a record label, an artist who owns their own masters, or a production music library.",
      "It is always paired with a sync license for the underlying composition. If a production re-records a song instead of using the original recording, it needs the sync license but not the master use license.",
    ],
    related: ["sync-license", "one-stop"],
  },
  {
    slug: "one-stop",
    term: "One-stop",
    short: "A track where one party can license both the master and the publishing.",
    body: [
      "A one-stop track is one where a single party controls, or is authorised to license, both the master recording and the composition. The licensee signs one agreement instead of clearing each owner separately.",
      "One-stop tracks are popular with music supervisors working to tight deadlines because there is only one negotiation and one contract.",
    ],
    related: ["sync-license", "master-use-license", "music-clearance"],
  },
  {
    slug: "mfn",
    term: "Most favoured nation (MFN)",
    short: "A clause that guarantees one rights holder terms at least as good as any other on the same use.",
    body: [
      "A most favoured nation clause, or MFN, means a rights holder receives terms at least as favourable as any other rights holder on the same use. If the master owner is paid a higher fee, the publisher's fee is raised to match.",
      "MFN clauses are common in sync deals because a track usually has several owners. They are why fees across the master and publishing sides of a song often end up equal.",
    ],
    related: ["sync-license", "publishing-split"],
  },
  {
    slug: "publishing-split",
    term: "Publishing split",
    short: "How ownership of a composition is divided between its writers and their publishers.",
    body: [
      "A publishing split records what percentage of a composition each writer, and each writer's publisher, owns or controls. A song with three writers might be split 50/30/20.",
      "In a sync deal, every party that controls a share of the publishing must approve the license, and the fee is divided according to the split.",
    ],
    related: ["mfn", "music-clearance", "pro"],
  },
  {
    slug: "music-clearance",
    term: "Music clearance",
    short: "Identifying every owner of a piece of music and securing permission from each of them.",
    body: [
      "Music clearance is the process of finding out who owns a recording and its composition, contacting each owner, agreeing terms and securing written permission before the music is used.",
      "It is often the slowest part of a sync deal, because ownership is split across labels, publishers and writers, and the information is spread across different databases and inboxes.",
    ],
    related: ["sync-license", "one-stop", "publishing-split"],
  },
  {
    slug: "cue-sheet",
    term: "Cue sheet",
    short: "A log of every piece of music used in a production, filed so writers and publishers are paid performance royalties.",
    body: [
      "A cue sheet lists each music cue in a film, programme or advert: the title, writers, publishers, how long it plays and how it is used (for example background or featured).",
      "Producers file cue sheets with performing rights organisations, which use them to pay performance royalties to the writers and publishers when the production is broadcast or performed.",
    ],
    related: ["pro", "sync-license"],
  },
  {
    slug: "pro",
    term: "Performing rights organisation (PRO)",
    short: "An organisation that collects performance royalties for songwriters and publishers.",
    body: [
      "A performing rights organisation licenses the public performance of compositions and pays royalties to writers and publishers. Examples include PRS for Music in the UK and ASCAP, BMI and SESAC in the US.",
      "Performance royalties are separate from the sync fee. A sync fee is paid once for the right to use the music; performance royalties are paid each time the finished production is broadcast or performed.",
    ],
    related: ["cue-sheet", "publishing-split"],
  },
  {
    slug: "music-supervisor",
    term: "Music supervisor",
    short: "The person who chooses and clears music for a film, show, ad or game.",
    body: [
      "A music supervisor finds music that fits a production's creative brief and budget, then clears it with every rights holder before the deadline.",
      "The job combines creative judgement with negotiation and paperwork, which is why search and clearance tools save supervisors the most time.",
    ],
    related: ["music-clearance", "sync-license"],
  },
  {
    slug: "stems",
    term: "Stems",
    short: "Separate audio files for the parts of a mix, such as drums, bass, vocals and melody.",
    body: [
      "Stems are grouped audio tracks exported from a mix, for example drums, bass, vocals and instruments. Editors use them to remove vocals under dialogue, extend a section or build a cut-down version to fit picture.",
      "Not every catalog provides stems, and their use is usually covered by the same sync and master use licenses as the full track.",
    ],
    related: ["master-use-license"],
  },
];

