import { expect, test } from "../support/playwright";

test("old-theme preserves observed Wharton shell and layout measurements", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("[data-theme-preview]")).toHaveCount(0);
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
      contentWidth: box(".p-section .u-container").width,
      brandOffset: box(".g-global-header__brand").x,
      programCenter: box(".g-global-header__program").y + (box(".g-global-header__program").height / 2),
      knowledgeLogoCenter: box(".g-program-navigation__logo").y + (box(".g-program-navigation__logo").height / 2),
      contentToken: root.getPropertyValue("--size-content").trim(),
      navigationToken: root.getPropertyValue("--breakpoint-navigation").trim(),
      cardRadius: card.borderRadius,
      cardShadow: card.boxShadow
    };
  });

  expect(values.theme).toBe("old-theme");
  expect(values.contentToken).toBe("76.5625rem");
  expect(values.navigationToken).toBe("62rem");
  expect(values.cardRadius).toBe("0px");
  expect(values.cardShadow).toBe("none");

  if (testInfo.project.name === "chromium-desktop") {
    expect(values.programHeight).toBe(50);
    expect(values.siteHeaderHeight).toBe(132);
    expect(values.heroWidth).toBe(1440);
    expect(values.heroHeight).toBe(580);
    expect(values.contentWidth).toBe(1225);
    expect(values.brandOffset).toBe(100);
    expect(values.knowledgeLogoCenter).toBeCloseTo(values.programCenter, 1);
    const knowledgeLink = page.getByRole("link", { name: "Knowledge at Wharton" });
    await expect(knowledgeLink).toBeVisible();
    const knowledgeLogo = knowledgeLink.locator("img");
    await expect(knowledgeLogo).toHaveAttribute("src", "/shared/logos/kw-logo.svg");
    await expect(knowledgeLogo).toHaveCSS("height", "15px");
  } else {
    expect(values.programHeight).toBe(50);
    expect(values.siteHeaderHeight).toBe(93);
    expect(values.heroWidth).toBe(390);
    await expect(page.locator(".g-global-header__brand img")).toHaveCSS("height", "28px");
    await expect(page.getByRole("button", { name: "Search" })).toHaveCSS("width", "36px");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  }
});

test("old-theme applies observed Wharton form and tab treatments", async ({ page }) => {
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

test("catalog uses image-led story tiles", async ({ page }) => {
  await page.goto("/catalog/");
  const section = page.locator("#story-tiles");
  await expect(section.getByRole("heading", { name: "Story tiles" })).toBeVisible();
  const tiles = section.locator(".c-card--promotional");
  await expect(tiles).toHaveCount(3);
  await expect(tiles.locator(".u-responsive-media img")).toHaveCount(3);
  await expect(tiles.first().locator(".c-card__action")).toBeHidden();
  await expect(tiles.first().locator(".c-card__title")).toHaveCSS("font-size", "30px");
  await expect(tiles.first().locator(".c-card__title")).toHaveCSS("line-height", "33px");
  await expect(page.locator(".c-disclosure summary").first()).toHaveCSS("height", "65px");
  await expect(page.locator(".g-global-footer")).toHaveCSS("font-size", "16px");
  await expect(page.locator(".g-global-footer")).toHaveCSS("line-height", "24px");
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
