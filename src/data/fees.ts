// Indicative sync fee ranges, used by the fee estimator and the cost guide. Each range is the total for
// one use (master and publishing together, before any agency or legal costs) for a track by an
// emerging or independent artist: in one country for up to a year for ads, trailers and corporate
// video, and worldwide in perpetuity for film, TV and games, which are normally licensed that way.
// The multipliers then scale it for how well known the track is, the territory and the term. These are
// broad, illustrative figures drawn from publicly reported ranges, not quotes.

// "perpetual" marks media normally licensed worldwide and in perpetuity, already in their range.
export type Media = { id: string; label: string; low: number; high: number; perpetual?: boolean; note: string };

export const media: Media[] = [
  { id: "social", label: "Online or social ad", low: 1_000, high: 10_000, note: "Paid social and online video campaigns." },
  { id: "tv-ad", label: "TV commercial", low: 10_000, high: 75_000, note: "Broadcast advertising, usually also online." },
  { id: "trailer", label: "Trailer or promo", low: 10_000, high: 75_000, note: "Film, series and game trailers and promos." },
  { id: "film-indie", label: "Independent film", low: 500, high: 7_500, perpetual: true, note: "Festival and independent releases." },
  { id: "film-studio", label: "Studio film", low: 15_000, high: 100_000, perpetual: true, note: "Wide theatrical and streaming releases." },
  { id: "tv-episode", label: "TV or streaming series (per episode)", low: 1_000, high: 15_000, perpetual: true, note: "One use in one episode." },
  { id: "game", label: "Video game", low: 2_000, high: 30_000, perpetual: true, note: "In-game use; marketing is usually licensed separately." },
  { id: "corporate", label: "Corporate or internal video", low: 500, high: 5_000, note: "Brand films, events and internal communications." },
];

export type Factor = { id: string; label: string; x: number; hint?: string };

export const profiles: Factor[] = [
  { id: "emerging", label: "Emerging or independent artist", x: 1 },
  { id: "established", label: "Established artist", x: 3 },
  { id: "hit", label: "Well-known hit", x: 10, hint: "Famous songs can go far higher, and some are not available at any price." },
];

export const territories: Factor[] = [
  { id: "one", label: "One country", x: 1 },
  { id: "region", label: "A region (e.g. Europe, North America)", x: 1.6 },
  { id: "world", label: "Worldwide", x: 2.5 },
];

export const terms: Factor[] = [
  { id: "1y", label: "Up to 1 year", x: 1 },
  { id: "3y", label: "Up to 3 years", x: 1.8 },
  { id: "perpetual", label: "In perpetuity", x: 3 },
];

// Round to two significant figures, so estimates read as ranges rather than quotes.
export const round = (n: number) => {
  const p = 10 ** Math.max(0, Math.floor(Math.log10(n)) - 1);
  return Math.round(n / p) * p;
};

// The range for a use. Film, TV and games are normally licensed worldwide and in perpetuity, which is
// already in their range, so neither the territory nor the term scales them.
export function estimate(m: Media, profile: Factor, territory: Factor, term: Factor) {
  const x = profile.x * (m.perpetual ? 1 : territory.x * term.x);
  return { low: round(m.low * x), high: round(m.high * x) };
}

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
