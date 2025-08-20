import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

test.describe("Invalid login flow", () => {
	test("should show error for invalid credentials", async ({ page }) => {
		const home = new HomePage(page);
		const login = new LoginPage(page);

		await home.goto();
		await home.maybeValidateAndCloseWelcomePopup();

		await home.clickLoginHeader();
		await login.login("invalid@example.com", "invalid-password");
		await login.expectErrorVisible();
	});
});
