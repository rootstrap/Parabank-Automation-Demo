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

(*) An LLM (Large Language Model) is an artificial intelligence model trained on large amounts of text to understand and generate human language. It uses statistical patterns and language structures to answer questions, write text, or carry on conversations. Models like GPT-4 are examples of advanced LLMs.

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

### 7. 🧠 Lessons Learned – Playwright MCP

| ✅ Pros                                                                          | ⚠️ Cons                                                                                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Generates code quickly from natural language prompts.                            | Cannot handle multiple tasks in a single prompt — break down requests.                                    |
| Tests are stable and reliable.                                                   | Prompts must be clear and specific — avoid generic or vague instructions.                                 |
| No need to manually define locators or build page objects — MCP does it for you. | One prompt won't give you a full framework — define your architecture needs early and work incrementally. |
| Supports browser config (e.g., viewport, browser) via playwright-mcp-config.     | Building complex setups (multi-browser, CI, parallelism) takes multiple prompts and iterations.           |
| Reuses existing config (e.g., baseUrl, storageState from playwright.config.ts).  | Requires thoughtful planning — know your desired outcomes before starting.                                |
