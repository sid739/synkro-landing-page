// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Canonical URLs, the sitemap and structured data are built from this. Change it if the domain changes.
  site: "https://synkro.com",
  trailingSlash: "always",
  // Styles are built into each page rather than linked: a page a browser kept from an earlier deploy
  // still carries its own styles, instead of asking for stylesheet files that no longer exist.
  build: { format: "directory", inlineStylesheets: "always" },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
