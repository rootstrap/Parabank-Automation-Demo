import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { SignUpPage } from "../pages/signUpPage";
import { HeaderFooter } from "../pages/headerFooter";
import { TestDataFactory } from "../src/utils/test-data-factory";
import { UserRegistrationData } from "../src/types/test-data";

test.describe("Core storefront flows", () => {
	test("should complete full user journey: signup, login, explore homepage, and header/footer links", async ({
		page,
		browser,
	}) => {
		// Arrange - Setup test data and page objects
		const home = new HomePage(page);
		const signup = new SignUpPage(page);
		const headerFooter = new HeaderFooter(page);
		const userData: UserRegistrationData =
			TestDataFactory.generateUserRegistrationData();

		// Act - Perform the user journey
		// Step 1: Explore homepage and handle welcome popup
		await home.goto();
		await home.maybeValidateAndCloseWelcomePopup();
		await home.expectHomeLoaded();

		// Step 2: Sign up a new user
		await signup.goto();
		await signup.register(
			userData.firstName,
			userData.lastName,
			userData.email,
			userData.password
		);

		// Step 3: Verify homepage and explore header/footer links
		await headerFooter.openHome();
		await home.expectHomeLoaded();
		await headerFooter.exploreFooter();

		// Step 4: Login flow in a fresh guest context
		const context = await browser.newContext();
		const page2 = await context.newPage();
		const home2 = new HomePage(page2);
		const login2 = new LoginPage(page2);
		const headerFooter2 = new HeaderFooter(page2);

		await home2.goto();
		await home2.maybeValidateAndCloseWelcomePopup();
		await home2.clickLoginHeader();
		await login2.login(userData.email, userData.password);
		await headerFooter2.openHome();
		await home2.expectHomeLoaded();

		// Cleanup
		await context.close();
	});
});
