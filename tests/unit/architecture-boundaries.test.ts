import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const location = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(location) : [location];
  });
}

describe("framework and site boundaries", () => {
  it("keeps shared presentation independent from concrete sites", () => {
    const sharedRoots = ["components", "patterns", "global", "templates"].map((folder) => path.join(process.cwd(), "src", folder));
    for (const file of sharedRoots.flatMap(filesBelow)) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/sites\/(reference|undergraduate)/);
      expect(source, file).not.toContain("Framework Reference");
    }
  });

  it("does not introduce a forbidden client framework or styling dependency", () => {
    const manifest = JSON.parse(readFileSync(path.join(process.cwd(), "package.json"), "utf8"));
    const dependencies = { ...manifest.dependencies, ...manifest.devDependencies };
    for (const forbidden of ["react", "vue", "svelte", "tailwindcss", "bootstrap", "redux", "zustand", "storybook", "styled-components"]) {
      expect(dependencies).not.toHaveProperty(forbidden);
    }
  });
});
