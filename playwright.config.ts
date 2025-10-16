import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	timeout: 30 * 1000,
	retries: 0,
	workers: 1, // Run tests sequentially to maintain single browser session
	projects: [
		{
			name: "sandbox",
			use: {
				baseURL:
					process.env["BASE_URL"] || "https://parabank.parasoft.com/parabank/index.htm",
				headless: false,
				channel: "chrome",
				viewport: { width: 1280, height: 720 },
				ignoreHTTPSErrors: true,
				video: "on",
				screenshot: "on",
				trace: "on-first-retry",
			},
		},
	],
});
