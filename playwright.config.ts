import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  retries: 0,
  projects: [
    {
      name: "sandbox",
      use: {
        baseURL: process.env.BASE_URL || "https://tienda1.qa.e-lead-dev.com/",
        storageState: "./.auth/user.json",
        headless: false,
        channel: "chrome",
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: "retain-on-failure",
        screenshot: "only-on-failure",
        trace: "on-first-retry",
      },
    },
  ],
});
