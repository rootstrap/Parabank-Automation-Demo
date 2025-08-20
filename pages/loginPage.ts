import { expect, Page, Locator } from "@playwright/test";

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
		this.errorMessage = page.getByText("Invalid login credentials. Please try again.");
	}

	async goto(): Promise<void> {
		await this.page.goto("/login");
	}

	async login(email: string, password: string): Promise<void> {
		await this.page.goto("/login", { waitUntil: "domcontentloaded" });
		await expect(this.loginTab).toBeVisible({ timeout: 10000 });
		await this.loginTab.click();
		await expect(this.emailInput).toBeVisible({ timeout: 10000 });
		await expect(this.passwordInput).toBeVisible();
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}

	async expectErrorVisible(): Promise<void> {
		await expect(this.errorMessage).toBeVisible();
	}
}
