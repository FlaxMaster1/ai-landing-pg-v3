import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["e2e/**/*.spec.ts", "accessibility/**/*.spec.ts", "visual/**/*.spec.ts"],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://127.0.0.1:4321",
    browserName: "chromium",
    trace: "retain-on-failure"
  },
  projects: [
    { name: "chromium-desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "chromium-mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
