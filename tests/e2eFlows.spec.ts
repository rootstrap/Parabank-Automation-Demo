import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { SignUpPage } from "../pages/signUpPage";
import { HeaderFooter } from "../pages/headerFooter";

const uniqueEmail = `test${Date.now()}@example.com`;
const strongPassword = "ValidPa$$w0rd!";

test.describe("Core storefront flows", () => {
	test("signup, login, explore homepage, explore header/footer links", async ({ page, browser }) => {
		const home = new HomePage(page);
		const signup = new SignUpPage(page);
		const headerFooter = new HeaderFooter(page);

		// Explore homepage (with welcome popup handling)
		await home.goto();
		await home.maybeValidateAndCloseWelcomePopup();
		await home.expectHomeLoaded();

		// Sign up a new user
		await signup.goto();
		await signup.register("Test", "User", uniqueEmail, strongPassword);

		// Verify homepage and explore header/footer links
		await headerFooter.openHome();
		await home.expectHomeLoaded();
		await headerFooter.exploreFooter();

		// Login flow in a fresh guest context
		const context = await browser.newContext();
		const page2 = await context.newPage();
		const home2 = new HomePage(page2);
		const login2 = new LoginPage(page2);
		const headerFooter2 = new HeaderFooter(page2);

		await home2.goto();
		await home2.maybeValidateAndCloseWelcomePopup();
		await home2.clickLoginHeader();
		await login2.login(uniqueEmail, strongPassword);
		await headerFooter2.openHome();
		await home2.expectHomeLoaded();

		await context.close();
	});
});
