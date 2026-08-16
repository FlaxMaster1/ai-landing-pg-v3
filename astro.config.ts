import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  vite: {
    define: {
      "import.meta.env.SITE_ID": JSON.stringify(process.env.SITE ?? "reference")
    }
  }
});
