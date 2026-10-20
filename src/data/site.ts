// Single source of truth for brand facts, copy that appears on more than one page,
// and the structured data built from it. Facts here are quoted by search engines
// and AI answer engines, so every number must be one the company stands behind.

export const site = {
  name: "Synkro",
  legalName: "Zen Music Group",
  url: "https://synkro.com",
  tagline: "The transaction layer for music licensing.",
  description:
    "Synkro is a music licensing platform that takes a sync deal from first search to final payment in one workflow: semantic search, rights clearance, negotiation, contracts and split payouts.",
  launch: "January 2027",
  launchISO: "2027-01",
  locale: "en_GB",
  email: "hello@zenmusicgroup.com",
  contactEmail: "contact@zenmusicgroup.com",
  social: {
    linkedin: "https://www.linkedin.com/company/zen-music-group",
    instagram: "https://www.instagram.com/zen_music_group",
  },
} as const;

export const nav = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/for/music-supervisors/", label: "Licensees" },
  { href: "/for/labels-and-publishers/", label: "Rights holders" },
  { href: "/sync-licensing/", label: "Guide" },
  { href: "/about/", label: "About" },
] as const;

// Headline proof points. Each carries its source so the page can cite it.
export const stats = [
  { value: "100,000+", label: "master recordings in the catalog", source: "Synkro catalog, October 2026" },
  { value: "1–2 weeks", label: "from first search to final payment", source: "Synkro pilot deals" },
  { value: "$2.4B+", label: "global sync deal value", source: "IFPI Global Music Report 2026" },
] as const;

export const problems = [
  {
    title: "The blind search",
    body: "Keyword search finds the hits. The rest of every catalog stays buried.",
  },
  {
    title: "The rights-holder ghost hunt",
    body: "Weeks lost tracking down every label, publisher and writer on a single song.",
  },
  {
    title: "Workflow anarchy",
    body: "Around 50 emails a deal before a lawyer sees it. Terms get buried, and every lost detail costs more time.",
  },
  {
    title: "The deal killer",
    body: "6–8 weeks and legal fees on both sides. Productions stall, and some deals die.",
  },
] as const;

export const pillars = [
  { title: "Find the track", tag: "Semantic search", body: "Search by sound and mood. Every catalog gets heard, not just the hits." },
  { title: "Clear every owner", tag: "One-click clearance", body: "Labels, publishers and writers cleared in a single transaction." },
  { title: "Agree the terms", tag: "One shared deal room", body: "Every term and message lives on the deal, not in an inbox." },
  { title: "Sign and get paid", tag: "Contracts and payouts", body: "Drafted from the agreed terms, signed off by your lawyers. Payouts split automatically." },
] as const;

export type Step = {
  n: string;
  phase: 0 | 1 | 2;
  title: string;
  feature: string;
  tagline: string;
  time: string;
  detail: string;
  mock: { label: string; value: string; strong?: boolean }[];
};

