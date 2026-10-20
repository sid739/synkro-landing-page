import type { Faq } from "./site";

// Who Synkro is for. Every claim here maps to a feature or FAQ answer on the landing page.
export type Role = {
  slug: string;
  name: string;
  short: string;
  side: "licensee" | "rights-holder";
  headline: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  pains: { title: string; body: string }[];
  gains: { title: string; body: string }[];
  features: string[];
  faq: Faq[];
};

export const roles: Role[] = [
  {
    slug: "music-supervisors",
    name: "Music supervisors",
    short: "Supervisors",
    side: "licensee",
    headline: "Find music you can actually use.",
    intro: "Search by brief or reference track, see every owner before you shortlist, and clear the track with all rights holders on one thread.",
    metaTitle: "Music licensing software for music supervisors",
    metaDescription: "Search catalogs by brief or reference track, see master and publishing splits on every result, and clear sync licenses with every rights holder in one deal room.",
    pains: [
      { title: "Shortlists that can't clear", body: "The director loves a track, then a co-publisher won't approve it." },
      { title: "Chasing every owner", body: "Splits, contacts and territories are spread across registries and inboxes." },
      { title: "Locked-picture deadlines", body: "The edit moves in days. Clearance used to move in weeks." },
    ],
    gains: [
      { title: "Search the way you brief", body: "Describe the scene, drop in a reference track or a scene cut, and refine results with your search agent." },
      { title: "Ownership on every result", body: "Master and publishing splits are reconciled as you search, so you only pitch what you can clear." },
      { title: "Every holder, one thread", body: "Counter terms and MFN requirements with every owner in one deal room. Co-publishers who aren't on Synkro join through a secure link." },
    ],
    features: ["Intelligent Search", "Search as a workspace", "Instant Splits Audit", "Unified Deal Rooms"],
    faq: [
      { q: "Can I search with a reference track or a scene cut?", a: "Yes. Upload a brief, drag in audio and video references, and refine the results in a back-and-forth with your search agent." },
      { q: "What if a co-publisher isn't on Synkro?", a: "They receive a secure, sign-in-free link by email to review the terms, join the negotiation thread, upload redlines and sign, without creating an account." },
    ],
  },
  {
    slug: "ad-agencies",
    name: "Ad agencies",
    short: "Ad agencies",
    side: "licensee",
    headline: "License music at the speed of a campaign.",
    intro: "Package media, territory and options into one request, get client sign-off in the browser, and let the contract assistant catch scope mismatches before legal does.",
    metaTitle: "Music licensing for ad agencies",
    metaDescription: "Clear music for ad campaigns in one workflow: custom-terms license requests, in-browser client approvals, and contract checks against the agreed media, territory and term.",
    pains: [
      { title: "Scope that keeps moving", body: "Paid social becomes TV. One market becomes five. Every change restarts the conversation." },
      { title: "Client approvals by email", body: "Tracks, cuts and feedback live in separate threads." },
      { title: "Terms lost before legal", body: "What was agreed and what was drafted don't always match." },
    ],
    gains: [
      { title: "Requests with real terms", body: "Package media scope, paid options, territories and extension options into one license request." },
      { title: "Pitch against picture", body: "Share a pitch link with the music synced to your cut. Clients audition, rate and approve in the browser." },
      { title: "Drafts checked against the deal", body: "The contract assistant compares each draft with the agreed terms and flags territory, media or term mismatches." },
    ],
    features: ["Custom terms license requests", "Portal Pitching", "Synkro Contract Assistant", "One-Click Requests"],
    faq: [
      { q: "Can I add territories or extend the term later?", a: "Yes. Media scope, territories, term and options are set in the request, and changes are negotiated on the same deal thread." },
    ],
  },
  {
    slug: "production-houses",
    name: "Production houses",
    short: "Production houses",
    side: "licensee",
    headline: "From brief to broadcast-ready files.",
    intro: "Search against the cut, clear every owner in one place, and download the master, stems, metadata and signed license as one certified package.",
    metaTitle: "Music licensing for production houses",
    metaDescription: "Search music against your edit, clear every rights holder in one deal room, and download broadcast WAVs, stems, metadata and the signed license in one clearance pack.",
    pains: [
      { title: "Deliverables scattered", body: "Masters, stems and paperwork arrive separately, late, or not at all." },
      { title: "Edits that change the brief", body: "A new cut means a new search and new approvals." },
      { title: "Paying several owners", body: "Every rights holder needs paying, often in different countries." },
    ],
    gains: [
      { title: "Search against your edit", body: "Attach the scene cut and reference audio to the brief and refine results as the edit changes." },
      { title: "One payment out", body: "Pay once. Synkro splits it across every holder and handles withholding and VAT." },
      { title: "A certified clearance pack", body: "Broadcast WAVs, stems, metadata sheets and the signed license, ready the moment the deal closes." },
    ],
    features: ["Search as a workspace", "Simplified global payments", "Clearance pack delivery", "Broadcast Delivery"],
    faq: [
      { q: "What's in the clearance pack?", a: "Broadcast-ready WAV files, stems, metadata sheets and the signed license agreements, available as soon as the license is signed and paid." },
    ],
  },
  {
    slug: "game-studios",
    name: "Game studios",
    short: "Gaming",
    side: "licensee",
    headline: "Licensed music for every season and trailer.",
    intro: "Search a catalog of 100,000+ recordings by sound, find one-stop tracks you can clear immediately, and license in-game and marketing use on the same deal.",
    metaTitle: "Music licensing for game studios",
    metaDescription: "Search 100,000+ recordings by sound, filter to 60,000+ one-stop tracks, and license in-game, trailer and marketing use from every rights holder in one workflow.",
    pains: [
      { title: "Constant demand", body: "Seasons, trailers and live events all need music, all year." },
      { title: "Many uses per track", body: "In-game, trailer and social rights are often negotiated separately." },
      { title: "Small licensing teams", body: "A few people clear music for a whole portfolio." },
    ],
    gains: [
      { title: "Search at catalog scale", body: "Search 100,000+ master recordings across 1,000+ subgenres by mood, energy and reference." },
      { title: "One-stop when it matters", body: "60,000+ tracks are cleared for both master and publishing, ready for immediate licensing." },
      { title: "Every use on one deal", body: "Package in-game, trailer and marketing media into one request with custom terms." },
    ],
    features: ["Intelligent Search", "Custom terms license requests", "One-Click Requests", "Instant Settlement"],
    faq: [
      { q: "Can one license cover in-game and marketing use?", a: "Yes. Media scope is set in the license request, so in-game, trailer and social use can be negotiated together." },
    ],
  },
  {
    slug: "film-and-tv",
    name: "Film & TV",
    short: "Film & TV",
    side: "licensee",
    headline: "Clear the scene before picture lock.",
    intro: "Audition music against the scene, see who owns it up front, and finish with signed licenses on the rights holders' own contracts.",
    metaTitle: "Music licensing for film and TV",
    metaDescription: "Audition music against the scene, see ownership before you pitch, negotiate with every owner in one deal room, and sign on the rights holders' own contracts.",
    pains: [
      { title: "Late surprises", body: "A track is cut into the scene before anyone knows who owns it." },
      { title: "Many owners per song", body: "A single needle drop can need three or four approvals." },
      { title: "Contract back-and-forth", body: "Redlines bounce between lawyers by email." },
    ],
    gains: [
      { title: "Audition against picture", body: "Pitch with synced video so directors and showrunners approve in context." },
      { title: "Their contracts, one workspace", body: "Rights holders upload their own contracts. You review, redline and negotiate them in one place." },
      { title: "Multi-party signatures", body: "Licensee, publisher and master owner sign digitally, with every signature tracked." },
    ],
    features: ["Portal Pitching", "Instant Splits Audit", "Assisted Drafting", "Secure digital signatures"],
    faq: [
      { q: "Whose contracts are used?", a: "The rights holders' own. Synkro doesn't impose a template; buyers review, redline and negotiate the holder's contract in the workspace." },
    ],
  },
  {
    slug: "streaming-platforms",
    name: "Streaming platforms",
    short: "Streaming",
    side: "licensee",
    headline: "Worldwide rights, at streaming volume.",
    intro: "Request worldwide terms in one step, pay every rights holder in one payment, and keep every deal in the same workspace.",
    metaTitle: "Music licensing for streaming platforms",
    metaDescription: "License music for original content at scale: worldwide territory requests, one payment split across every holder with withholding and VAT handled, and every deal in one workspace.",
    pains: [
      { title: "Global by default", body: "Every title needs worldwide rights, and every owner needs paying." },
      { title: "Volume", body: "Dozens of titles, each with its own music." },
      { title: "Tax and settlement", body: "Withholding, VAT and cross-border payments add work to every deal." },
    ],
    gains: [
      { title: "Worldwide in the request", body: "Set territory, media and term up front so owners respond to a complete offer." },
      { title: "One payment in", body: "Synkro splits each payment across every holder, handles withholding and VAT, and settles over RTP, SEPA and more." },
      { title: "Every deal in one place", body: "Requests, negotiations, contracts and deliveries for all titles live in one workspace." },
    ],
    features: ["One-Click Requests", "Simplified global payments", "Unified Deal Rooms", "Clearance pack delivery"],
    faq: [
      { q: "How are rights holders in different countries paid?", a: "The licensee pays once. Synkro splits the payment across every holder, handles withholding and VAT, and settles over RTP, SEPA and more." },
    ],
  },
  {
    slug: "labels-and-publishers",
    name: "Labels & publishers",
    short: "Labels & publishers",
    side: "rights-holder",
    headline: "Turn catalog into licensable inventory.",
    intro: "Upload your catalog and let AI tag every track so buyers find it by sound. Approve requests on your own contracts and get paid on signature.",
    metaTitle: "Sync licensing platform for labels and publishers",
    metaDescription: "Make every track discoverable with AI tagging, approve sync requests on your own contracts, and receive escrow-based split payouts on signature. Your music never trains AI models.",
    pains: [
      { title: "A buried catalog", body: "Keyword search finds the hits. The rest of the catalog rarely gets heard." },
      { title: "Licensing by inbox", body: "Requests, counters and approvals are scattered across email." },
      { title: "Slow, manual payouts", body: "Fees arrive late and have to be split by hand." },
    ],
    gains: [
      { title: "Every track discoverable", body: "Import by CSV, DDEX feed, Drive or upload. AI extracts 20+ acoustic and AI parameters so tracks surface by sound and mood." },
      { title: "Your contracts, your call", body: "Approve, counter or decline every request on your own contract, in one deal room." },
      { title: "Paid on signature", body: "Escrow funds pay every rights holder directly when the license is signed, with no quarterly wait." },
    ],
    features: ["Instant catalog ingestion & AI enrichment", "Unified Deal Rooms", "Instant Settlement", "Secure digital signatures"],
    faq: [
      { q: "Is our catalog used to train AI?", a: "No. Music on Synkro is never used to train AI generation models. Audio analysis is descriptive only: tempo, key, structure and emotional profile." },
      { q: "How is our music protected?", a: "Catalogs are held in encrypted cloud storage with strict access controls. Previews are low-bitrate streams, and master WAVs are released only when a license is fully signed and paid for." },
    ],
  },
  {
    slug: "distributors-and-catalog-owners",
    name: "Distributors & catalog owners",
    short: "Distributors",
    side: "rights-holder",
    headline: "Large catalogs, licensed at scale.",
    intro: "Ingest by DDEX feed, find master and publishing splits automatically, and let one payment settle across every holder.",
    metaTitle: "Sync licensing for distributors and catalog owners",
    metaDescription: "Ingest large catalogs by DDEX feed or CSV, find master and publishing splits automatically, and settle sync fees across every rights holder with withholding and VAT handled.",
    pains: [
      { title: "Catalog scale", body: "Thousands of releases, many with incomplete metadata." },
      { title: "Unclear splits", body: "Ownership has to be confirmed before anything can be licensed." },
      { title: "Settlement across holders", body: "One fee can owe money to several parties in several countries." },
    ],
    gains: [
      { title: "Bulk ingestion", body: "Import by DDEX feed or CSV, with tracks fingerprinted and tagged automatically." },
      { title: "Splits found for you", body: "Master and publishing splits are looked up during ingestion, so tracks are ready to license." },
      { title: "Settlement handled", body: "One payment in, split across every holder, with withholding and VAT handled." },
    ],
    features: ["Instant catalog ingestion & AI enrichment", "Direct rights lookups", "Instant Splits Audit", "Simplified global payments"],
    faq: [
      { q: "Which import formats are supported?", a: "CSV, DDEX feed, Drive and manual upload." },
    ],
  },
];

export const principles = [
  { title: "Human-made music only", body: "Synkro has no AI-generated catalog. Every track was recorded by a human artist, and every license pays a human being for their work.", icon: "voice" },
  { title: "Your catalog never trains AI", body: "We never use music from labels, publishers or artists to train AI generation models. Audio analysis is purely descriptive: tempo, key, structure and emotional profile.", icon: "shield" },
  { title: "Your briefs stay yours", body: "Briefs, scripts, reference audio and video are processed in isolated, transient memory for search only. They never train any model and are never shared.", icon: "lock" },
  { title: "Masters stay locked", body: "Previews stream at low bitrate. Original master WAVs sit in cold storage and are released only when a license is fully signed and paid for.", icon: "vault" },
] as const;
