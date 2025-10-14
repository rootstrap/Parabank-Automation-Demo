import { Page, Locator, expect } from "@playwright/test";

export class OrderHistoryPage {
	readonly page: Page;
	readonly heading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.heading = page.getByRole("heading", { name: /Order History/i });
	}

	async expectVisible(): Promise<void> {
		await expect(this.heading).toBeVisible();
	}
}