// The eight steps of a deal, with the feature that handles each one. Mock rows are illustrative.
export const steps: Step[] = [
  { n: "01", phase: 0, title: "Find music", feature: "Intelligent search", tagline: "Find the right song, instantly", time: "Instant",
    detail: "Describe the scene or drop in a reference track. Synkro matches on sound, not just keywords, and returns ranked results in under a second.",
    mock: [{ label: "Search", value: "upbeat electronic, energetic chord progressions" }, { label: "horizon_cut.wav", value: "98% acoustic match", strong: true }] },
  { n: "02", phase: 0, title: "Verify rights", feature: "Instant splits audit", tagline: "Full ownership transparency", time: "Instant",
    detail: "Master and publishing registries are reconciled as you search, so every result shows who owns it and in what share before anyone falls in love with it.",
    mock: [{ label: "Master", value: "Believe · 50%" }, { label: "Publishing", value: "Publisher A 25% · Publisher B 25%" }, { label: "Split registry audit", value: "Complete", strong: true }] },
  { n: "03", phase: 1, title: "Pitch clients", feature: "Portal pitching", tagline: "Frictionless client portals", time: "Instant",
    detail: "Share a pitch link with music synced to your cut. Creative leads audition, rate and approve placements in the browser.",
    mock: [{ label: "Pitch link", value: "Campaign Horizon" }, { label: "Picture", value: "scene_cut_v2.mp4" }, { label: "Player", value: "Linked to picture", strong: true }] },
  { n: "04", phase: 1, title: "Request sync", feature: "One-click requests", tagline: "Pre-filled deal terms", time: "Instant",
    detail: "Key deal terms are filled in and checked up front, then routed straight to each verified rights holder's sync desk.",
    mock: [{ label: "Territory", value: "Worldwide" }, { label: "Term", value: "1 year" }, { label: "Routed to", value: "All verified holders", strong: true }] },
  { n: "05", phase: 1, title: "Negotiate", feature: "Unified deal rooms", tagline: "One secure workspace", time: "A few days",
    detail: "No email chains. Offers, counters, terms and chat for every rights holder sit in one transparent deal room.",
    mock: [{ label: "Buyer proposed", value: "$5,000 all-in" }, { label: "Holder countered", value: "$6,000" }, { label: "Deal room", value: "Aligned", strong: true }] },
  { n: "06", phase: 1, title: "Draft contract", feature: "Assisted drafting", tagline: "AI redlining in minutes", time: "1–2 days",
    detail: "The license is drafted on the rights holder's own contract. Built-in checks flag territory and split conflicts against the agreed terms.",
    mock: [{ label: "Clause 7.1", value: "Worldwide rights approved" }, { label: "Clause 7.2", value: "Split payouts enabled" }, { label: "Compliance", value: "14 rules checked", strong: true }] },
  { n: "07", phase: 2, title: "Payout splits", feature: "Instant settlement", tagline: "Escrow-based split payouts", time: "Instant",
    detail: "The licensee pays once. Escrow pays every rights holder their share on signature, with no quarterly wait.",
    mock: [{ label: "Escrow disbursed", value: "$6,000", strong: true }, { label: "Believe", value: "50%" }, { label: "Publisher A · Publisher B", value: "25% · 25%" }] },
  { n: "08", phase: 2, title: "Get files", feature: "Broadcast delivery", tagline: "Certified clearance package", time: "Instant",
    detail: "Ready to air. Download broadcast WAVs, stems, the signed license and cue sheet information in one package.",
    mock: [{ label: "clearance_pack.zip", value: "Ready", strong: true }, { label: "Includes", value: "WAV · stems · license PDF" }] },
];

export const phases = ["Discover and search", "Clearance and drafting", "Deliver"] as const;

export type Feature = { title: string; body: string; rows: { label: string; value: string }[]; wide?: boolean };

export const discoveryFeatures: Feature[] = [
  { title: "Catalog ingestion and AI enrichment", wide: true,
    body: "Import catalogs by CSV, DDEX feed, Drive or manual upload. Synkro extracts more than 20 acoustic and AI parameters and finds master and publishing splits automatically.",
    rows: [{ label: "Import from", value: "CSV · DDEX · Drive · Upload" }, { label: "Key · tempo", value: "G major · 124 BPM" }, { label: "Shape · chords", value: "Rising arc · I–V–vi–IV" }, { label: "Splits", value: "Found" }] },
  { title: "Direct rights lookups",
    body: "Look up any song, see its splits and send a license request straight away.",
    rows: [{ label: "Song", value: "Any released track" }, { label: "Territory", value: "Worldwide" }] },
  { title: "Search as a workspace", wide: true,
    body: "Upload briefs, drag in audio and video references, and refine results in a back-and-forth with your search agent. Briefs stay under NDA.",
    rows: [{ label: "Brief", value: "TV spot: upbeat electronic for a luxury watch" }, { label: "References", value: "audio_ref.wav · scene_cut.mp4" }] },
  { title: "Custom-terms license requests",
    body: "Package media scope, paid options, territories and more into one request.",
    rows: [{ label: "Media", value: "Paid and unpaid social" }, { label: "Option", value: "+1 year at 10% uplift" }] },
];

