# Lesson 16 - Cypress and Puppeteer

[Lesson 15](../Lesson-15)'s TC1 ("search for a product and add the first result to the cart") and TC5 ("subscribe to the newsletter from the footer") - same selectors, same actions - reimplemented as two separate runnable projects, one per tool.

## `cypress/`

Cypress's own test runner (no separate assertion/runner library needed), TypeScript support built in.

```bash
cd cypress
npm install
npm run cy:open   # interactive
npm test           # headless (cypress run)
```

## `puppeteer/`

Puppeteer has no test runner of its own, so it's paired with Vitest (same pairing the lecturer uses for Puppeteer). Page Objects use Puppeteer's own `Locator` API (`.fill()`, `.click()`, `.hover()`, `.wait()`), which is a different API shape from Playwright's `Locator` used in earlier lessons, even though the underlying CSS selectors are identical.

```bash
cd puppeteer
npm install
npm test
```

## What's the same, what's different

Both projects target the exact same elements with the exact same CSS selectors from Lesson 15 (`#search_product`, `.product-image-wrapper`, `a.add-to-cart`, `#cartModal a[href="/view_cart"]`, `.cart_description h4 a`, `#susbscribe_email`, `#subscribe`, `#success-subscribe`). What differs is only the tool-specific API for using them:

| | Cypress | Puppeteer |
|---|---|---|
| Runner | built-in (`cypress run`) | none - paired with Vitest here |
| Selector API | `cy.get(selector)`, chainable, auto-retrying | `page.locator(selector)`, auto-waiting |
| Assertions | `.should('be.visible')`, `.and(...)` | Vitest's `expect(...).toContain(...)` |
| Async model | commands queue internally, no `await` in test code | every action is a real `Promise`, `await` everywhere |

Both suites were run headless against the live site and pass 2/2, twice in a row.

## A real environment gotcha worth noting

Both Cypress's and Puppeteer's own binaries are Electron/Chromium apps launched as subprocesses. If the shell environment has `ELECTRON_RUN_AS_NODE=1` set (inherited from some outer Electron-based tool), Cypress's binary fails immediately with `bad option: --smoke-test` because it starts in plain-Node mode instead of as the Cypress app. Unsetting that variable before running fixed it - a good reminder that "test failure" isn't always the test's fault.
