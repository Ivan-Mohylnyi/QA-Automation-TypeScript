# Lesson 8 - Interfaces and Types. Classes

## What's implemented

1. **`src/user.dto.ts`** - `UserDto` interface describing a multi-level JSON response: `GET https://jsonplaceholder.typicode.com/users/{id}` (same API used in the Lesson 6 homework), nested into `AddressDto` -> `GeoDto` and `CompanyDto`.
2. **`src/user-api.ts`** - `getUserById(id)` sends the request and returns a typed `Promise<UserDto>`, throwing on a non-OK response instead of returning something unusable.
3. **`src/user-summary.ts`** - `UserSummary` class. Its constructor takes the raw `UserDto` (`const summary = new UserSummary(user)`) and derives a shorter, flattened view of it in the constructor itself: a bio string, a location string, the sum of the two geo coordinates, and a company tagline.
4. **`src/abstraction.ts`** - abstraction and inheritance: an `IContact` interface, an abstract `Contact` class implementing it (with a `protected` helper method and a `static` instance counter), and two concrete subclasses, `PersonContact` and `CompanyContact`, each adding its own field and its own `getContactCard()` implementation.
5. **`src/index.ts`** - fetches a real user, builds a `UserSummary` from it, builds `PersonContact`/`CompanyContact` instances from the same user data, and calls their methods.

## Commands

Install dependencies:

```bash
npm install
```

Run the entry point:

```bash
npx tsx src/index.ts
```

Compile TypeScript + lint:

```bash
npm run run
```
