# Registration Test Suite

This directory contains the registration-related test files for ParaBank automation testing.

## Test Files

### 1. `user-signup.test.ts`
Tests the user registration functionality including:
- Successful user registration with unique credentials
- Form validation for required fields
- Password confirmation validation
- Duplicate username prevention
- Navigation between pages

### 2. `user-logout.test.ts`
Tests the user logout functionality including:
- Successful logout from logged-in state
- Handling logout when already logged out
- Session persistence after logout
- Redirect to homepage after logout
- Session data cleanup

### 3. `user-login.test.ts`
Tests the user login functionality including:
- Successful login with valid credentials
- Failed login with invalid credentials
- Empty credentials handling
- Session maintenance across navigation
- Login from different pages
- Case-sensitive username handling
- Error message display

## Test Scenarios Covered

Based on the original `tests.txt` requirements:

1. **Test Scenario 1: User Sign Up**
   - Complete registration using a unique username
   - Verify user is signed up when seeing message "Your account was created successfully. You are now logged in."

2. **Test Scenario 2: Logout**
   - Perform a log out from the user created in scenario 1
   - Verify account is logged out

3. **Test Scenario 3: Login**
   - Perform a log in with user created in scenario 1
   - Verify account is logged in

## Dependencies

- **Fixtures**: Uses `../fixtures/parabank-fixtures.ts` for test setup and page objects
- **Test Data**: Uses `../../src/data/user-credentials.ts` for user credential management
- **Page Objects**: Uses ParaBank page objects from `../../pages/parabank/`

## Running the Tests

```bash
# Run all registration tests
npm test -- tests/registration

# Run specific test file
npm test -- tests/registration/user-signup.test.ts

# Run with headed browser
npm run test:headed -- tests/registration

# Run with debug mode
npm run test:debug -- tests/registration
```

## Test Structure

Each test file follows the Given-When-Then pattern and includes:
- **Setup**: Unique user credentials generated for each test
- **Cleanup**: Test data cleanup after each test
- **Assertions**: Comprehensive verification of expected behavior
- **Error Handling**: Tests for various error scenarios

## Fixtures and Utilities

The tests use custom fixtures that provide:
- Page object instances for all ParaBank pages
- Helper functions for common operations
- Test data generation utilities
- Setup and teardown functionality
