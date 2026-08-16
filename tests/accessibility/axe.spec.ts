import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../support/playwright";

const routes = ["/", "/catalog/", "/academics/", "/insights/structured-content/", "/events/", "/people/", "/search/", "/resources/"];

for (const route of routes) {
  test(`${route} has no automated WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}
