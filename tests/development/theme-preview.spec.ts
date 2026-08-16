import { expect, test } from "@playwright/test";

test("reference pages can switch theme stylesheets without changing composition", async ({ page }) => {
  await page.goto("/catalog/?theme=new-theme");

  const selector = page.getByRole("combobox", { name: "Preview theme" });
  await expect(selector).toBeVisible();
  await expect(selector).toHaveValue("new-theme");
  await expect(page.locator("html")).toHaveAttribute("data-configured-theme", "old-theme");
  await expect(page.locator("html")).toHaveAttribute("data-site-theme", "new-theme");
  await expect(page.getByRole("heading", { name: "Story tiles" })).toBeAttached();

  await selector.selectOption("old-theme");
  await expect(page.locator("html")).toHaveAttribute("data-site-theme", "old-theme");
  await expect(page).toHaveURL(/\/catalog\/$/);
  await expect(page.getByRole("heading", { name: "Story tiles" })).toBeVisible();
});
