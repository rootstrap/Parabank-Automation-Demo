import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
	readonly page: Page;
	readonly addToCartButton: Locator;
	readonly categoriesLabel: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addToCartButton = page.getByRole("button", { name: /add to cart/i });
		this.categoriesLabel = page.getByText("Categories").first();
	}

	async expectLoaded(): Promise<void> {
		await expect(this.page).toHaveURL(/\/shop\//);
		await expect(this.categoriesLabel).toBeVisible();
	}

	async addToCart(): Promise<void> {
		const visible = await this.addToCartButton.isVisible().catch(() => false);
		if (visible) {
			await this.addToCartButton.click();
		}
	}
}
