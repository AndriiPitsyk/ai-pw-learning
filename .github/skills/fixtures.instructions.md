---
name: Fixtures
description: Custom Playwright test fixtures that provide pre-configured API controllers and reusable test data setup for all tests.
applyTo: "fixture/index.ts"
---

## Description
Custom Playwright test fixtures that provide pre-configured API controllers and reusable test data setup for all tests.

`fixture/index.ts` extends the base Playwright `test` with custom fixtures, giving every test access to the `Application` facade and pre-built test data without manual setup.

## Fixtures

### `api: Application`
- Instantiates `Application` with the Playwright `request` context.
- Provides access to all API controllers (`api.users`, `api.auth`) inside tests.
- Scope: **per test** (default).

### `userPayload: UserRequestBody`
- Generates a random user data object using `userData().generate()`.
- Declared as an **option fixture** (`{ option: true }`) — can be overridden per test if needed.

### `createdUser: UserResponse`
- Creates a new user via `api.users.create(userPayload)` before the test.
- **Automatically deletes** the user via `api.users.delete(response.email)` after the test (teardown).
- Depends on: `api`, `userPayload`.

### `loggedInAsNewUser: LoginResponse`
- Logs in as the `createdUser` via `api.auth.login(...)` before the test.
- Returns a `LoginResponse` with `accessToken` and `refreshToken`.
- Depends on: `api`, `createdUser`.

## Usage in Tests
```typescript
import { test, expect } from '../fixture';

// Use api fixture to call controllers directly
test('Create a new user', async ({ api, userPayload }) => {
  const user = await api.users.create(userPayload);
  expect(user).toMatchObject(userPayload);
});

// Use createdUser — user is created before and deleted after automatically
test('get user by email', async ({ api, createdUser }) => {
  const user = await api.users.getUserByEmail(createdUser.email);
  expect(user.email).toBe(createdUser.email);
});

// Use loggedInAsNewUser — login is performed before the test automatically
test('login returns tokens', async ({ loggedInAsNewUser }) => {
  expect(loggedInAsNewUser.accessToken).toBeDefined();
  expect(loggedInAsNewUser.refreshToken).toBeDefined();
});
```

## Purpose
Eliminates boilerplate setup/teardown code in tests, ensures consistent test isolation, and provides composable fixtures that can be combined as needed.

## Related Skills
- [Application](./application.instructions.md) — the facade class instantiated by the `api` fixture
- [UserDataGenerator](./userDataGenerator.instructions.md) — used by the `userPayload` fixture
- [Types](./types.instructions.md) — `UserResponse` and `LoginResponse` returned by fixtures

