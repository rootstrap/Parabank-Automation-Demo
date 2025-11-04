import { test as base, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { HomePage, RegisterPage, AboutPage, ServicesPage, ContactPage, LookupPage, ErrorPage, BillPayPage } from '../pages/parabank';
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
	billPayPage: BillPayPage;
}

// Shared browser and context for all tests
let sharedBrowser: Browser | null = null;
let sharedContext: BrowserContext | null = null;

// Shared user credentials for all tests (created once, reused across all scenarios)
let sharedUserCredentials: UserCredentials | null = null;

/**
 * Custom test fixture that provides ParaBank page objects with shared browser context.
 * 
 * Usage in tests:
 * ```typescript
 * import { test, expect } from '../../fixtures/parabank-fixtures';
 * 
 * test('my test', async ({ homePage, registerPage, page }) => {
 *   // homePage and registerPage are automatically available
 *   await homePage.goto();
 *   await registerPage.register(userCredentials);
 * });
 * ```
 */
export const test = base.extend<ParaBankTestContext>({
	// Override the browser fixture to use a shared browser instance
	browser: async ({ browser }, use) => {
		if (!sharedBrowser) {
			sharedBrowser = browser;
		}
		await use(sharedBrowser);
	},

	// Override the context fixture to use a shared context
	context: async ({ browser, contextOptions }, use, testInfo) => {
		if (!sharedContext) {
			sharedContext = await browser.newContext(contextOptions);
		}
		await use(sharedContext);
		
		// Only close context after the last test
		if (testInfo.retry === testInfo.project.retries) {
			// This is the last retry, but we'll handle cleanup in global teardown
			// For now, don't close it here to keep it open for subsequent tests
		}
	},

	// Override the page fixture to use pages from the shared context
	page: async ({ context }, use) => {
		// Use the existing page from context, or create a new one if needed
		const pages = context.pages();
		let page = pages.length > 0 ? pages[0]! : await context.newPage();
		await use(page);
		// Don't close the page after each test
	},
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
	},

	billPayPage: async ({ page }, use) => {
		const billPayPage = new BillPayPage(page);
		await use(billPayPage);
	}
});

/**
 * Helper function to generate unique test user
 * If a shared user already exists, returns that user instead of creating a new one
 */
export function createTestUser(): UserCredentials {
	if (!sharedUserCredentials) {
		sharedUserCredentials = generateUniqueUserCredentials('testuser');
		console.log(`📝 Created shared test user: ${sharedUserCredentials.username}`);
	}
	return sharedUserCredentials;
}

/**
 * Get the shared user credentials (without creating if it doesn't exist)
 */
export function getSharedUser(): UserCredentials | null {
	return sharedUserCredentials;
}

/**
 * Reset the shared user (useful for cleanup between test runs)
 */
export function resetSharedUser(): void {
	sharedUserCredentials = null;
}

/**
 * Fixture for a registered user - automatically creates and logs in a user
 */
export interface RegisteredUser {
	userCredentials: UserCredentials;
	homePage: HomePage;
	registerPage: RegisterPage;
}

export const registeredUser = test.extend<ParaBankTestContext & { registeredUser: RegisteredUser }>({
	registeredUser: async ({ homePage, registerPage }, use) => {
		// Generate unique credentials for this test
		const userCredentials = generateUniqueUserCredentials('testuser');
		
		// Register the user
		await homePage.goto();
		await homePage.goToRegister();
		await registerPage.register(userCredentials);
		await waitForRegistrationSuccess(registerPage.page);
		
		// Provide the registered user context
		await use({
			userCredentials,
			homePage,
			registerPage
		});
	}
});

/**
 * Fixture for a logged in user - creates a user, registers, and logs them in
 */
export interface LoggedInUser {
	userCredentials: UserCredentials;
	homePage: HomePage;
	registerPage: RegisterPage;
}

export const loggedInUser = test.extend<ParaBankTestContext & { loggedInUser: LoggedInUser }>({
	loggedInUser: async ({ homePage, registerPage }, use) => {
		// Use shared user credentials (create if doesn't exist)
		let userCredentials = getSharedUser();
		
		if (!userCredentials) {
			// Create shared user if it doesn't exist
			userCredentials = createTestUser();
			
			// Register the user
			await homePage.goto();
			await homePage.goToRegister();
			await registerPage.register(userCredentials);
			await waitForRegistrationSuccess(registerPage.page);
			
			console.log(`✅ Shared user ${userCredentials.username} created and logged in`);
		} else {
			// User already exists, just log in
			console.log(`✅ Reusing shared user ${userCredentials.username}`);
			await homePage.goto();
			
			// Check if already logged in
			const isLoggedIn = await homePage.page.locator('text=Account Services').isVisible().catch(() => false);
			
			if (!isLoggedIn) {
				// Not logged in, perform login
				await homePage.login(userCredentials.username, userCredentials.password);
				await waitForLoginSuccess(homePage.page);
				console.log(`✅ Shared user ${userCredentials.username} logged in`);
			} else {
				console.log(`✅ Shared user ${userCredentials.username} already logged in`);
			}
		}
		
		// Provide the logged in user context
		await use({
			userCredentials,
			homePage,
			registerPage
		});
	}
});

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

/**
 * Cleanup function to close shared browser and context
 * This should be called after all tests complete
 */
export async function cleanupSharedBrowser(): Promise<void> {
	if (sharedContext) {
		await sharedContext.close();
		sharedContext = null;
	}
	if (sharedBrowser) {
		await sharedBrowser.close();
		sharedBrowser = null;
	}
}
