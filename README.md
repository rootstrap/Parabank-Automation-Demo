# playwright-mcp-demo

## 📘 Introduction

This document summarizes our experience using Playwright MCP (Model Context Protocol) — an AI-native extension of Playwright that allows large language models (LLMs) to interact with web applications through structured, accessible snapshots instead of visual interfaces.

It enables fast, reliable, and declarative automation by converting natural language prompts into executable browser actions.

## What's Playwright?

Playwright is a powerful open-source framework for web testing and automation that enables reliable end-to-end testing for modern web applications. It supports multiple browsers (Chromium, Firefox, Safari), provides robust APIs for interacting with web pages, and offers features like auto-waiting, screenshot capture, and network interception. Playwright is designed to handle dynamic web content and provides fast, reliable automation across different browsers and platforms.

## What's MCP?

MCP (Model Context Protocol) is an open standard that allows AI models, particularly LLMs, to securely connect and interact with external tools, data sources, and services. It acts like a "universal plug" for AI, enabling models to access real-time information and perform actions beyond their initial training data.

MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

![image](https://github.com/user-attachments/assets/958c8084-efb1-43e7-884d-934029b34e8c)

(\*) An LLM (Large Language Model) is an artificial intelligence model trained on large amounts of text to understand and generate human language. It uses statistical patterns and language structures to answer questions, write text, or carry on conversations. Models like GPT-4 are examples of advanced LLMs.

## What's Playwright MCP?

Playwright MCP refers to a Model Context Protocol (MCP) server that specifically provides browser automation capabilities using Playwright. It enables large language models (LLMs) and AI agents to interact with web pages, perform actions like navigating, filling forms, and taking snapshots, all through a standardized protocol, often for automated testing or web scraping.

When you run it as a CLI command:

**npx playwright-mcp**

It starts an HTTP server that listens for JSON commands to control the browser via Playwright. This server exposes an API that can be consumed by an LLM, another process, or even by you directly.

## Playwright MCP Setup Guide

Follow these steps to get started with Playwright in this project:

### 1. Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) installed (version 14 or higher recommended).
- Cursor
- To install Playwright and the Playwright MCP (Model Context Protocol) server, you should run the following npm commands: npm install -D @playwright/test to install Playwright and npm install -D @playwright/mcp to install the MCP server.

---

### 2. Configure your project

- Configure your baseUrl (and storageState if needed) in playwright.config.ts
- Add/Update the storageState path in playwright-mcp-config.json (if necessary).
- Run npm install to install Playwright.
- https://github.com/microsoft/playwright-mcp

### 3. Verify Playwright MCP is running

- Go to Cursor - Settings - Cursor settings to verify Playwright MCP is enabled.
- In the Cursor terminal, Go to Output - MCP Logs to verify MCP is running.
- Enable auto-run and auto-fix modes in the Cursor agent.
- Choose Claude-4-Sonnet as the model.
  1. Open a new Command Chat / Inline Prompt (Cmd + Shift + K)
  2. Enter the prompt "Navigate to Google.com"
  3. Verify a new browser instance is opened and that you are redirected to that url.

### 4. Complete the test scenario

- Open a new Command Chat / Inline Prompt (Cmd + Shift + K)
- Complete the test scenario you want to perform and add the playwright-test-creation.mdc rule as the chat context.
- Press Enter and wait for the test case to be created.

### 5. Refactor the test case and create the page objects.

- Open a new Command Chat / Inline Prompt (Cmd + Shift + K)
- Mention the test case you want to refactor as context and also attach the playwright-test-refactor.mdc rule to the message.
- Press Enter and wait for the test case to be refactored.

### 6. Helpful Links

- https://github.com/microsoft/playwright-mcp
- https://www.youtube.com/watch?v=AaCj939XIQ4
- https://dev.to/debs_obrien/letting-playwright-mcp-explore-your-site-and-write-your-tests-mf1
- https://www.youtube.com/watch?v=IixdI2bTR1g
- https://www.youtube.com/watch?v=pwbgvbJP8KM

---

## 🏗️ Test Architecture: Custom Fixtures

This project uses **Playwright's custom fixtures** system to provide a clean, maintainable testing architecture with dependency injection.

### What Are Fixtures?

Fixtures are **shared setup and teardown** logic that provides dependencies to your tests. They eliminate boilerplate code and ensure consistency across your test suite.

### Why Use Fixtures?

✅ **Dependency Injection**: Page objects are automatically provided to tests
✅ **No Boilerplate**: No need to instantiate `new HomePage(page)` in every test
✅ **Automatic Cleanup**: Fixtures handle teardown automatically
✅ **Type Safety**: Full TypeScript support with proper typing
✅ **Test Isolation**: Each test gets fresh instances
✅ **Reusability**: Share setup logic across multiple tests

### How Our Fixtures Work

#### 1. Basic Fixture Usage

All tests import from our custom fixtures instead of `@playwright/test`:

```typescript
// ✅ Correct: Import from fixtures
import { test, expect, createTestUser } from '../../fixtures/parabank-fixtures';

// ❌ Wrong: Import directly from @playwright/test
import { test, expect } from '@playwright/test';
```

#### 2. Page Object Injection

Page objects are automatically injected as parameters:

```typescript
test('Registration flow', async ({ 
    homePage,      // ← Automatically created and injected
    registerPage,  // ← Automatically created and injected
    page           // ← Standard Playwright page
}) => {
    // Use page objects directly - no manual setup!
    await homePage.goto();
    await registerPage.register(testUser);
});
```

#### 3. Advanced Fixtures: Pre-Authenticated Users

For tests requiring a logged-in user, use the `loggedInUser` fixture:

```typescript
import { loggedInUser } from '../../fixtures/parabank-fixtures';

// Extend the loggedInUser fixture
const testWithLoggedInUser = loggedInUser.extend({});

testWithLoggedInUser('Bill Pay', async ({ 
    page,
    loggedInUser // ← User is already registered AND logged in
}) => {
    // Start testing immediately - no setup needed!
    console.log(`Testing with user: ${loggedInUser.userCredentials.username}`);
});
```

### Available Fixtures

#### Basic Page Object Fixtures
- `homePage`: HomePage instance
- `registerPage`: RegisterPage instance
- `aboutPage`: AboutPage instance
- `servicesPage`: ServicesPage instance
- `contactPage`: ContactPage instance
- `lookupPage`: LookupPage instance
- `errorPage`: ErrorPage instance
- `billPayPage`: BillPayPage instance

#### Advanced Fixtures
- `loggedInUser`: Extends basic fixtures + creates authenticated user
- `registeredUser`: Extends basic fixtures + creates registered user

#### Helper Functions
- `createTestUser()`: Generate unique test credentials
- `waitForRegistrationSuccess(page)`: Wait for registration confirmation
- `waitForLoginSuccess(page)`: Wait for login completion
- `waitForLogoutSuccess(page)`: Wait for logout completion
- `cleanupTestData(page)`: Clear cookies and storage

### Complete Example

```typescript
import { test, expect, createTestUser, loggedInUser } from '../../fixtures/parabank-fixtures';

// Basic fixture test
test('User can navigate to services page', async ({ 
    homePage, 
    servicesPage, 
    page 
}) => {
    await homePage.goto();
    await homePage.goToServices();
    await expect(page).toHaveURL(/services\.htm/);
    await expect(servicesPage.pageTitle).toBeVisible();
});

// Advanced fixture test (pre-authenticated)
const testWithLoggedInUser = loggedInUser.extend({});

testWithLoggedInUser('User can pay bills', async ({ 
    page, 
    loggedInUser 
}) => {
    // User is already logged in, start testing!
    console.log(`Testing with: ${loggedInUser.userCredentials.username}`);
    
    // Navigate and perform bill payment...
});
```

### Project Structure

```
eLead-Automation-MCP/
├── fixtures/
│   └── parabank-fixtures.ts      # ← Custom fixtures definition
├── pages/
│   └── parabank/                  # ← Page Object Models
│       ├── homePage.ts
│       ├── registerPage.ts
│       └── ...
├── tests/
│   └── registration/
│       ├── registration-e2e.test.ts  # ← Tests using fixtures
│       └── README.md
└── README.md
```

### Learn More

For detailed documentation on fixtures, see:
- [`tests/registration/README.md`](tests/registration/README.md) - Comprehensive fixture guide
- [`fixtures/parabank-fixtures.ts`](fixtures/parabank-fixtures.ts) - Fixture implementation

---

### 7. 🧠 Lessons Learned – Playwright MCP

| ✅ Pros                                                                          | ⚠️ Cons                                                                                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Generates code quickly from natural language prompts.                            | Cannot handle multiple tasks in a single prompt — break down requests.                                    |
| Tests are stable and reliable.                                                   | Prompts must be clear and specific — avoid generic or vague instructions.                                 |
| No need to manually define locators or build page objects — MCP does it for you. | One prompt won't give you a full framework — define your architecture needs early and work incrementally. |
| Supports browser config (e.g., viewport, browser) via playwright-mcp-config.     | Building complex setups (multi-browser, CI, parallelism) takes multiple prompts and iterations.           |
| Reuses existing config (e.g., baseUrl, storageState from playwright.config.ts).  | Requires thoughtful planning — know your desired outcomes before starting.                                |
