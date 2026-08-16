import { expect, test } from "@playwright/test";

for (const route of ["/", "/academics/", "/catalog/", "/people/"]) {
  test(`${route} does not overflow the viewport`, async ({ page }) => {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