export const clearanceFeatures: Feature[] = [
  { title: "All rights holders on one thread", wide: true,
    body: "Negotiate splits, counter terms and MFN requirements with every master owner and publisher in a single deal thread.",
    rows: [{ label: "Master owner", value: "Agreed" }, { label: "Publisher 1", value: "Agreed" }, { label: "Publisher 2", value: "Agreed" }] },
  { title: "Contract assistant",
    body: "Compares each draft with the agreed terms and flags split or territory mismatches.",
    rows: [{ label: "Territory", value: "North America → Worldwide" }, { label: "Term", value: "1 year → 3 years + options" }] },
  { title: "Secure digital signatures",
    body: "Sign binding licenses with multi-party signature tracking.",
    rows: [{ label: "Licensee", value: "Signed" }, { label: "Publisher", value: "Signed" }, { label: "Master owner", value: "Signed" }] },
  { title: "Simple global payments",
    body: "One payment in. Synkro splits it across every holder, handles withholding tax and VAT, and settles over RTP, SEPA and more.",
    rows: [{ label: "Payment in", value: "€42,000" }, { label: "Master side", value: "€12,000" }, { label: "Publishing side", value: "€30,000" }] },
  { title: "Clearance pack delivery",
    body: "Broadcast-ready WAVs, stems, metadata sheets and signed agreements, ready the moment the deal closes.",
    rows: [{ label: "Master", value: "WAV" }, { label: "Stems", value: "WAV" }, { label: "License", value: "Signed PDF" }] },
];

export const catalogStats = [
  { value: "100,000+", label: "master recordings", body: "ready to be discovered, shortlisted and routed into licensing.", wide: true },
  { value: "60,000+", label: "one-stop tracks", body: "cleared for both master and publishing, ready to license immediately.", wide: true },
  { value: "10,000+", label: "artists", body: "represented across the catalog." },
  { value: "11,000+", label: "releases", body: "singles, EPs and full-length records." },
  { value: "1,000+", label: "subgenres", body: "for precise search and filtering.", wide: true },
  { value: "20+", label: "labels and publishers", body: "from Believe and Nuclear Blast to R&S Records and Bella Figura.", wide: true },
  { value: "1956–2026", label: "catalog era", body: "seven decades, from early masters to this week's releases.", wide: true },
] as const;

export const labels = [
  { name: "Nuclear Blast Records", file: "logo-nuclear-blast.png" },
  { name: "R&S Records", file: "logo-rs-records.png" },
  { name: "Bella Figura Music", file: "logo-bella-figura-white.png" },
  { name: "Felt Music", file: "logo-felt-music.png" },
  { name: "Communion", file: "logo-communion.png" },
  { name: "Naïve", file: "logo-naive.png" },
  { name: "Ishtar Music", file: "logo-ishtar.png" },
  { name: "Allpoints Label Services", file: "logo-allpoints.png" },
  { name: "Versatile", file: "logo-versatile.png" },
  { name: "Blurred Recordings", file: "logo-blurred-recordings.png" },
  { name: "Greco-Roman", file: "logo-greco-roman.png" },
  { name: "Animal63", file: "logo-animal63.png" },
  { name: "b:electronic", file: "logo-belectronic.png" },
  { name: "Think Music", file: "logo-think-music.png" },
  { name: "All Night Long", file: "logo-all-night-long.png" },
] as const;

export const artists = [
  { name: "Aphex Twin", genre: "IDM and electronic" },
  { name: "M83", genre: "Synth-pop and ambient" },
  { name: "A.R. Rahman", genre: "Cinematic and world" },
  { name: "Royel Otis", genre: "Indie pop" },
  { name: "Sara Landry", genre: "Hard techno" },
  { name: "Novo Amor", genre: "Indie folk" },
  { name: "Vancouver Sleep Clinic", genre: "Ambient pop" },
  { name: "Sabaton", genre: "Power metal" },
  { name: "Petit Biscuit", genre: "Melodic electronic" },
] as const;

export const whyNow = [
  { title: "The shift to semantic AI", then: "Keyword guesswork. Great tracks went unheard.", now: "Describe the scene. Get the right track in minutes." },
  { title: "The demand for instant scale", then: "Slow production made 6–8 week clearance tolerable.", now: "Content ships weekly. Licensing that takes weeks loses the deal." },
  { title: "Catalogs need scalable infrastructure", then: "A few big deals a year, done by hand.", now: "Sync volume needs software, not more headcount." },
] as const;

export const partners = [
  { name: "Believe", detail: "One of the world's largest music companies", songs: "100K songs on Synkro" },
  { name: "Bella Figura", detail: "Boutique publisher and label", songs: "Full catalog on Synkro" },
  { name: "Felt Music", detail: "Production music library", songs: "Full catalog on Synkro" },
] as const;

