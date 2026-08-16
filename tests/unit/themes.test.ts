import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { DEFAULT_THEME, isThemeId, resolveTheme, themeIds } from "@themes/contracts";
import { resolveThemeDefinition, themeRegistry } from "../../src/themes";
import { siteConfigSchema } from "@schemas/site";

describe("framework theme contract", () => {
  it("registers the two approved theme IDs with old-theme as the fallback", () => {
    expect(themeIds).toEqual(["old-theme", "new-theme"]);
    expect(DEFAULT_THEME).toBe("old-theme");
    expect(resolveTheme(undefined)).toBe("old-theme");
    expect(resolveTheme("unregistered-theme")).toBe("old-theme");
  });

  it("accepts only configured theme IDs and defaults missing configuration", () => {
    expect(siteConfigSchema.shape.theme.parse(undefined)).toBe("old-theme");
    expect(siteConfigSchema.shape.theme.parse("new-theme")).toBe("new-theme");
    expect(siteConfigSchema.shape.theme.safeParse("current").success).toBe(false);
    expect(isThemeId("old-theme")).toBe(true);
    expect(isThemeId("current")).toBe(false);
  });

  it("registers one stylesheet entry per theme without pretending the scaffold is implemented", () => {
    expect(themeRegistry["old-theme"].status).toBe("implemented");
    expect(themeRegistry["new-theme"].status).toBe("scaffold");
    expect(existsSync(path.join(process.cwd(), "src/themes/old-theme/index.css"))).toBe(true);
    expect(existsSync(path.join(process.cwd(), "src/themes/new-theme/index.css"))).toBe(true);
    expect(resolveThemeDefinition("missing").id).toBe("old-theme");
  });
});
