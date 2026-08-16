import { expect, test } from "@playwright/test";

test("tabs support selection and arrow-key movement", async ({ page }) => {
  await page.goto("/academics/");
  const tabs = page.getByRole("tab");
  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[role='tabpanel']").nth(1)).toBeVisible();
  await page.keyboard.press("End");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});

test("native FAQ disclosure exposes content", async ({ page }) => {
  await page.goto("/catalog/");
  const disclosure = page.locator("details").filter({ hasText: "Why use details and summary?" });
  await expect(disclosure).not.toHaveAttribute("open");
  await disclosure.locator("summary").click();
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(disclosure.getByText(/Native disclosure semantics/)).toBeVisible();
});

test("prototype form validates locally and reports success", async ({ page }) => {
  await page.goto("/catalog/");
  await page.getByLabel("Name *").fill("Reference Reviewer");
  await page.getByLabel("Email *").fill("reviewer@example.invalid");
  await page.getByRole("button", { name: "Test the form" }).click();
  await expect(page.getByRole("status")).toContainText("recorded no personal data");
});

test("global search uses meaningful URL state", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search this reference site" }).click();
  const dialog = page.getByRole("dialog", { name: "Search this reference site" });
  await dialog.getByRole("searchbox").fill("accessibility");
  await dialog.getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/search\/\?q=accessibility$/);
});

test("mobile drill-down navigation manages state and focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile navigation applies below the shared navigation breakpoint");
  const trigger = page.getByRole("button", { name: "Menu" });
  await page.goto("/");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const dialog = page.getByRole("dialog", { name: "Reference site navigation" });
  await dialog.getByRole("button", { name: "Explore" }).click();
  await expect(dialog.getByRole("link", { name: "Landing template" })).toBeVisible();
  await dialog.getByRole("button", { name: "Back" }).click();
  await expect(dialog.getByRole("button", { name: "Explore" })).toBeFocused();
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(trigger).toBeFocused();
});
