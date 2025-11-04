import { chromium, Browser, BrowserContext } from '@playwright/test';

// Export shared browser and context that will be used across all tests
export let sharedBrowser: Browser;
export let sharedContext: BrowserContext;

async function globalSetup() {
	// Create a single browser instance
	sharedBrowser = await chromium.launch({
		headless: false,
		channel: 'chrome',
	});

	// Create a single browser context
	sharedContext = await sharedBrowser.newContext({
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
	});
}

export default globalSetup;
