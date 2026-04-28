---
name: AuthController
description: A wrapper class over Playwright APIRequestContext for handling authentication via the REST API in tests.
applyTo: "api/conrtollers/authController.ts"
---

# AuthController Skill

`AuthController` is a wrapper class over Playwright `APIRequestContext` that provides methods for interacting with the authentication REST API in tests.

## Constructor
- Accepts an `APIRequestContext` (Playwright) instance and stores it as a private `request` field.
- Defines `defaultHeaders` with `accept: application/json` and `content-type: application/json`, which are automatically added to every request.

## Methods

### `login(user): Promise<LoginResponse>`
- Sends a **POST** request to `/api/login` with the body `{ email, password }`.
- Returns the parsed JSON as a `LoginResponse` (does **not** assert `response.ok()` — the caller is responsible for handling the response status).

## Types
- `LoginResponse` — imported from `./types`, describes the structure of the API response returned after a login attempt.

## Usage in Tests

`AuthController` is not instantiated directly in tests. It is accessed via the `api` fixture as `api.auth`.

```typescript
import { test, expect } from '../fixture';

test('login returns tokens', async ({ api, createdUser }) => {
  const loginResponse = await api.auth.login({
    email: createdUser.email,
    password: createdUser.password,
  });
  expect(loginResponse.accessToken).toBeDefined();
  expect(loginResponse.refreshToken).toBeDefined();
});
```

See [Fixtures skill](./fixtures.instructions.md) for pre-built `loggedInAsNewUser` fixture that handles login automatically.

## Purpose
The class isolates authentication HTTP logic from tests, enables reuse of login calls, and simplifies test maintenance when the auth endpoint or request structure changes.

