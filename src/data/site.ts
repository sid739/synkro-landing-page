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
  social: {
    linkedin: "",
    x: "",
    instagram: "",
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
  { value: "150K+", label: "songs live on the platform", source: "Synkro, October 2026" },
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

export type Step = { n: string; title: string; summary: string; detail: string };

export const steps: Step[] = [
  { n: "01", title: "Find music", summary: "Search by brief or reference track.", detail: "Describe the scene in plain language or drop in a reference track. Results are ranked by how closely they sound like what you asked for, across every catalog on Synkro." },
  { n: "02", title: "Verify rights", summary: "See who owns it before you pitch it.", detail: "Master and publishing ownership, splits and territory restrictions are shown on every track, so you only shortlist music you can actually clear." },
  { n: "03", title: "Pitch clients", summary: "Share a playable shortlist.", detail: "Build a playlist of clearable tracks and share one link with your director, brand or showrunner." },
  { n: "04", title: "Request sync", summary: "One request to every rights holder.", detail: "Set media, term, territory and fee range once. Synkro sends the request to every party on the track at the same time." },
  { n: "05", title: "Negotiate", summary: "Counter-offers in one thread.", detail: "Approvals and counters for each rights holder sit on the deal with the full history. Nobody negotiates by email." },
  { n: "06", title: "Draft contract", summary: "The license is drafted from the terms.", detail: "Agreed terms become a license draft automatically. Both sides review it with their own lawyers and sign in the platform." },
  { n: "07", title: "Payout splits", summary: "Everyone gets their share.", detail: "The fee is split by ownership and paid to each rights holder automatically, with a record of who was paid what." },
  { n: "08", title: "Get files", summary: "Masters, stems and paperwork.", detail: "Once the license is signed, download the master, stems and cue sheet information your editor and PRO reporting need." },
];

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
  { q: "How long does it take to license a song with Synkro?", a: "Pilot deals on Synkro have gone from first search to final payment in one to two weeks. The same process typically takes six to eight weeks over email." },
  { q: "Who is Synkro for?", a: "Licensees such as music supervisors, sync agencies, ad agencies, production companies, game studios, film and TV, and streaming platforms. Rights holders such as record labels, publishers, distributors and catalog owners." },
  { q: "How does Synkro clear a song with several owners?", a: "Each track shows its master and publishing owners and their splits. One request goes to every party at once, each rights holder approves or counters on the same deal, and the fee is split between them automatically once the license is signed." },
  { q: "Does Synkro replace our lawyers?", a: "No. Synkro drafts the license from the terms both sides agreed, and your lawyers review and sign it off. It removes the email back-and-forth before the contract stage, not legal review." },
  { q: "When does Synkro launch?", a: "Synkro is running pilots now and launches fully in January 2027. Join the waitlist for early access." },
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
