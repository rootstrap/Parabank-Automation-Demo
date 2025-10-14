import { expect, Page, Locator } from "@playwright/test";
import { TIMEOUTS } from "../src/constants/timeouts";
import { logger } from "../src/utils/logger";

/**
 * HomePage class representing the main homepage of the application
 * Following the rule: Each function, module, or class should focus on a single concern
 */
export class HomePage {
	readonly page: Page;
	readonly welcomeText: Locator;
	readonly startShoppingButton: Locator;
	readonly loginLink: Locator;
	readonly newFavoritesHeading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.welcomeText = page.getByText("Welcome to Our Page!").first();
		this.startShoppingButton = page.getByRole("button", {
			name: "Start Shopping",
			exact: true,
		});
		this.loginLink = page.getByRole("link", { name: "Log in" });
		this.newFavoritesHeading = page.getByRole("heading", {
			name: "New Favorites",
		});
	}

	async goto(): Promise<void> {
		await this.page.goto("/");
	}

	/**
	 * Expects the welcome popup to be visible
	 * @throws {Error} When popup elements are not found within timeout
	 */
	async expectWelcomePopupVisible(): Promise<void> {
		await expect(this.startShoppingButton).toBeVisible({
			timeout: TIMEOUTS.LONG,
		});
		await expect(this.welcomeText).toBeVisible();
	}

	/**
	 * Clicks the start shopping button and waits for it to be hidden
	 * @throws {Error} When button is not hidden within timeout
	 */
	async clickStartShopping(): Promise<void> {
		await this.startShoppingButton.click();
		await expect(this.startShoppingButton).toBeHidden({
			timeout: TIMEOUTS.MEDIUM,
		});
	}

	/**
	 * Conditionally validates and closes the welcome popup if it's visible
	 * Following the rule: Implement proper error handling in async functions
	 */
	async maybeValidateAndCloseWelcomePopup(): Promise<void> {
		try {
			const isVisible = await this.startShoppingButton.isVisible();
			if (isVisible) {
				await this.expectWelcomePopupVisible();
				await this.clickStartShopping();
			}
		} catch (error) {
			// Log error but don't fail the test for popup handling
			logger.warn("Welcome popup handling failed", {
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	/**
	 * Clicks the login header link or navigates to login page
	 * Following the rule: Implement proper error handling in async functions
	 */
	async clickLoginHeader(): Promise<void> {
		try {
			const visible = await this.loginLink.isVisible();
			if (visible) {
				await this.loginLink.click();
				return;
			}
		} catch (error) {
			logger.warn("Login link not visible, navigating directly", {
				error: error instanceof Error ? error.message : String(error),
			});
		}
		await this.page.goto("/login");
	}

	async expectHomeLoaded(): Promise<void> {
		await expect(this.newFavoritesHeading).toBeVisible();
	}
}
