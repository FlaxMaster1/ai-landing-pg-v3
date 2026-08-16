import { describe, expect, it } from "vitest";
import { patternRegistry, resolvePattern } from "@rendering/pattern-registry";
import { templateRegistry, resolveTemplate } from "@rendering/template-registry";
import { findPage, loadSite, resolveAsset } from "@rendering/site-loader";
import { normalizeRoute, routeToSlug } from "@utilities/route";

describe("controlled rendering registries", () => {
  it("resolve every registered section and canonical template", () => {
    for (const type of Object.keys(patternRegistry)) expect(resolvePattern(type as keyof typeof patternRegistry)).toBeTruthy();
    for (const type of Object.keys(templateRegistry)) expect(resolveTemplate(type as keyof typeof templateRegistry)).toBeTruthy();
  });

  it("throws at the rendering boundary for unknown keys", () => {
    expect(() => resolvePattern("unknown" as keyof typeof patternRegistry)).toThrow(/Unknown pattern/);
    expect(() => resolveTemplate("unknown" as keyof typeof templateRegistry)).toThrow(/Unknown template/);
  });
});

describe("routing and assets", () => {
  const site = loadSite("reference");
  it("normalizes routes and creates catch-all slugs", () => {
    expect(normalizeRoute("academics")).toBe("/academics/");
    expect(routeToSlug("/insights/structured-content/")).toBe("insights/structured-content");
    expect(routeToSlug("/")).toBeUndefined();
  });
  it("resolves configured routes and stable asset IDs", () => {
    expect(findPage(site, "/").template).toBe("homepage");
    expect(resolveAsset(site, "abstract-campus").src).toBe("/site-assets/reference/images/abstract-campus.svg");
    expect(() => resolveAsset(site, "missing")).toThrow(/Unknown asset/);
  });
});
