import { describe, expect, it } from "vitest";
import { loadSite } from "@rendering/site-loader";
import { eventSchema, pageSchema } from "@schemas/index";

describe("validated site content", () => {
  it("loads the reference site, routes, entities, and assets", () => {
    const site = loadSite("reference");
    expect(site.pages).toHaveLength(8);
    expect(site.assets).toHaveLength(4);
    expect(site.entities.stories).toHaveLength(3);
    expect(site.config.theme).toBe("old-theme");
    expect(site.config.institutionalBrand?.headerLogo.src).toMatch(/^https:\/\/martechdev\.wharton\.upenn\.edu\//);
    expect(site.navigation.program.find(({ label }) => label === "Knowledge at Wharton")?.logo).toEqual({
      src: "/shared/logos/kw-logo.svg",
      width: 313,
      height: 25
    });
    expect(site.pages.map(({ template }) => template)).toEqual(expect.arrayContaining([
      "homepage", "standard", "landing", "article", "topic", "directory", "search", "sidebar"
    ]));
  });

  it("rejects unknown section types", () => {
    const result = pageSchema.safeParse({ route: "/bad/", template: "standard", title: "Bad", sections: [{ type: "invented", id: "bad" }] });
    expect(result.success).toBe(false);
  });

  it("enforces exactly one configured H1 owner", () => {
    const missingHero = pageSchema.safeParse({ route: "/bad/", template: "landing", title: "Bad", titleMode: "hero", sections: [] });
    const competingHero = pageSchema.safeParse({ route: "/bad/", template: "landing", title: "Bad", titleMode: "default", sections: [{ type: "hero", id: "hero", heading: "Hero" }] });
    expect(missingHero.success).toBe(false);
    expect(competingHero.success).toBe(false);
  });

  it("rejects malformed event dates", () => {
    expect(eventSchema.safeParse({ id: "bad", title: "Bad", url: "/", start: "tomorrow" }).success).toBe(false);
  });
});
