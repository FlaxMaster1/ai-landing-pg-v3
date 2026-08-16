import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { frameworkRegistry } from "../../src/registry/framework-elements";

describe("machine-readable framework registry", () => {
  it("provides complete metadata and unique IDs", () => {
    expect(new Set(frameworkRegistry.map(({ id }) => id)).size).toBe(frameworkRegistry.length);
    for (const entry of frameworkRegistry) {
      expect(entry.id).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(entry.source).toBeTruthy();
      expect(entry.purpose).toBeTruthy();
      expect(entry.relationships).toBeTruthy();
      expect(entry.usage.accessibilityRequirements).toBeInstanceOf(Array);
      expect(entry.usage.responsiveIntent).toBeTruthy();
      expect(entry.traceability.cmsSource).toBeTruthy();
      expect(entry.traceability.figmaMappings).toBeInstanceOf(Array);
      expect(entry.traceability.futureWordPressMapping).toBeTruthy();
    }
  });

  it("registers every public shared Astro element", () => {
    const categories = [
      ["components", "component"],
      ["patterns", "pattern"],
      ["global", "global"],
      ["templates", "template"],
      ["utilities", "utility"]
    ] as const;
    for (const [folder, category] of categories) {
      const publicNames = readdirSync(path.join(process.cwd(), "src", folder))
        .filter((file) => file.endsWith(".astro") && file !== "BaseTemplate.astro")
        .map((file) => file.replace(".astro", ""));
      const registered = frameworkRegistry.filter((entry) => entry.category === category).map((entry) => entry.name);
      for (const name of publicNames) expect(registered, `${folder}/${name}.astro`).toContain(name);
    }
  });
});
