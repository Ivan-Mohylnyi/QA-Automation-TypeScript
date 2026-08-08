# Lesson 12 - API Testing Basics

A Postman collection with 10 tests against a locally-run clone of [official_joke_api](https://github.com/15Dkatz/official_joke_api).

> Note on how this collection was built: this was authored directly as a Postman Collection Schema v2.1 JSON file (the same format the Postman app's "Export" produces), then verified end-to-end with [`newman`](https://www.npmjs.com/package/newman) (Postman's official CLI runner) against a real running instance of the API - not just written and left unverified. Importing it into the Postman app works exactly the same way as any exported collection.

## Running the target API locally

```bash
git clone https://github.com/15Dkatz/official_joke_api.git
cd official_joke_api
npm install
npm start          # or: npm run dev (nodemon)
```

The server listens on `http://localhost:3005` (from the repo's own README / `index.js`).

## Running the collection

**Option A - Postman app:**
1. Import `official-joke-api.postman_collection.json`.
2. Confirm the collection variable `base_url` is `http://localhost:3005`.
3. Run the collection (Collection Runner, or each request individually).

**Option B - CLI (newman), used to verify this collection:**
```bash
npx newman run official-joke-api.postman_collection.json
```

## What's covered (10 requests / 10 test scripts)

| # | Request | What it checks |
|---|---------|-----------------|
| 1 | `GET /random_joke` | 200, response is a single joke object with `id`/`type`/`setup`/`punchline` |
| 2 | `GET /jokes/random` | Same as above - confirms it's a true alias of `/random_joke` |
| 3 | `GET /random_ten` | 200, response is an array of exactly 10 jokes |
| 4 | `GET /jokes/ten` | Confirms it's a true alias of `/random_ten` |
| 5 | `GET /jokes/random/5` | 200, response is an array of exactly 5 jokes |
| 6 | `GET /jokes/random/99999` | Requesting more jokes than exist (451 total) returns a graceful text message instead of a JSON array/error |
| 7 | `GET /types` | 200, response lists the known joke types (`general`, `programming`, `knock-knock`, `dad`) |
| 8 | `GET /jokes/programming/random` | 200, response is a **one-item array** (not a bare object, unlike `/random_joke`) and the joke's `type` actually matches `programming` |
| 9 | `GET /jokes/1` | 200, looking up a joke by a known id returns that exact joke |
| 10 | `GET /jokes/999999` | 404 for a non-existent id, with the API's own `{ type: 'error', message: 'joke not found' }` error shape |

Verified with `newman`: 10/10 requests, 20/20 assertions passing, run twice for stability.

## Notes

- Test #8 is worth calling out: reading `handler.js`, `/jokes/:type/random` internally calls the same "pick N random" helper as the `/ten` endpoints with `n = 1`, so it returns an **array with one element**, not a bare joke object like `/random_joke` does. The test asserts on that real behaviour instead of assuming symmetry with `/random_joke`.
- `base_url` is a collection variable so the whole suite can be re-pointed (e.g. to a deployed instance) by editing one value.
