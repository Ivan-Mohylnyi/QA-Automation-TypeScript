# Lesson 17 - Selenium WebDriver and WebdriverIO

Same [Lesson 15](../Lesson-15) test cases (TC1, TC5) and same CSS selectors as [Lesson 16](../Lesson-16), reimplemented a third time with Page Objects - now on the two W3C WebDriver-protocol tools instead of Cypress/Puppeteer's own automation protocols.

## `selenium-webdriver/`

Selenium WebDriver has no test runner of its own, paired with Mocha + Chai (matching the lecturer's own Lesson 17 pairing). Page Objects use `selenium-webdriver`'s `By.css(...)` + `driver.wait(until.elementLocated(...))`.

```bash
cd selenium-webdriver
npm install
npm test
```

## `webdriver-io/`

WebdriverIO bundles its own CLI test runner (`wdio run`), configured through `wdio.conf.ts`, here using Mocha under the hood with `expect-webdriverio` matchers. Page Objects use WebdriverIO's own `$(selector)` returning a `ChainablePromiseElement`.

```bash
cd webdriver-io
npm install
npm test
```

## Notes

- Both run headless Chrome against the live site - consistent with every other lesson using automationexercise.com.
- **Real bug found and fixed**: the initial Selenium `viewCart()` step failed with `ElementNotInteractableError`. `driver.wait(until.elementLocated(...))` only waits for the element to exist in the DOM - the "View Cart" link inside the Bootstrap modal is located immediately but stays non-interactable during the modal's CSS fade-in transition. Added a second helper, `getInteractableElement`, that additionally waits for `until.elementIsVisible(...)` before that specific click. WebdriverIO's own `waitForClickable()` handles the same problem out of the box, which is a real, concrete difference between the two tools' ergonomics, not just a syntax difference.
- `webdriver-io/wdio.conf.ts` in the lecturer's own repo points `tsConfigPath` at `./test/tsconfig.json`, a file that doesn't exist in that repo. This project points it at the real root `tsconfig.json` instead, rather than copying a broken reference.

## Comparing all four browser-automation tools used across Lessons 16-17

| | Cypress | Puppeteer | Selenium WebDriver | WebdriverIO |
|---|---|---|---|---|
| Protocol | own (Chrome DevTools-based) | Chrome DevTools Protocol | W3C WebDriver | W3C WebDriver |
| Runner | built-in | none (paired with Vitest) | none (paired with Mocha) | built-in (`wdio run`) |
| Element API | `cy.get()`, chainable | `page.locator()` | `driver.findElement()` / `By` | `$()`, chainable |
| Assertions | `.should(...)` | Vitest `expect` | Chai `expect` | `expect-webdriverio` |
