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
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.locator("img").evaluateAll((images) => {
      for (const image of images) (image as HTMLImageElement).loading = "eager";
    });
    await expect.poll(
      () =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)
          )
    ).toBe(true);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true, animations: "disabled" });
  });
}
