import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("design token artifacts", () => {
  it("retain DTCG type/value properties and generated semantic CSS aliases", () => {
    const primitive = JSON.parse(readFileSync(path.join(process.cwd(), "src/tokens/primitive/color.tokens.json"), "utf8"));
    const semantic = JSON.parse(readFileSync(path.join(process.cwd(), "src/tokens/semantic/core.tokens.json"), "utf8"));
    const generated = readFileSync(path.join(process.cwd(), "src/tokens/generated/tokens.css"), "utf8");
    expect(primitive.color.red["700"]).toEqual({ $type: "color", $value: "#a90533" });
    expect(semantic.surface.brandPrimary.$value).toBe("{color.blue.700}");
    expect(generated).toContain("--surface-brand-primary: var(--color-blue-700)");
  });
});
