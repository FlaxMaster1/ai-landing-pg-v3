import { expect, test } from "../support/playwright";

test("current theme preserves observed Wharton shell and layout measurements", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(async () => { await document.fonts.ready; });

  const requiredFonts = [
    "Acumin Pro",
    "Acumin Pro Bold",
    "Acumin Pro Black",
    "Acumin Pro Condensed",
    "Acumin Pro Condensed Bold",
    "Acumin Pro Condensed Black",
    "Minion Pro"
  ];
  const fontStatuses = await page.evaluate((families) =>
    families.map((family) => ({
      family,
      status: [...document.fonts].find((font) => font.family === family)?.status
    })), requiredFonts);
  expect(fontStatuses).toEqual(requiredFonts.map((family) => ({ family, status: "loaded" })));

  const values = await page.evaluate(() => {
    const box = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
    const root = getComputedStyle(document.documentElement);
    const card = getComputedStyle(document.querySelector(".c-card")!);
    return {
      theme: document.documentElement.dataset.siteTheme,
      programHeight: box(".g-global-header__program").height,
      siteHeaderHeight: box(".g-site-header").height,
      heroWidth: box(".p-hero").width,
      heroHeight: box(".p-hero").height,
      contentToken: root.getPropertyValue("--size-content").trim(),
      navigationToken: root.getPropertyValue("--breakpoint-navigation").trim(),
      cardRadius: card.borderRadius,
      cardShadow: card.boxShadow
    };
  });

  expect(values.theme).toBe("current");
  expect(values.programHeight).toBe(50);
  expect(values.contentToken).toBe("76.5625rem");
  expect(values.navigationToken).toBe("62rem");
  expect(values.cardRadius).toBe("0px");
  expect(values.cardShadow).toBe("none");

  if (testInfo.project.name === "chromium-desktop") {
    expect(values.siteHeaderHeight).toBe(132);
    expect(values.heroWidth).toBe(1440);
    expect(values.heroHeight).toBe(580);
    const knowledgeLink = page.getByRole("link", { name: "Knowledge at Wharton" });
    await expect(knowledgeLink).toBeVisible();
    await expect(knowledgeLink.locator("img")).toHaveAttribute("src", "/shared/logos/kw-logo.svg");
  } else {
    expect(values.siteHeaderHeight).toBe(70);
    expect(values.heroWidth).toBe(390);
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  }
});

test("current theme applies observed Wharton form and tab treatments", async ({ page }) => {
  await page.goto("/catalog/");
  const form = await page.locator(".c-form-control input").first().evaluate((input) => {
    const style = getComputedStyle(input);
    return { height: input.getBoundingClientRect().height, borderWidth: style.borderTopWidth, radius: style.borderRadius };
  });
  expect(form).toEqual({ height: 42, borderWidth: "3px", radius: "0px" });

  await page.goto("/academics/");
  const tab = page.getByRole("tab").first();
  await expect(tab).toHaveCSS("font-family", /Acumin Pro/);
  await expect(tab).toHaveCSS("background-color", "rgb(250, 250, 250)");
});

test("desktop global search uses the supplied normal and rollover artwork", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "The supplied artwork is specific to the desktop white program bar.");

  await page.goto("/");
  const search = page.getByRole("button", { name: "Search" });
  const normalState = await search.evaluate((element) => getComputedStyle(element).backgroundImage);

  await search.hover();
  const rolloverState = await search.evaluate((element) => getComputedStyle(element).backgroundImage);

  expect(normalState).toContain("data:image/png;base64,");
  expect(rolloverState).toContain("data:image/png;base64,");
  expect(rolloverState).not.toBe(normalState);
});
