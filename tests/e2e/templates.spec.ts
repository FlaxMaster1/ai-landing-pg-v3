import { expect, test } from "../support/playwright";

const routes = [
  ["/", "homepage"],
  ["/catalog/", "standard"],
  ["/academics/", "landing"],
  ["/insights/structured-content/", "article"],
  ["/events/", "topic"],
  ["/people/", "directory"],
  ["/search/", "search"],
  ["/resources/", "sidebar"]
] as const;

for (const [route, template] of routes) {
  test(`${template} renders as static semantic HTML`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator(`main[data-template='${template}']`)).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("header.g-global-header")).toBeVisible();
    await expect(page.locator("footer.g-global-footer")).toBeVisible();
  });
}
