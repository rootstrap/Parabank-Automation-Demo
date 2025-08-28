import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { TestDataFactory } from "../src/utils/test-data-factory";

test.describe("Invalid login flow", () => {
	test("should show error for invalid credentials", async ({ page }) => {
		// Arrange - Setup page objects and test data
		const home = new HomePage(page);
		const login = new LoginPage(page);
		const invalidCredentials = TestDataFactory.generateInvalidLoginData();

		// Act - Navigate to login and attempt invalid login
		await home.goto();
		await home.maybeValidateAndCloseWelcomePopup();
		await home.clickLoginHeader();
		await login.login(invalidCredentials.email, invalidCredentials.password);

		// Assert - Verify error message is displayed
		await login.expectErrorVisible();
	});
});
