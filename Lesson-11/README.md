# Lesson 11 - Mocking and Testing Isolated Components

Builds on [Lesson 8](../Lesson-8) (`getUserById`, `UserSummary`, `Contact`/`PersonContact`/`CompanyContact`), using **Mocha + sinon.js** (the assignment allowed either Mocha+sinon or Vitest/Jest - Mocha+sinon was chosen here, having already covered Vitest in Lesson 10).

No method needed to be changed to return non-`void` (the assignment's "if necessary" clause) - every method involved already returns a value.

## `tests/user-api.spec.ts` - mocking a function (`fetch`)

`getUserById` depends on the global `fetch`. Instead of hitting the real network in a unit test, `globalThis.fetch` is stubbed with `sinon.stub(globalThis, 'fetch')` so the test controls exactly what the "network" returns:

- returns the parsed user when the stubbed response is ok.
- asserts `fetch` was called exactly once with the expected URL.
- throws a descriptive error when the stubbed response is not ok (404).

## `tests/contact-mocking.spec.ts` - mocking objects

- `UserSummary` is exercised with a hand-built mock `UserDto` object, proving its transformation logic works in isolation without ever calling the network.
- `sinon.spy(person, 'getContactCard')` wraps a real `PersonContact` instance's method to verify it was called exactly once, without changing its behaviour.
- `sinon.stub(Contact.prototype, 'formatHeader')` replaces the (protected) base-class method with a canned return value, to prove `PersonContact.getContactCard()` is properly isolated from `Contact`'s own header-formatting logic.

6 tests total (the assignment asked for at least 5).

## Commands

```bash
npm install
npm test
npm run run   # tsc --build && eslint ./src ./tests
```
