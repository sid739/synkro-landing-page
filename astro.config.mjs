// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Canonical URLs, the sitemap and structured data are built from this. Change it if the domain changes.
  site: "https://synkro.com",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
