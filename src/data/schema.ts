import { site, type Faq } from "./site";

export const breadcrumbLd = (crumbs: { name: string; href: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", href: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: new URL(c.href, site.url).href,
  })),
});

export const faqLd = (items: Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const softwareLd = () => ({
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: site.description,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` },
});
