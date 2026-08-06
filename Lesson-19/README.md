# Workshop: Playwright Tests with PageObjects and WebElements - Lesson 19

This project demonstrates a component-based Page Object Model in Playwright: reusable "WebElement" component classes for repeated UI pieces, composed by a top-level PageObject.

## Homework

1. Choose a web page that can be described using components.
2. Create WebElements and PageObjects for it using Playwright.
3. Write a few tests for it.

## Chosen Page

[automationexercise.com/products](https://automationexercise.com/products) - the product listing repeats the exact same card markup for every item, and clicking "Add to cart" opens a shared confirmation modal. Both are natural, reusable components rather than one-off locators.

## Architecture

- **WebElements** (`src/components/`) - classes that wrap a scoped `Locator`/`Page` and expose only what that piece of UI can do:
  - `ProductCardComponent` - one product card (`.product-image-wrapper`): name, price, add to cart, details link. Takes a `Locator` scoped to a single card in its constructor, so the same class describes every card on the page.
  - `CartModalComponent` - the "Added!" confirmation modal (`#cartModal`): title, continue shopping, go to cart.
- **PageObject** (`src/pages/products.page.ts`) - `ProductsPage` composes the components: `cartModal` is a single instance created in the constructor (the page has exactly one), while `getProductCard(index)` is a factory method that returns a `ProductCardComponent` scoped to the requested card (there are many, and the index isn't known until test time) - the same pattern the lecturer uses for building nested navigation-menu components dynamically.

## What's Implemented

- `src/components/product-card.component.ts` / `cart-modal.component.ts` - the WebElements.
- `src/pages/products.page.ts` - the PageObject, composing the WebElements above plus page-level actions (search, category filter).
- `src/fixtures/pages.fixture.ts` - `test.extend` fixture providing `productsPage` in every test.
- `tests/products.spec.ts` - 4 tests:
  1. product cards expose a name and a correctly formatted price;
  2. adding a product to the cart shows the confirmation modal with the right title;
  3. following a card's details link opens a page with a matching product name;
  4. the category filter (Women > Dress) narrows results correctly.

## Structure

```text
src/
  components/
    product-card.component.ts   # WebElement: one product card
    cart-modal.component.ts     # WebElement: add-to-cart confirmation modal
    index.ts
  pages/
    products.page.ts            # PageObject composing the WebElements
    index.ts
  fixtures/
    pages.fixture.ts
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

## Note on Applying Previous Review Feedback

The final project review flagged missing worker-scoped fixtures for stateless services. That doesn't apply here: this homework has no API/config service, and `productsPage` wraps a Playwright `page`, which is inherently per-test - there's no correct worker-scoped version of a UI page fixture, so it's intentionally left test-scoped.
