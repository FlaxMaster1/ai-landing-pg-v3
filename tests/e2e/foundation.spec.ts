import { expect, test } from "@playwright/test";

test("design tokens and typography resolve", async ({ page }) => {
  await page.goto("/");
  const styles = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const heading = getComputedStyle(document.querySelector("h1")!);
    return {
      brand: root.getPropertyValue("--surface-brand-primary").trim(),
      focus: root.getPropertyValue("--focus-color").trim(),
      sans: root.getPropertyValue("--font-family-sans").trim(),
      bodyFont: root.fontFamily,
      headingFont: heading.fontFamily
    };
  });

  expect(styles.brand).toBe("#001f5b");
  expect(styles.focus).toBe("#f2c14e");
  expect(styles.sans).toContain("Arial");
  expect(styles.bodyFont).toContain("Arial");
  expect(styles.headingFont).toContain("Georgia");
});

test("configured images and shared assets load", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("img").count()).toBeGreaterThanOrEqual(3);
  for (const image of await page.locator("img").all()) {
    await expect(image).toHaveJSProperty("complete", true);
    expect(await image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }

  const logoResponse = await page.request.get("/shared/logos/framework-mark.svg");
  expect(logoResponse.ok()).toBe(true);
  expect(logoResponse.headers()["content-type"]).toContain("image/svg+xml");
});

test("global navigation and footer links route successfully", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Component catalog" }).click();
  await expect(page).toHaveURL(/\/catalog\/$/);
  await expect(page.locator("main[data-template='standard']")).toBeVisible();

  await page.getByRole("link", { name: "Privacy" }).click();
  await expect(page).toHaveURL(/\/resources\/#privacy$/);
  await expect(page.locator("#privacy")).toBeVisible();
});
