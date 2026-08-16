import { expect, test } from "../support/playwright";

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

  expect(styles.brand).toBe("#004785");
  expect(styles.focus).toBe("#06aafc");
  expect(styles.sans).toContain("Acumin Pro");
  expect(styles.bodyFont).toContain("Acumin Pro");
  expect(styles.headingFont).toContain("Acumin Pro Condensed Black");
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

  const knowledgeLogoResponse = await page.request.get("/shared/logos/kw-logo.svg");
  expect(knowledgeLogoResponse.ok()).toBe(true);
  expect(knowledgeLogoResponse.headers()["content-type"]).toContain("image/svg+xml");
});

test("global navigation and footer links route successfully", async ({ page }) => {
  await page.goto("/");
  const catalogLink = page.getByRole("link", { name: "Catalog", exact: true });
  if (!(await catalogLink.isVisible())) {
    await page.getByRole("button", { name: "Menu" }).click();
  }
  await catalogLink.click();
  await expect(page).toHaveURL(/\/catalog\/$/);
  await expect(page.locator("main[data-template='standard']")).toBeVisible();

  await page.getByText("Additional Links", { exact: true }).click();
  await page.getByRole("link", { name: "Placeholder privacy" }).click();
  await expect(page).toHaveURL(/\/resources\/#privacy$/);
  await expect(page.locator("#privacy")).toBeVisible();
});
