import { expect, Page, Locator } from "@playwright/test";
import { TIMEOUTS, ERROR_MESSAGES } from "../src/constants/timeouts";

/**
 * LoginPage class representing the login functionality
 * Following the rule: Each function, module, or class should focus on a single concern
 */
export class LoginPage {
	readonly page: Page;
	readonly loginTab: Locator;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loginTab = page.getByRole("tab", { name: "Log in" });
		this.emailInput = page.getByRole("textbox", { name: "Email" });
		this.passwordInput = page.getByRole("textbox", { name: "Password" });
		this.loginButton = page.getByRole("button", { name: "Log in" });
		this.errorMessage = page.getByText(ERROR_MESSAGES.INVALID_LOGIN);
	}

	async goto(): Promise<void> {
		await this.page.goto("/login");
	}

	/**
	 * Performs login with provided credentials
	 * @param email - User's email address
	 * @param password - User's password
	 * @throws {Error} When login elements are not found within timeout
	 */
	async login(email: string, password: string): Promise<void> {
		await this.page.goto("/login", { waitUntil: "domcontentloaded" });
		await expect(this.loginTab).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
		await this.loginTab.click();
		await expect(this.emailInput).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
		await expect(this.passwordInput).toBeVisible();
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}

	async expectErrorVisible(): Promise<void> {
		await expect(this.errorMessage).toBeVisible();
	}
}
