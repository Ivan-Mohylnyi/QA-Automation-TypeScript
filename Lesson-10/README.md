# Lesson 10 - Test Frameworks. Writing Unit Tests

Builds on the [Lesson 9](../Lesson-9) notification-dispatch domain (`Notification` -> `EmailNotification`/`SmsNotification` -> `UrgentEmailNotification`, plus the `dispatchNotification`/`dispatchUrgentNotification` functions). Each subproject copies in only the domain code it needs and is otherwise a fully independent, isolated npm project (own `package.json`, config, `node_modules`) - mirroring how the lecturer keeps framework setups isolated in Lesson 10.

> Jasmine: per the assignment this was for self-study of the docs only, not implemented here.

## `mocha/` - class methods, Mocha + Chai

Unit-tests the `Notification` class hierarchy's own methods (`send()`, `sendUrgent()`, and the constructor-level priority override), using Mocha as the runner and Chai for every assertion (Mocha has no assertion library of its own).

A small addition on top of the Lesson 9 code: `Notification` now also tracks `lastMessage`, so tests can observe what was actually delivered (e.g. that SMS bodies get truncated) without having to spy on `console.log`.

```bash
cd mocha
npm install
npm test
```

## `vitest/` - functions that manipulate objects, Vitest + Chai

Unit-tests `dispatchNotification`/`dispatchUrgentNotification` - the functions whose input parameter is an object (`INotifiable`/`IUrgentNotifiable`). Tests use small hand-rolled fake objects (no mocking library yet - that's Lesson 11) to verify the functions call the right method with the right message, plus one test against a real `EmailNotification` instance. Assertions are mixed between Vitest's own `expect` and Chai's `expect` (imported as `expectChai`), per the assignment.

```bash
cd vitest
npm install
npm test
```

## Lint and type-check

Each subproject has the same gate script:

```bash
npm run run   # tsc --build && eslint ./src ./tests
```
