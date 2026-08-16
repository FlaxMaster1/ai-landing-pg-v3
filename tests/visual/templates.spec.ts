import { expect, test } from "@playwright/test";

const templates = [
  ["/", "homepage"],
  ["/catalog/", "standard"],
  ["/academics/", "landing"],
  ["/insights/structured-content/", "article"],
  ["/events/", "topic"],
  ["/people/", "directory"],
  ["/search/", "search"],
  ["/resources/", "sidebar"]
] as const;

for (const [route, name] of templates) {
  test(`${name} visual baseline`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true, animations: "disabled" });
  });
}
