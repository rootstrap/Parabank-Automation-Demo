import { expect, Page, Locator } from "@playwright/test";

export class SignUpPage {
	readonly page: Page;
	readonly signUpTab: Locator;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly confirmPasswordInput: Locator;
	readonly registerButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.signUpTab = page.getByRole("tab", { name: "Sign Up" });
		this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
		this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
		this.emailInput = page.getByRole("textbox", { name: "Email" });
		this.passwordInput = page.getByRole("textbox", { name: "Password", exact: true });
		this.confirmPasswordInput = page.getByRole("textbox", { name: "Confirm Password" });
		this.registerButton = page.getByRole("button", { name: "Register" });
	}

	async goto(): Promise<void> {
		await this.page.goto("/login");
	}

	async openTab(): Promise<void> {
		await this.signUpTab.click();
	}

	async register(firstName: string, lastName: string, email: string, password: string): Promise<void> {
		await this.openTab();
		await expect(this.firstNameInput).toBeVisible();
		await this.firstNameInput.fill(firstName);
		await this.lastNameInput.fill(lastName);
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.confirmPasswordInput.fill(password);
		await this.registerButton.click();
	}
}
