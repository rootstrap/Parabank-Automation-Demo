import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test.describe("HomePage functionality", () => {
	test("should load homepage and display welcome popup", async ({ page }) => {
		// Arrange - Setup page object
		const homePage = new HomePage(page);

		// Act - Navigate to homepage
		await homePage.goto();

		// Assert - Verify homepage loads and welcome popup is visible
		await homePage.expectWelcomePopupVisible();
	});

	test("should close welcome popup when start shopping is clicked", async ({
		page,
	}) => {
		// Arrange - Setup page object and navigate to homepage
		const homePage = new HomePage(page);
		await homePage.goto();

		// Act - Close the welcome popup
		await homePage.clickStartShopping();

		// Assert - Verify popup is hidden and homepage is loaded
		await homePage.expectHomeLoaded();
	});

	test("should handle welcome popup gracefully when not present", async ({
		page,
	}) => {
		// Arrange - Setup page object
		const homePage = new HomePage(page);

		// Act - Navigate to homepage and attempt to handle popup
		await homePage.goto();
		await homePage.maybeValidateAndCloseWelcomePopup();

		// Assert - Verify homepage loads successfully regardless of popup state
		await homePage.expectHomeLoaded();
	});

	test("should navigate to login page when login header is clicked", async ({
		page,
	}) => {
		// Arrange - Setup page object
		const homePage = new HomePage(page);
		await homePage.goto();

		// Act - Handle popup and click login header
		await homePage.maybeValidateAndCloseWelcomePopup();
		await homePage.clickLoginHeader();

		// Assert - Verify navigation to login page
		await expect(page).toHaveURL(/.*\/login/);
	});
});
