// The hero's sync timeline and its headline share these: the reel built by
// tools/intro-film/make-hero-reel.sh is six SEG-second shots in this order. The tracks are
// descriptions, not real titles; the panel is labelled as an example.
export const SEG = 2.6;

export type SyncSegment = { cat: string; clip: string; track: string; bpm: number; key: string; holders: number };

export const syncSegments: SyncSegment[] = [
  { cat: "Film", clip: "film", track: "Slow-building strings, lifts in the last 20 seconds", bpm: 72, key: "D minor", holders: 1 },
  { cat: "TV", clip: "tv", track: "Sparse piano over rain ambience", bpm: 84, key: "F major", holders: 2 },
  { cat: "Ads", clip: "ads", track: "Hazy indie guitar, summer evening", bpm: 118, key: "A major", holders: 1 },
  { cat: "Trailers", clip: "trailers", track: "Driving post-rock build, big drums", bpm: 128, key: "E minor", holders: 4 },
  { cat: "Games", clip: "games", track: "Nocturnal synth pulse", bpm: 110, key: "C minor", holders: 1 },
  { cat: "Streaming", clip: "streaming", track: "Warm analogue soul groove, brass stabs", bpm: 96, key: "G minor", holders: 3 },
];
