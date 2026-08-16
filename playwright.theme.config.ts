import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/development",
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4322",
    browserName: "chromium",
    viewport: { width: 1440, height: 900 }
  },
  webServer: {
    command: "ASTRO_DEV_BACKGROUND=0 npm run dev:reference -- --host 127.0.0.1 --port 4322",
    url: "http://127.0.0.1:4322",
    reuseExistingServer: false,
    timeout: 30_000
  }
});
