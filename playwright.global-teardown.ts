import { sharedBrowser, sharedContext } from './playwright.global-setup';

async function globalTeardown() {
	if (sharedContext) {
		await sharedContext.close();
	}
	if (sharedBrowser) {
		await sharedBrowser.close();
	}
}

export default globalTeardown;
