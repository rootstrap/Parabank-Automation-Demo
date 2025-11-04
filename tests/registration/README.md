# Registration Test Suite

This directory contains the end-to-end registration tests for ParaBank automation using Playwright's fixture system.

## Test File

### `registration-e2e.test.ts`
A comprehensive E2E test covering all 6 scenarios from the test requirements:
- **Scenarios 1-3**: Complete registration journey (Signup → Logout → Login) in sequence
- **Scenarios 4-6**: Independent tests using logged-in user fixture
  - Scenario 4: Open New Account
  - Scenario 5: Transfer Funds
  - Scenario 6: Bill Pay

## Test Scenarios Covered

Based on the original `scenarios/tests.txt` requirements:

1. **Test Scenario 1: User Sign Up** ✓
   - Complete registration using a unique username
   - Verify success message appears

2. **Test Scenario 2: User Logout** ✓
   - Perform logout from the registered user
   - Verify redirect to login page

3. **Test Scenario 3: User Login** ✓
   - Login with registered credentials
   - Verify successful authentication

4. **Test Scenario 4: Open New Account** ✓
   - Open a new savings account
   - Verify account creation success

5. **Test Scenario 5: Transfer Funds** ✓
   - Transfer funds between accounts
   - Verify balance updated correctly

6. **Test Scenario 6: Bill Pay** ✓
   - Submit bill payment
   - Verify payment completion

## How Fixtures Work

This test suite uses Playwright's **custom fixtures** system to provide dependency injection for page objects and test setup.

### Importing Fixtures

Instead of importing the standard Playwright test, we import from our custom fixtures:

```typescript
import { test, expect, createTestUser, waitForLoginSuccess, 
         waitForLogoutSuccess, waitForRegistrationSuccess, 
         cleanupTestData, loggedInUser } from '../../fixtures/parabank-fixtures';
```

### Basic Fixtures (Scenarios 1-3)

The `test` fixture provides page objects via dependency injection:

```typescript
test('Complete registration journey', async ({ 
    homePage,    // ← Automatically provided by fixture
    registerPage, // ← Automatically provided by fixture
    page          // ← Standard Playwright page
}) => {
    // No manual instantiation needed!
    await homePage.goto();
    await registerPage.register(testUser);
});
```

**What happens behind the scenes:**
1. Playwright creates a test context and page
2. The fixture system instantiates `HomePage` and `RegisterPage` with the page
3. These page objects are injected into your test function
4. After the test, fixtures handle cleanup automatically

### Advanced Fixtures (Scenarios 4-6)

For scenarios requiring a logged-in user, we extend the basic fixtures:

```typescript
const testWithLoggedInUser = loggedInUser.extend({});

testWithLoggedInUser('Scenario 4: Open New Account', async ({ 
    page,
    loggedInUser // ← Fully logged in user provided by fixture
}) => {
    // User is already registered AND logged in!
    console.log(`User ${loggedInUser.userCredentials.username} is logged in`);
    // Start testing immediately without setup
});
```

**What the `loggedInUser` fixture does:**
1. Generates unique user credentials
2. Creates and registers the user
3. Verifies successful registration
4. Provides all credentials and page objects to your test
5. Handles cleanup after the test

### Helper Functions from Fixtures

Fixtures also export utility functions:

- `createTestUser()`: Generate unique user credentials
- `waitForRegistrationSuccess(page)`: Wait for registration confirmation
- `waitForLoginSuccess(page)`: Wait for login completion
- `waitForLogoutSuccess(page)`: Wait for logout completion
- `cleanupTestData(page)`: Clear cookies and storage

### Fixture Architecture

```
parabank-fixtures.ts
├── test (base fixture)
│   ├── homePage: HomePage
│   ├── registerPage: RegisterPage
│   ├── aboutPage: AboutPage
│   ├── servicesPage: ServicesPage
│   ├── contactPage: ContactPage
│   ├── lookupPage: LookupPage
│   ├── errorPage: ErrorPage
│   └── billPayPage: BillPayPage
│
├── loggedInUser (extends test)
│   └── Creates registered user automatically
│
└── Helper Functions
    ├── createTestUser()
    ├── waitForRegistrationSuccess()
    ├── waitForLoginSuccess()
    ├── waitForLogoutSuccess()
    └── cleanupTestData()
```

### Benefits of Fixtures

1. **Dependency Injection**: Page objects are automatically provided
2. **No Manual Setup**: No need to instantiate `new HomePage(page)` in tests
3. **Automatic Cleanup**: Fixtures handle teardown automatically
4. **Composability**: Can extend fixtures for complex scenarios
5. **Type Safety**: Full TypeScript support with proper typing
6. **Isolation**: Each test gets fresh fixtures, preventing test pollution
7. **Reusability**: Share setup logic across multiple tests

## Running the Tests

```bash
# Run all registration tests
npx playwright test tests/registration

# Run with headed browser (default in config)
npx playwright test tests/registration --headed

# Run specific test by name
npx playwright test -g "Complete registration journey"

# Run with UI mode (interactive)
npx playwright test --ui

# Run with trace viewer (for debugging)
npx playwright show-trace test-results/registration-*/trace.zip
```

## Dependencies

- **Fixtures**: `../../fixtures/parabank-fixtures.ts` - Custom Playwright fixtures
- **Page Objects**: `../../pages/parabank/` - ParaBank page object models
- **Test Data**: `../../src/data/user-credentials.ts` - User credential generation
- **Types**: `../../src/types/test-data.ts` - TypeScript type definitions

## Test Structure

Each test follows the **Given-When-Then** pattern:

```typescript
test('scenario description', async ({ homePage, registerPage, page }) => {
    // Given: Setup state
    await homePage.goto();
    
    // When: Perform action
    await registerPage.register(testUser);
    
    // Then: Verify result
    await expect(page.locator('text=Success')).toBeVisible();
});
```

### Test Lifecycle

1. **beforeEach**: Generate unique credentials, cleanup previous data
2. **Test**: Execute scenario using fixtures
3. **afterEach**: Cleanup test data, clear storage
4. **Fixtures**: Handle page object lifecycle and teardown

## Best Practices

1. ✅ Always import `test` and `expect` from fixtures
2. ✅ Use fixtures for page objects instead of manual instantiation
3. ✅ Use `loggedInUser` fixture for tests requiring authentication
4. ✅ Generate unique credentials in `beforeEach` to avoid conflicts
5. ✅ Cleanup in `afterEach` to ensure test isolation
6. ✅ Use helper functions from fixtures for common waits
7. ✅ Follow Given-When-Then pattern for clarity
