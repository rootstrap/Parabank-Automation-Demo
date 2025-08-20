import { expect, Page, Locator } from "@playwright/test";

export class HomePage {
	readonly page: Page;
	readonly welcomeText: Locator;
	readonly startShoppingButton: Locator;
	readonly loginLink: Locator;
	readonly newFavoritesHeading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.welcomeText = page.getByText("Welcome to Our Page!").first();
		this.startShoppingButton = page.getByRole("button", { name: "Start Shopping", exact: true });
		this.loginLink = page.getByRole("link", { name: "Log in" });
		this.newFavoritesHeading = page.getByRole("heading", { name: "New Favorites" });
	}

	async goto(): Promise<void> {
		await this.page.goto("/");
	}

	async expectWelcomePopupVisible(): Promise<void> {
		await expect(this.startShoppingButton).toBeVisible({ timeout: 15000 });
		await expect(this.welcomeText).toBeVisible();
	}

	async clickStartShopping(): Promise<void> {
		await this.startShoppingButton.click();
		await expect(this.startShoppingButton).toBeHidden({ timeout: 10000 });
	}

	async maybeValidateAndCloseWelcomePopup(): Promise<void> {
		const isVisible = await this.startShoppingButton.isVisible().catch(() => false);
		if (isVisible) {
			await this.expectWelcomePopupVisible();
			await this.clickStartShopping();
		}
	}

	async clickLoginHeader(): Promise<void> {
		const visible = await this.loginLink.isVisible().catch(() => false);
		if (visible) {
			await this.loginLink.click();
			return;
		}
		await this.page.goto("/login");
	}

	async expectHomeLoaded(): Promise<void> {
		await expect(this.newFavoritesHeading).toBeVisible();
	}
}
