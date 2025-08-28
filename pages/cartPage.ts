import { Page, Locator } from "@playwright/test";

export class CartPage {
	readonly page: Page;
	readonly emptyHeading: Locator;
	readonly recommendedFirstProduct: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emptyHeading = page.getByRole("heading", {
			name: "Your Shopping Cart is empty",
		});
		this.recommendedFirstProduct = page
			.getByRole("link", { name: /Devon 7 Jones/ })
			.first();
	}

	async goto(): Promise<void> {
		await this.page.goto("/cart");
	}

	async openFirstRecommendedProduct(): Promise<void> {
		await this.recommendedFirstProduct.click();
	}
}
