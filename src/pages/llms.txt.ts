import type { APIRoute } from "astro";
import { catalogStats, glossary, homeFaq, site, steps } from "../data/site";

// llms.txt: a plain-text map of the site for AI assistants and answer engines (llmstxt.org).
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href;
  const stat = (s: (typeof catalogStats)[number]) => s.text ?? `${s.value!.toLocaleString("en-US")}${s.suffix ?? ""}`;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is operated by ${site.legalName}.`,
    "",
    "## Catalog",
    ...catalogStats.map((s) => `- ${s.label}: ${stat(s)} ${s.body}`),
    "",
    "## How a license works on Synkro",
    ...steps.map((s) => `${Number(s.n)}. ${s.title} (${s.feature}, ${s.badge.toLowerCase()}): ${s.body}`),
    "",
    "## Pages",
    `- [Home](${url("/")})`,
    `- [How it works](${url("/how-it-works/")})`,
    `- [What is sync licensing?](${url("/sync-licensing/")}): a practical guide to sync licenses`,
    `- [Glossary](${url("/glossary/")}): music licensing terms in plain English`,
    ...glossary.map((t) => `  - [${t.term}](${url(`/glossary/${t.slug}/`)}): ${t.short}`),
    "",
    "## FAQ",
    ...homeFaq.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    `Contact: ${site.email}`,
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
