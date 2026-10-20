import type { APIRoute } from "astro";
import { audiences, glossary, homeFaq, site, stats } from "../data/site";

// llms.txt: a plain-text map of the site for AI assistants and answer engines (llmstxt.org).
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is operated by ${site.legalName}. Full launch: ${site.launch}.`,
    "",
    "## Key facts",
    ...stats.map((s) => `- ${s.value} ${s.label} (source: ${s.source})`),
    "",
    "## Pages",
    `- [How it works](${url("/how-it-works/")}): the eight steps of a sync deal on ${site.name}`,
    `- [What is sync licensing?](${url("/sync-licensing/")}): a practical guide to sync licenses, costs and timelines`,
    `- [About](${url("/about/")}): team and company vision`,
    ...audiences.map((a) => `- [${a.name}](${url(`/for/${a.slug}/`)}): ${a.metaDescription}`),
    "",
    "## Glossary",
    ...glossary.map((t) => `- [${t.term}](${url(`/glossary/${t.slug}/`)}): ${t.short}`),
    "",
    "## FAQ",
    ...homeFaq.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
