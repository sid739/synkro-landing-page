// The hero's search demo: one example brief per category, and the results each one finds. The hero's
// headline follows the category of the brief being typed (Sync Film, Sync TV, ...). Descriptions, not
// real titles; the demo is labelled as an example.
export type SearchResult = { desc: string; meta: string; holders: number };
export type SearchExample = { cat: string; brief: string; results: SearchResult[] };

export const searchExamples: SearchExample[] = [
  {
    cat: "Film",
    brief: "Quiet strings for a goodbye, lifts at the end",
    results: [
      { desc: "Slow strings, late lift", meta: "72 BPM · D minor · 2:48", holders: 1 },
      { desc: "Solo cello over soft piano", meta: "64 BPM · G minor · 3:12", holders: 2 },
      { desc: "Bittersweet chamber waltz", meta: "88 BPM · F major · 2:36", holders: 1 },
    ],
  },
  {
    cat: "TV",
    brief: "Sparse piano for a rainy cold open, no vocals",
    results: [
      { desc: "Piano over rain ambience", meta: "84 BPM · F major · 2:20", holders: 2 },
      { desc: "Muted felt piano, slow pulse", meta: "70 BPM · A minor · 2:54", holders: 1 },
      { desc: "Distant ambient guitar", meta: "76 BPM · E minor · 3:08", holders: 1 },
    ],
  },
  {
    cat: "Ads",
    brief: "Upbeat indie for a sneaker ad, builds at 0:20",
    results: [
      { desc: "Hazy summer indie", meta: "118 BPM · A major · 2:58", holders: 1 },
      { desc: "Bright handclap pop", meta: "122 BPM · C major · 3:10", holders: 2 },
      { desc: "Jangly guitar anthem", meta: "120 BPM · G major · 3:32", holders: 3 },
    ],
  },
  {
    cat: "Trailers",
    brief: "Tense trailer build, rising to one big hit",
    results: [
      { desc: "Post-rock build, big drums", meta: "128 BPM · E minor · 4:22", holders: 4 },
      { desc: "Brass swell into silence", meta: "60 BPM · B minor · 1:56", holders: 2 },
      { desc: "Ticking strings, hard stop", meta: "100 BPM · C minor · 2:10", holders: 1 },
    ],
  },
  {
    cat: "Games",
    brief: "Night synth for a neon city level, loops cleanly",
    results: [
      { desc: "Nocturnal synth pulse", meta: "110 BPM · C minor · 3:40", holders: 1 },
      { desc: "Rain-soaked arpeggios", meta: "96 BPM · F minor · 3:05", holders: 2 },
      { desc: "Dark retro bass groove", meta: "104 BPM · D minor · 2:44", holders: 1 },
    ],
  },
  {
    cat: "Streaming",
    brief: "Retro soul with brass for a title sequence",
    results: [
      { desc: "Soul groove, brass stabs", meta: "96 BPM · G minor · 3:18", holders: 3 },
      { desc: "Funky horns, swagger bass", meta: "102 BPM · B♭ major · 2:52", holders: 2 },
      { desc: "Vintage organ shuffle", meta: "92 BPM · E♭ major · 3:01", holders: 1 },
    ],
  },
];
