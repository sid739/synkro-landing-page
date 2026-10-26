// "Browse by mood" tiles. Each slug has a still, an MP4 and a WebM loop in public/moods/, built by
// tools/intro-film/make-mood-tiles.sh from the graded category footage.
export type Mood = { slug: string; name: string; sound: string };

export const moods: Mood[] = [
  { slug: "cinematic", name: "Cinematic", sound: "Strings, swells, big drums" },
  { slug: "uplifting", name: "Uplifting", sound: "Claps, guitars, rising choruses" },
  { slug: "late-night", name: "Late night", sound: "Synths, soul, city lights" },
  { slug: "dark-and-tense", name: "Dark & tense", sound: "Pulses, drones, low brass" },
  { slug: "acoustic", name: "Acoustic", sound: "Guitars, keys, real rooms" },
  { slug: "electronic", name: "Electronic", sound: "Beats, bass, neon" },
];
