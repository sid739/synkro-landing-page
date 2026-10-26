// The search showcase: example briefs and the results each one finds. Descriptions, not real titles;
// the section is labelled as an example.
export type SearchResult = { desc: string; meta: string; holders: number };
export type SearchExample = { brief: string; results: SearchResult[] };

export const searchExamples: SearchExample[] = [
  {
    brief: "Uplifting indie for a sneaker ad, around 120 BPM, builds at 0:20",
    results: [
      { desc: "Hazy indie guitar, summer evening", meta: "118 BPM · A major · 2:58", holders: 1 },
      { desc: "Bright handclap pop, rising chorus", meta: "122 BPM · C major · 3:10", holders: 2 },
      { desc: "Jangly guitar anthem, big finish", meta: "120 BPM · G major · 3:32", holders: 3 },
    ],
  },
  {
    brief: "Tense strings for a trailer reveal, slow build to one big hit",
    results: [
      { desc: "Slow-building strings, lifts in the last 20 seconds", meta: "72 BPM · D minor · 2:48", holders: 1 },
      { desc: "Driving post-rock build, big drums", meta: "128 BPM · E minor · 4:22", holders: 4 },
      { desc: "Low brass swell into silence", meta: "60 BPM · B minor · 1:56", holders: 2 },
    ],
  },
  {
    brief: "Late-night synth for a city timelapse, no vocals",
    results: [
      { desc: "Nocturnal synth pulse", meta: "110 BPM · C minor · 3:40", holders: 1 },
      { desc: "Warm analogue arpeggios, rain-soaked", meta: "96 BPM · F minor · 3:05", holders: 2 },
      { desc: "Hazy downtempo with tape hiss", meta: "84 BPM · A minor · 2:31", holders: 1 },
    ],
  },
];
