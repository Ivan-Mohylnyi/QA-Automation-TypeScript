# Lesson 13 - Integration and Contract Tests

Integration tests for [TheCatAPI](https://developers.thecatapi.com/), using Mocha + Chai + native `fetch`. The optional contract-testing part (Pact, consumer/provider against petstore.swagger.io) was skipped by choice - this lesson focuses on the required integration-testing part.

## Integration testing scheme

TheCatAPI's OpenAPI spec (`developers.thecatapi.com`) documents `images`, `votes` and `favourites` as separate resources/modules. Individually, each is trivial to test (create, list, delete). What's actually worth *integration*-testing is how they relate to each other:

1. **Creation linkage** - does a vote/favourite created for a real image correctly reference that image's id, and does the API's own list endpoints reflect it back (`GET /votes?sub_id=`, `GET /favourites?sub_id=`)?
2. **Cross-module embedding** - `favourites` embeds an `image` sub-object in its response. Does that embedded data actually match the real image (not just an id)?
3. **Independence on deletion** - deleting a favourite for an image should not delete an existing vote for the same image (and vice versa) - they're related but independently owned resources.
4. **Referential integrity between images and votes/favourites** - does the votes/favourites module actually validate that `image_id` refers to a real image in the images module, or can they be created independently of it?
5. **Auth boundary** - since votes/favourites are tied to a caller via `x-api-key` (and `sub_id`), does the API reject anonymous writes, keeping per-user data properly isolated across modules?

Each of the 10 tests below maps to one of these five relationship categories, discovered/confirmed by exploring the live API (not just the docs) with real requests during development.

## Test data isolation

TheCatAPI publishes `DEMO-API-KEY` in its own docs as a shared, no-signup key. It's genuinely useful (no account needed to run this suite), but it's shared with every other demo user in the world and is rate-limited, so every test tags the data it creates with a unique `sub_id` (`qa-lesson13-<timestamp>`, generated once per test run) and only ever reads back through that same `sub_id` filter - that's what keeps the assertions deterministic on a key nobody here owns. Created votes/favourites are deleted again in `afterEach`.

To use a personal (free, unshared) key instead: `CAT_API_KEY=<your key> npm test`.

## What's covered (10 tests)

| # | Test | Relationship |
|---|------|--------------|
| 1 | Voting on a real fetched image | Creation linkage (votes) |
| 2 | Favouriting a real fetched image, including the embedded image | Creation linkage + cross-module embedding |
| 3 | The same image voted and favourited under one `sub_id` | Both modules relate to one image independently |
| 4 | Deleting a favourite doesn't affect a vote on the same image | Independence on deletion |
| 5 | Deleting a vote removes it from the votes list | Basic lifecycle |
| 6 | Voting on several different images aggregates correctly under one `sub_id` | Bulk creation linkage |
| 7 | Votes module accepts a vote for an `image_id` that doesn't exist | Referential integrity gap (real finding, see Notes) |
| 8 | Favourites module has the same gap | Referential integrity gap |
| 9 | Voting without `image_id` is rejected with 400 | Input validation still works despite #7/#8 |
| 10 | Voting without an API key is rejected with 401 | Auth boundary |

## Notes

- Tests 7 and 8 document a real finding, not an assumption: `POST /votes` and `POST /favourites` both return `201`/`200` for a made-up `image_id` that `GET /images/{id}` itself rejects with `400`. The votes/favourites modules do not cross-check `image_id` against the images module at write time.
- `CatApiClient` parses every response through a shared helper that surfaces a clear error (with the raw response body) instead of letting a non-JSON response crash with an opaque `SyntaxError` - added after the demo key's rate limiting produced exactly that failure once during development.

## Commands

```bash
npm install
npm test
npm run run   # tsc --build && eslint ./src ./tests
```
