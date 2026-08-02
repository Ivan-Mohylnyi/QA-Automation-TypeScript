# Playwright as an E2E Web UI Framework - Lesson 18

This project demonstrates Playwright Test as an E2E UI testing tool: a Page Object Model for a real page on the internet, plus a few tests built on top of it.

## Homework

1. Get familiar with the Playwright documentation: https://playwright.dev/docs/intro
2. Create a Playwright Test project, describe the chosen page as a Page Object Model, write a few tests.
3. Get familiar with the documentation on working with Shadow DOM and iFrame:
   - Shadow DOM (Playwright locators pierce Shadow DOM automatically): https://playwright.dev/docs/locators#locate-in-shadow-dom
   - iFrame (`FrameLocator`, `page.frameLocator()`): https://playwright.dev/docs/frames

## Chosen Page

[automationexercise.com/products](https://automationexercise.com/products) - a public site built specifically for test automation practice (no bot protection, stable markup).

## What's Implemented

- `src/pages/products.page.ts` - Page Object Model for the product catalog page: search, product cards, category filter, add to cart.
- `src/fixtures/pages.fixture.ts` - a Playwright fixture that provides a ready `ProductsPage` instance in every test (`test.extend`).
- `tests/products.spec.ts` - 4 tests:
  1. multiple products are displayed on the page;
  2. search returns matching results;
  3. category filter (Women > Dress) shows the correct products;
  4. a product can be added to the cart and shows up in the cart.

## Structure

```text
src/
  pages/
    products.page.ts   # Page Object Model
    index.ts
  fixtures/
    pages.fixture.ts    # test.extend with productsPage
    index.ts
tests/
  products.spec.ts
playwright.config.ts
```

## Commands

Install dependencies:

```bash
npm install
npx playwright install chromium
```

Run tests:

```bash
npm test
```

Run with a visible browser:

```bash
npm run test:headed
```

HTML report:

```bash
npm run test:report
```

Compile TypeScript + run ESLint:

```bash
npm run run
```
