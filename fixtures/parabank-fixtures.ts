import { test as base, expect, Page } from '@playwright/test';
import { HomePage, RegisterPage, AboutPage, ServicesPage, ContactPage, LookupPage, ErrorPage } from '../pages/parabank';
import { UserCredentials, generateUniqueUserCredentials } from '../src/data/user-credentials';

/**
 * Extended test context with ParaBank page objects
 */
export interface ParaBankTestContext {
	homePage: HomePage;
	registerPage: RegisterPage;
	aboutPage: AboutPage;
	servicesPage: ServicesPage;
	contactPage: ContactPage;
	lookupPage: LookupPage;
	errorPage: ErrorPage;
}

/**
 * Custom test fixture that provides ParaBank page objects
 */
export const test = base.extend<ParaBankTestContext>({
	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page);
		await use(homePage);
	},

	registerPage: async ({ page }, use) => {
		const registerPage = new RegisterPage(page);
		await use(registerPage);
	},

	aboutPage: async ({ page }, use) => {
		const aboutPage = new AboutPage(page);
		await use(aboutPage);
	},

	servicesPage: async ({ page }, use) => {
		const servicesPage = new ServicesPage(page);
		await use(servicesPage);
	},

	contactPage: async ({ page }, use) => {
		const contactPage = new ContactPage(page);
		await use(contactPage);
	},

	lookupPage: async ({ page }, use) => {
		const lookupPage = new LookupPage(page);
		await use(lookupPage);
	},

	errorPage: async ({ page }, use) => {
		const errorPage = new ErrorPage(page);
		await use(errorPage);
	}
});

/**
 * Helper function to generate unique test user
 */
export function createTestUser(): UserCredentials {
	return generateUniqueUserCredentials('testuser');
}

/**
 * Helper function to wait for successful registration message
 */
export async function waitForRegistrationSuccess(page: Page): Promise<void> {
	await expect(page.locator('text=Your account was created successfully')).toBeVisible({ timeout: 10000 });
}

/**
 * Helper function to wait for login success
 */
export async function waitForLoginSuccess(page: Page): Promise<void> {
	// Wait for the page to redirect to account overview or dashboard
	await expect(page).not.toHaveURL(/login\.htm/);
	await expect(page.locator('text=Error!')).not.toBeVisible();
}

/**
 * Helper function to wait for logout success
 */
export async function waitForLogoutSuccess(page: Page): Promise<void> {
	// Wait for redirect to homepage or login page
	await expect(page).toHaveURL(/index\.htm/);
	await expect(page.locator('input[name="username"]')).toBeVisible();
}

/**
 * Setup function for tests that need a registered user
 */
export async function setupRegisteredUser(page: Page, userCredentials: UserCredentials): Promise<void> {
	const homePage = new HomePage(page);
	const registerPage = new RegisterPage(page);

	await homePage.goto();
	await homePage.goToRegister();
	await registerPage.register(userCredentials);
	await waitForRegistrationSuccess(page);
}

/**
 * Cleanup function for tests
 */
export async function cleanupTestData(page: Page): Promise<void> {
	// Navigate to homepage to ensure clean state
	await page.goto('/');
	
	// Clear any stored authentication state
	await page.context().clearCookies();
	
	// Clear local storage if needed
	await page.evaluate(() => {
		localStorage.clear();
		sessionStorage.clear();
	});
}

export { expect } from '@playwright/test';
