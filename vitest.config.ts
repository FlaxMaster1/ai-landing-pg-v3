import { getViteConfig } from "astro/config";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

const config = defineConfig({
  resolve: {
    alias: {
      "@components": `${root}src/components`,
      "@entities": `${root}src/entities`,
      "@global": `${root}src/global`,
      "@integrations": `${root}src/integrations`,
      "@patterns": `${root}src/patterns`,
      "@rendering": `${root}src/rendering`,
      "@schemas": `${root}src/schemas`,
      "@templates": `${root}src/templates`,
      "@utilities": `${root}src/utilities`
    }
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"]
  }
});

export default getViteConfig(config);
