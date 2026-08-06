# Lesson 14 - Workshop: Building a Custom API Test Framework

Builds on [Lesson 12](../Lesson-12) - the same target, [official_joke_api](https://github.com/15Dkatz/official_joke_api) run locally, now covered with a proper code framework instead of a Postman collection.

## Choices

1. **Test framework: Jest** - not used yet elsewhere in this repo (Mocha and Vitest were used in Lessons 10/11/13), chosen for variety with `ts-jest` in ESM mode.
2. **HTTP utility: Playwright's `APIRequestContext`** (`request.newContext()` from the `playwright` package directly - no browser, no `@playwright/test` runner needed, just the request client).
3. **API Objects**, built on Lesson 12's endpoints: `JokesApi` wraps `IApiService<APIResponse>` and exposes one typed method per request, each returning a `[response, dto]` tuple.

## Architecture

- `src/services/i-api.service.ts` - `IApiService<T>` interface (`getAsync`/`postAsync`/`putAsync`/`deleteAsync`), independent of what actually sends the request.
- `src/services/playwright-api.service.ts` - `PlaywrightApiService`, the only class that knows about Playwright; implements `IApiService<APIResponse>` via a lazily-created `APIRequestContext`.
- `src/services/config.service.ts` - base URL (`http://localhost:3005` by default, overridable via `JOKE_API_BASE_URL`).
- `src/apis/jokes.api.ts` - the API Objects: `getRandomJokeAsync`, `getRandomTenAsync`, `getJokesByTypeRandomAsync`, `getJokeByIdAsync`. Tests never call `fetch`/Playwright directly - only these methods.
- `src/models/joke.dto.ts` - `JokeDto` / `JokeErrorDto`.

## Running the target API locally

Same as Lesson 12:

```bash
git clone https://github.com/15Dkatz/official_joke_api.git
cd official_joke_api
npm install
npm start
```

## The 5 tests (`tests/jokes-api.spec.ts`)

1. `GET /random_joke` returns 200 and a joke with the correct shape.
2. `GET /random_ten` returns exactly 10 jokes.
3. `GET /jokes/programming/random` returns a one-item array whose `type` actually matches `programming` (same nuance called out in Lesson 12: this endpoint returns an array, not a bare object).
4. `GET /jokes/1` returns the joke with that exact id.
5. `GET /jokes/999999` returns 404 with the API's own `{ type: 'error', message: 'joke not found' }` shape.

Assertions mix Jest's own `expect` (status codes) with Chai's `expect` (imported as `expectChai`, response-body shape), matching this repo's established convention.

## Commands

```bash
npm install
npm test
npm run run   # tsc --build && eslint ./src ./tests
```
