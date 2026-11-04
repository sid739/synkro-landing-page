// The long-form guides, in reading order. The guide layout links each one to the others, and the
// footer and llms.txt list them.
export type Guide = { path: string; title: string; short: string };

export const guides: Guide[] = [
  { path: "/sync-licensing/", title: "What is sync licensing?", short: "What a sync license is, what it covers and how to get one." },
  { path: "/sync-licensing-cost/", title: "How much does it cost to license a song?", short: "Typical sync fees by media, what drives them and how to pay less." },
  { path: "/master-vs-publishing-rights/", title: "Master vs publishing rights", short: "The two copyrights in every song, who owns them and why you need both." },
];