export const team = [
  { name: "Himant Prasansu", role: "Founder, CEO", photo: "/team/himant-prasansu.jpg", bio: "Executive across music and music tech. Previously at Cleopatra Records, Chaos Club Digital and Holdr." },
  { name: "Siddhanth Jain", role: "Co-founder, CFO", photo: "/team/siddhanth-jain.jpg", bio: "IIM MBA. Contributed to $70M+ of enterprise wins at L&T and ran finance for a lending business across four branches." },
  { name: "Sergio Pimentel", role: "COO", photo: "/team/sergio-pimentel.jpg", bio: "Award-winning music supervisor. Former head of licensing at Sony PlayStation, Activision and Big Sync." },
  { name: "Mokshesh Jain", role: "Co-founder, CTO", photo: "/team/mokshesh-jain.jpg", bio: "Master's in AI from the University of Sheffield. Formerly at Infosys, specialising in natural language processing." },
] as const;

export const advisor = { name: "Pete Beck", role: "Global Head of Sync at Believe" } as const;

export type Faq = { q: string; a: string };

export const homeFaq: Faq[] = [
  { q: "What is Synkro?", a: "Synkro is a music licensing platform for sync deals. Licensees search catalogs by sound and mood, check who owns each track, and request, negotiate, sign and pay for a license in one workflow. Rights holders use it to turn their catalog into licensable inventory." },
  { q: "How fast can a sync license be cleared on Synkro?", a: "Clearance can take anywhere from minutes to about a week, depending on the rights holder. Pilot deals have gone from first search to final payment in one to two weeks, compared with six to eight weeks over email." },
  { q: "Can we clear a track if a co-publisher isn't on Synkro?", a: "Yes. Co-owners who aren't registered get a secure link by email. They can review the terms, join the negotiation thread, upload redlines and sign, without creating an account." },
  { q: "Whose contracts are used?", a: "The rights holders' own. Synkro doesn't impose a template agreement. Rights holders upload their contracts, and buyers review, redline and negotiate them in the workspace." },
  { q: "Does Synkro use AI-generated music?", a: "No. Every track on Synkro was recorded by human artists. AI is used only for search and discovery, and every license on Synkro pays the people who made the music." },
  { q: "Is my catalog used to train AI models?", a: "No. Music from labels, publishers and artists on Synkro is never used to train AI generation models. Audio analysis is descriptive only: tempo, key, structure and mood, so buyers can find your tracks." },
  { q: "Are our briefs and reference files used to train AI?", a: "No. Briefs, scripts, reference audio and video are processed only to run your search. They are never used to train any model and never shared with third parties." },
  { q: "How is our music stored?", a: "Catalogs are held in encrypted cloud storage with strict access controls. Previews stream at low bitrate, and master WAV files are released only when a license is fully signed and paid for." },
  { q: "When does Synkro launch?", a: "Synkro is running pilots now and launches fully in January 2027. Join the waitlist or book a live demo for early access." },
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

export type Audience = {
  slug: string;
  name: string;
  side: "licensee" | "rights-holder";
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  pains: { title: string; body: string }[];
  gains: { title: string; body: string }[];
  faq: Faq[];
};

export const audiences: Audience[] = [
  {
    slug: "music-supervisors",
    name: "Music supervisors",
    side: "licensee",
    title: "Find music you can actually use.",
    metaTitle: "Music licensing software for music supervisors",
    metaDescription: "Search catalogs by sound, see who owns every track, and clear sync licenses in one to two weeks instead of six to eight. Built with a career music supervisor.",
    intro: "Synkro lets music supervisors search by sound and mood, see every owner of a track before shortlisting it, and clear it with one request instead of dozens of emails.",
    pains: [
      { title: "Shortlists that can't be cleared", body: "A director falls for a track, then you find out a publisher won't approve it." },
      { title: "Chasing owners", body: "Splits, contacts and territories are spread across databases and inboxes." },
      { title: "Deadlines that don't move", body: "Edits lock in days. Clearance still takes weeks." },
    ],
    gains: [
      { title: "Search by brief or reference", body: "Describe the scene or drop in a reference track and get ranked matches across every catalog on Synkro." },
      { title: "Ownership on every result", body: "Master and publishing owners, splits and territory restrictions are visible before you pitch." },
      { title: "One request, every owner", body: "Send media, term, territory and fee once. Track approvals and counters on a single deal." },
    ],
    faq: [
      { q: "Can I search by reference track?", a: "Yes. Upload or link a reference track and Synkro ranks catalog tracks by how closely they match its sound." },
      { q: "Can my director or client listen without an account?", a: "Yes. Share a playlist link and they can play every track on it." },
    ],
  },
  {
    slug: "ad-agencies",
    name: "Ad agencies and production companies",
    side: "licensee",
    title: "License music at the speed of a campaign.",
    metaTitle: "Ad agency and production music licensing",
    metaDescription: "Clear commercial music for campaigns in one to two weeks. Search by mood, check ownership up front, and negotiate media, term and territory in one place.",
    intro: "Campaigns ship weekly. Synkro gives agency and production teams a search-to-signature workflow, so music clearance stops being the reason a spot is late.",
    pains: [
      { title: "Fee guesswork", body: "Quotes come back weeks later, often outside budget." },
      { title: "Scope changes", body: "Adding a territory or a cut-down restarts the conversation with every owner." },
      { title: "Paper trails", body: "Terms agreed by email are hard to find when legal asks." },
    ],
    gains: [
      { title: "Fee ranges up front", body: "Set the media, term, territory and budget in the request so owners respond to a real offer." },
      { title: "Every change on the deal", body: "Extensions and new media are negotiated on the same deal, with the full history." },
      { title: "Contracts from the terms", body: "The license is drafted from what both sides agreed, ready for your legal team." },
    ],
    faq: [
      { q: "Can I license the same track for several territories?", a: "Yes. Territory, term and media are set per request and can be extended on the same deal later." },
    ],
  },
  {
    slug: "game-studios",
    name: "Game studios",
    side: "licensee",
    title: "Licensed music for games, without the clearance backlog.",
    metaTitle: "Music licensing for game studios",
    metaDescription: "Search licensed music for games, trailers and live-ops content, and clear in-game and marketing rights from every owner in one workflow.",
    intro: "Synkro was built with a former head of licensing at Sony PlayStation and Activision. It handles the long tail of tracks a live game and its marketing need, not just the headline song.",
    pains: [
      { title: "Volume", body: "Seasons, trailers and live events each need music, every few weeks." },
      { title: "Complex rights", body: "In-game, trailer and streaming rights are often negotiated separately." },
      { title: "Small teams", body: "A handful of people clear music for a whole portfolio." },
    ],
    gains: [
      { title: "Search at catalog scale", body: "Semantic search across every catalog on Synkro, by mood, tempo and reference." },
      { title: "All media on one deal", body: "Request in-game, trailer and marketing use together, or extend later." },
      { title: "Software, not headcount", body: "Handle more deals without growing the licensing team." },
    ],
    faq: [
      { q: "Does Synkro cover in-game and marketing use?", a: "Yes. The media you need are set in the license request, and owners approve or counter each one." },
    ],
  },
  {
    slug: "labels-and-publishers",
    name: "Labels and publishers",
    side: "rights-holder",
    title: "Turn your catalog into licensable inventory.",
    metaTitle: "Sync licensing platform for labels and publishers",
    metaDescription: "Make every track in your catalog searchable and licensable. Approve sync requests, sign licenses and receive split payouts in one platform.",
    intro: "Most sync income comes from a few well-known tracks because buyers can't find the rest. Synkro makes your whole catalog searchable by sound, and handles requests, contracts and payouts.",
    pains: [
      { title: "A buried catalog", body: "Keyword search surfaces the hits. Deep catalog rarely gets heard." },
      { title: "Inbox licensing", body: "Requests, counters and approvals are scattered across email threads." },
      { title: "Manual payouts", body: "Splitting fees between co-owners is spreadsheets and reminders." },
    ],
    gains: [
      { title: "Every track discoverable", body: "AI listens to your catalog, so tracks surface on sound and mood, not just metadata." },
      { title: "Requests in one place", body: "See the use, term, territory and fee on every request. Approve or counter on the deal." },
      { title: "Automatic split payouts", body: "Fees are divided by ownership and paid out with a full record." },
    ],
    faq: [
      { q: "Do we keep control over what gets licensed?", a: "Yes. Nothing is licensed without your approval, and you can approve, counter or decline each request." },
      { q: "How do we get our catalog onto Synkro?", a: "We ingest catalogs in bulk, including CSV exports from DISCO, and enrich them with audio analysis and rights data." },
    ],
  },
];

export const howItWorksFaq: Faq[] = [
  { q: "What does a sync deal on Synkro look like?", a: "A licensee finds a track, checks its owners, sends one request with the media, term, territory and fee range, negotiates with each owner on the same deal, signs a license drafted from the agreed terms, and receives the files. The fee is split between owners automatically." },
  { q: "Is Synkro a music library?", a: "No. Synkro does not own the music. Labels, publishers and libraries list their catalogs on Synkro and keep full control over what they license." },
];
