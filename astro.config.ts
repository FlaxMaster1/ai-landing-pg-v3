import cloudflare from "@astrojs/cloudflare";
import { sites } from "@openai/sites-vite-plugin";
import { defineConfig } from "astro/config";

const isSitesBuild = process.env.SITES_BUILD === "true";

export default defineConfig({
  adapter: isSitesBuild ? cloudflare({ prerenderEnvironment: "node" }) : undefined,
  output: isSitesBuild ? "server" : "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  vite: {
    plugins: isSitesBuild ? [sites()] : [],
    define: {
      "import.meta.env.SITE_ID": JSON.stringify(process.env.SITE ?? "reference")
    }
  }
});
