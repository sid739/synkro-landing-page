import { clearanceFeatures, discoveryFeatures, site } from "./site";

// Props for the two platform sections, shared by the homepage and How it works.
export const discovery = {
  id: "discovery",
  part: "Part 01 · Discovery engine",
  title: "Search the catalog.",
  accent: "Know what you can clear.",
  lede: `Ingest catalogs, search by brief or reference, resolve ownership shares and request a license for any song, all inside your project workspace.`,
  features: discoveryFeatures,
};

export const clearance = {
  id: "clearance",
  part: "Part 02 · Clearance workspace",
  title: "Every rights holder.",
  accent: "One deal room.",
  lede: `Bring master owners and publishers into one secure deal room to align splits, counter terms, redline contracts and sign binding licenses, with ${site.name} handling payment and delivery.`,
  features: clearanceFeatures,
  tone: "ink" as const,
};
