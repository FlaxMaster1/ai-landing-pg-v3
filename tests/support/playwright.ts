import { expect, test as base } from "@playwright/test";

const hostedOrigin = process.env.SITES_BASE_URL
  ? new URL(process.env.SITES_BASE_URL).origin
  : undefined;

const test = base.extend({
  page: async ({ page }, use) => {
    if (hostedOrigin) {
      await page.route("**/*", async (route) => {
        const request = route.request();
        const requestOrigin = new URL(request.url()).origin;

        if (requestOrigin !== hostedOrigin) {
          const headers = { ...request.headers() };
          delete headers["oai-sites-authorization"];
          await route.continue({ headers });
          return;
        }

        await route.continue();
      });
    }

    await use(page);
  }
});

export { expect, test };
