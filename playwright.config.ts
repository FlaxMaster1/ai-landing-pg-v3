import { defineConfig } from "@playwright/test";

const hostedBaseURL = process.env.SITES_BASE_URL;
const sitesBearerToken = process.env.SITES_BEARER_TOKEN;

export default defineConfig({
  testDir: "./tests",
  testMatch: ["e2e/**/*.spec.ts", "accessibility/**/*.spec.ts", "visual/**/*.spec.ts"],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  expect: { timeout: 5_000 },
  use: {
    baseURL: hostedBaseURL ?? "http://127.0.0.1:4321",
    browserName: "chromium",
    extraHTTPHeaders: sitesBearerToken
      ? { "OAI-Sites-Authorization": `Bearer ${sitesBearerToken}` }
      : undefined,
    trace: "retain-on-failure"
  },
  projects: [
    { name: "chromium-desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "chromium-mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }
  ],
  webServer: hostedBaseURL
    ? undefined
    : {
        command: "npm run preview -- --host 127.0.0.1",
        url: "http://127.0.0.1:4321",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000
      }
});
