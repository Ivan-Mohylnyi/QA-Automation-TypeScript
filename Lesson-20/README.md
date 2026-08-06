# Lesson 20 - BDD. Gherkin. Cucumber.js

A BDD test project built with [Cucumber.js](https://github.com/cucumber/cucumber-js) and [Playwright](https://playwright.dev/) (used here as the UI-testing tool, driven directly through Cucumber's `World`, not through the `@playwright/test` runner) against [automationexercise.com](https://automationexercise.com).

## Tech Stack

- Cucumber.js (`@cucumber/cucumber`) - Gherkin feature files + step definitions
- Playwright (`playwright` core package) - browser automation, driven from a Cucumber `World`
- Chai (`expect`) - assertions in step definitions
- ESLint (flat config, `typescript-eslint`, `@stylistic`, `unicorn`) + Prettier
- `tsx` - runs the TypeScript step definitions directly (no separate build step needed to run tests)

## Why this site

`automationexercise.com` has no bot protection and a stable product/cart UI flow, so it's reused from Lesson 18/19 for architectural consistency.

## Architecture

- `src/pages/` - Page Objects (`ProductsPage`, `CartPage`), same POM style as Lesson 18/19.
- `src/components/` - reusable "WebElement" component classes (`ProductCardComponent`, `CartModalComponent`), same pattern as Lesson 19.
- `src/worlds/automation-exercise.world.ts` - a Cucumber `World` subclass that holds the Playwright `Page`/`BrowserContext` for the current scenario and exposes page objects through lazy getters (constructed on first access, cached per scenario), plus a `scenarioContext: Map<string, unknown>` for passing data between steps within one scenario.
- `src/hooks/` - `BeforeAll`/`AfterAll` launch and close a single shared `Browser`; `Before`/`After` create and close a fresh `BrowserContext`/`Page` (with video recording) per scenario; a separate `After` hook attaches the scenario status and, on failure, a screenshot to the Cucumber report.
- `src/steps/` - step definitions, grouped by the page they operate on.
- `features/` - Gherkin feature files.

## Test Cases

- `features/search-products.feature` - searching for a known keyword returns at least one product.
- `features/add-to-cart.feature` - adding the first listed product shows the "Added!" confirmation modal and the product appears in the cart.
- `features/category-filter.feature` - a `Scenario Outline` with an `Examples` table that filters by three different categories (Women/Dress, Women/Tops, Men/Tshirts) and checks the resulting heading and product count for each - demonstrating Cucumber's data-driven scenarios.

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
npm test              # run all features
npm run debug         # run only scenarios tagged @debug
npm run run           # tsc --build && eslint ./src
```

## Viewing the Report

Each run produces an HTML report at `reports/cucumber-report.html` (open it in a browser). Per-scenario videos are saved under `videos/`.

## Notes

- No authentication is required - search, category filtering and the add-to-cart flow are all anonymous on this site.
- The browser runs headless (`chromium.launch({ headless: true })`), since this site has no headless-specific bot detection (unlike some other sites tried earlier in this course).
