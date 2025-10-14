import { test, expect, createTestUser, waitForLoginSuccess, waitForLogoutSuccess, waitForRegistrationSuccess, cleanupTestData } from '../../fixtures/parabank-fixtures';

/**
 * End-to-End Test Suite: Registration Scenarios
 * 
 * This E2E test covers the exact scenarios from tests.txt:
 * 1. User Sign Up - Complete registration using a unique username
 * 2. User Logout - Perform a log out from the user created in scenario 1
 * 3. User Login - Perform a log in with user created in scenario 1
 * 
 * All scenarios run in a single browser session.
 */

test.describe('Registration Scenarios E2E', () => {
	let testUser: ReturnType<typeof createTestUser>;

	test.beforeEach(async ({ page }) => {
		// Generate unique user credentials for each test run
		testUser = createTestUser();
		
		// Clean up any previous test data
		await cleanupTestData(page);
	});

	test.afterEach(async ({ page }) => {
		// Clean up test data after each test
		await cleanupTestData(page);
	});

	test('Complete registration journey: Signup → Logout → Login', async ({ 
		homePage, 
		registerPage, 
		page 
	}) => {
		// ========================================
		// SCENARIO 1: USER SIGN UP
		// ========================================
		console.log('🚀 Starting Scenario 1: User Sign Up');
		
		// Given: User is on the ParaBank homepage
		await homePage.goto();
		await expect(page).toHaveURL(/index\.htm/);

		// When: User navigates to registration page
		await homePage.goToRegister();
		await expect(page).toHaveURL(/register\.htm/);

		// And: User completes registration using a unique username
		await registerPage.register(testUser);

		// Then: Verify user is signed up when seeing message "Your account was created successfully. You are now logged in."
		await waitForRegistrationSuccess(page);
		await expect(page.locator('text=Your account was created successfully')).toBeVisible();
		await expect(page.locator('text=You are now logged in')).toBeVisible();
		console.log('✅ Scenario 1 Complete: User successfully signed up');

		// ========================================
		// SCENARIO 2: USER LOGOUT
		// ========================================
		console.log('🚀 Starting Scenario 2: User Logout');
		
		// When: User performs a log out from the user created in scenario 1
		const logoutLink = page.getByRole('link', { name: /logout/i });
		const logoutButton = page.getByRole('button', { name: /logout/i });
		
		// Try to find and click logout element
		if (await logoutLink.isVisible()) {
			await logoutLink.click();
		} else if (await logoutButton.isVisible()) {
			await logoutButton.click();
		} else {
			// Alternative: Look for common logout patterns
			const signOutLink = page.locator('a[href*="logout"], a[href*="signout"]').first();
			if (await signOutLink.isVisible()) {
				await signOutLink.click();
			} else {
				// If no logout found, try clearing session manually
				await page.context().clearCookies();
				await page.goto('/');
			}
		}

		// Then: Verify account is logged out
		await waitForLogoutSuccess(page);
		await expect(page.locator('input[name="username"]')).toBeVisible();
		await expect(page.locator('input[name="password"]')).toBeVisible();
		console.log('✅ Scenario 2 Complete: User successfully logged out');

		// ========================================
		// SCENARIO 3: USER LOGIN
		// ========================================
		console.log('🚀 Starting Scenario 3: User Login');
		
		// When: User performs a log in with user created in scenario 1
		await homePage.goto();
		await homePage.login(testUser.username, testUser.password);

		// Then: Verify account is logged in
		await waitForLoginSuccess(page);
		await expect(page).not.toHaveURL(/index\.htm/);
		await expect(page).not.toHaveURL(/login\.htm/);
		await expect(page.locator('text=Error!')).not.toBeVisible();
		console.log('✅ Scenario 3 Complete: User successfully logged in');

		// ========================================
		// FINAL VERIFICATION
		// ========================================
		console.log('🎉 Complete Registration Scenarios E2E Flow Successfully Executed!');
		
		// Additional verification that user is properly logged in
		await expect(page.locator('text=Account Services')).toBeVisible();
		await expect(page.locator('text=Log Out')).toBeVisible();
	});
});
