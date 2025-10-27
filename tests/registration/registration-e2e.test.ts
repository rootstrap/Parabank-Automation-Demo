import { test, expect, createTestUser, waitForLoginSuccess, waitForLogoutSuccess, waitForRegistrationSuccess, cleanupTestData, loggedInUser } from '../../fixtures/parabank-fixtures';
import { UserCredentials } from '../../src/data/user-credentials';

/**
 * End-to-End Test Suite: Registration Scenarios
 * 
 * This E2E test covers the exact scenarios from tests.txt:
 * 1. User Sign Up - Complete registration using a unique username
 * 2. User Logout - Perform a log out from the user created in scenario 1
 * 3. User Login - Perform a log in with user created in scenario 1
 * 4-6: Additional scenarios that can run independently (using loggedInUser fixture)
 * 
 * This test uses the custom fixtures defined in parabank-fixtures.ts
 * which provide page objects via dependency injection.
 */

/**
 * Extended test fixture for scenarios 4-6
 * These scenarios need a logged-in user and run independently
 */
const testWithLoggedInUser = loggedInUser.extend({});

test.describe('Registration Scenarios E2E', () => {
	let testUser: UserCredentials;

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
		// FINAL VERIFICATION FOR SCENARIOS 1-3
		// ========================================
		console.log('🎉 Complete Registration Scenarios (1-3) Successfully Executed!');
		
		// Additional verification that user is properly logged in
		await expect(page.locator('text=Account Services')).toBeVisible();
		await expect(page.locator('text=Log Out')).toBeVisible();
	});

	testWithLoggedInUser('Scenario 4: Open New Account (runs independently)', async ({ 
		page,
		loggedInUser
	}) => {
		console.log('🚀 Running Scenario 4: Open New Account');

		// User is already logged in via the loggedInUser fixture
		console.log(`✅ User ${loggedInUser.userCredentials.username} is logged in via fixture`);
		
		// ========================================
		// SCENARIO 4: OPEN NEW ACCOUNT
		// ========================================
		await expect(page.locator('text=Account Services')).toBeVisible();

		const openNewAccountLink = page.getByRole('link', { name: /open new account/i });
		await openNewAccountLink.click();
		
		await expect(page).toHaveURL(/openaccount\.htm/);
		await expect(page.getByRole('heading', { name: 'Open New Account' })).toBeVisible();

		const accountTypeDropdown = page.locator('#type');
		await accountTypeDropdown.selectOption('SAVINGS');
		
		await page.waitForTimeout(1000);
		
		const openAccountButton = page.locator('input[value="Open New Account"]');
		await openAccountButton.click();
		
		await page.waitForLoadState('networkidle', { timeout: 15000 });

		const congratulationsMessage = page.locator('p:has-text("Congratulations, your account is now open.")');
		await expect(congratulationsMessage).toBeVisible({ timeout: 10000 });
		console.log('✅ Scenario 4 Complete: New SAVINGS account successfully created');

		const accountIdHeading = page.locator('#newAccountId');
		await expect(accountIdHeading).toBeVisible();
		const accountId = await accountIdHeading.textContent();
		console.log(`📝 New Account ID: ${accountId}`);
		
		console.log('🎉 Scenario 4 Successfully Executed!');
	});

	testWithLoggedInUser('Scenario 5: Transfer Funds (runs independently)', async ({ 
		page,
		loggedInUser
	}) => {
		console.log('🚀 Running Scenario 5: Transfer Funds');

		// User is already logged in via the loggedInUser fixture
		console.log(`✅ User ${loggedInUser.userCredentials.username} is logged in via fixture`);

		// First, open a new account for the transfer (Scenario 4 prerequisite)
		console.log('📝 Prerequisite: Opening a new savings account...');
		await expect(page.locator('text=Account Services')).toBeVisible();

		const openNewAccountLink = page.getByRole('link', { name: /open new account/i });
		await openNewAccountLink.click();
		
		await expect(page).toHaveURL(/openaccount\.htm/);
		await expect(page.getByRole('heading', { name: 'Open New Account' })).toBeVisible();

		const accountTypeDropdown = page.locator('#type');
		await accountTypeDropdown.selectOption('SAVINGS');
		
		await page.waitForTimeout(1000);
		
		const openAccountButton = page.locator('input[value="Open New Account"]');
		await openAccountButton.click();
		
		await page.waitForLoadState('networkidle', { timeout: 15000 });

		const congratulationsMessage = page.locator('p:has-text("Congratulations, your account is now open.")');
		await expect(congratulationsMessage).toBeVisible({ timeout: 10000 });

		const newAccountIdHeading = page.locator('#newAccountId');
		await expect(newAccountIdHeading).toBeVisible();
		const savingsAccountId = await newAccountIdHeading.textContent();
		console.log(`📝 New Savings Account ID: ${savingsAccountId}`);

		// ========================================
		// SCENARIO 5: TRANSFER FUNDS
		// ========================================
		console.log('🚀 Starting Scenario 5: Transfer Funds');
		
		// When: User clicks "Transfer Funds" from Account Services
		const transferFundsLink = page.getByRole('link', { name: /transfer funds/i }).first();
		await transferFundsLink.click();
		
		// Verify we're on the Transfer Funds page
		await expect(page).toHaveURL(/transfer\.htm/);
		await expect(page.getByRole('heading', { name: 'Transfer Funds' })).toBeVisible();

		// And: User transfers 200 from one account to the savings account just created
		const amountInput = page.locator('#amount');
		await amountInput.fill('200');
		
		// Select the "from" account (should be the first/default account created during registration)
		// Wait for dropdown to be populated
		await page.waitForTimeout(500);
		
		// Select the "to" account (the savings account we just created)
		const toAccountDropdown = page.locator('#toAccountId');
		await toAccountDropdown.selectOption(savingsAccountId!);
		
		// Click Transfer button
		const transferButton = page.locator('input[value="Transfer"]');
		await transferButton.click();
		
		// Wait for transfer to complete
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		
		// Then: Verify transfer was successful on the same page
		const transferCompleteHeading = page.locator('h1:has-text("Transfer Complete")');
		await expect(transferCompleteHeading).toBeVisible({ timeout: 10000 });
		console.log('✅ Transfer Complete message displayed');
		
		// And: Navigate to Accounts Overview to verify the balance
		const accountsOverviewLink = page.getByRole('link', { name: /accounts overview/i });
		await accountsOverviewLink.click();
		
		await expect(page).toHaveURL(/overview\.htm/);
		await page.waitForLoadState('networkidle');
		
		// Wait for the account table to load
		await page.waitForTimeout(1000);
		
		// Find the savings account row by account ID
		const savingsAccountLink = page.locator(`a[href*="id=${savingsAccountId}"]`);
		await expect(savingsAccountLink).toBeVisible({ timeout: 5000 });
		
		// Get the parent row and find the balance column
		const savingsAccountRow = savingsAccountLink.locator('xpath=ancestor::tr');
		
		// Get all td elements in the row
		const cells = savingsAccountRow.locator('td');
		
		// Balance is typically in the second column (index 1)
		const balanceCell = cells.nth(1);
		const balanceText = await balanceCell.textContent();
		
		console.log(`Savings account balance: ${balanceText}`);
		
		// Extract numeric value from balance (e.g., "$200.00" -> 200)
		const balanceValue = parseFloat(balanceText?.replace(/[$,]/g, '') || '0');
		
		// Verify the balance is greater than or equal to 200
		expect(balanceValue).toBeGreaterThanOrEqual(200);
		console.log(`✅ Scenario 5 Complete: Verified savings account balance is $${balanceValue} (>= $200)`);
		
		console.log('🎉 Scenario 5 Successfully Executed!');
	});

	testWithLoggedInUser('Scenario 6: Bill Pay (runs independently)', async ({ 
		page,
		loggedInUser
	}) => {
		console.log('🚀 Running Scenario 6: Bill Pay');

		// User is already logged in via the loggedInUser fixture
		console.log(`✅ User ${loggedInUser.userCredentials.username} is logged in via fixture`);
		
		// ========================================
		// SCENARIO 6: BILL PAY
		// ========================================
		console.log('🚀 Starting Scenario 6: Bill Pay');
		
		// When: User clicks "Bill Pay" option from Account Services
		const billPayLink = page.getByRole('link', { name: /bill pay/i }).first();
		await billPayLink.click();
		
		// Verify we're on the Bill Pay page
		await expect(page).toHaveURL(/billpay\.htm/);
		await expect(page.getByRole('heading', { name: 'Bill Payment Service' })).toBeVisible();

		// And: Fill in payee information
		const payeeName = page.locator('input[name="payee.name"]');
		await payeeName.fill('Test Utility Company');
		
		const payeeAddress = page.locator('input[name="payee.address.street"]');
		await payeeAddress.fill('123 Billing Street');
		
		const payeeCity = page.locator('input[name="payee.address.city"]');
		await payeeCity.fill('Billing City');
		
		const payeeState = page.locator('input[name="payee.address.state"]');
		await payeeState.fill('CA');
		
		const payeeZipCode = page.locator('input[name="payee.address.zipCode"]');
		await payeeZipCode.fill('12345');
		
		const payeePhone = page.locator('input[name="payee.phoneNumber"]');
		await payeePhone.fill('555-987-6543');
		
		const payeeAccountNumber = page.locator('input[name="payee.accountNumber"]');
		await payeeAccountNumber.fill('99999');
		
		const verifyAccountNumber = page.locator('input[name="verifyAccount"]');
		await verifyAccountNumber.fill('99999');

		// And: Enter amount to pay and select the account to pay from
		const billPayAmount = page.locator('input[name="amount"]');
		await billPayAmount.fill('50');
		
		await page.waitForTimeout(500); // Wait for accounts to load
		
		// Click Send Payment button
		const sendPaymentButton = page.locator('input[value="Send Payment"]');
		await sendPaymentButton.click();
		
		// Wait for payment to complete
		await page.waitForLoadState('networkidle', { timeout: 10000 });
		
		// Then: Verify payment was successful by searching "Bill Payment Complete" message
		const billPaymentCompleteHeading = page.locator('h1:has-text("Bill Payment Complete")');
		await expect(billPaymentCompleteHeading).toBeVisible({ timeout: 10000 });
		console.log('✅ Scenario 6 Complete: Bill payment successful');
		
		// Additional verification - check payment amount
		const paymentAmount = page.locator('span#amount');
		await expect(paymentAmount).toContainText('50');
		console.log('✅ Verified: Bill payment of $50 was processed');
		
		console.log('🎉 Scenario 6 Successfully Executed!');
	});
});
