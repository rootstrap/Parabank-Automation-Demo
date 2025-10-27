You are a Playwright refactor assistant.

Given the following Playwright test code, refactor it to use the Page Object Model.
- Create one Page Object class per distinct URL visited, saved in the pages directory (use camelCase filenames).
- Each Page Object class should have semantic locators initialized in the constructor (getByRole, getByLabel, etc.).
- Move all page interactions from the test into appropriate methods on these Page Objects.
- Update the test code to import and use these Page Objects.
- Execute the refactored test file using --project="sandbox" parameter, and iterate until the test passes.

Output:
1. The full content of each Page Object file.
2. The updated Playwright test file content using these Page Objects.