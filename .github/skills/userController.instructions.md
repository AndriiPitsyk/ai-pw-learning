---
name: UserController
description: A wrapper class over Playwright APIRequestContext for interacting with the users REST API in tests.
applyTo: "api/conrtollers/userController.ts"
---

# UserController Skill

`UserController` is a wrapper class over Playwright `APIRequestContext` that provides convenient methods for interacting with the users REST API in tests.

## Constructor
- Accepts an `APIRequestContext` (Playwright) instance and stores it as a private `request` field.
- Defines `defaultHeaders` with `accept: application/json` and `content-type: application/json`, which are automatically added to every request.

## Methods

### `getUserByEmail(userEmail: string): Promise<UserResponse>`
- Sends a **GET** request to `/api/users?query={userEmail}` (email is encoded via `encodeURIComponent`).
- Asserts that the response is successful (`response.ok()`).
- Returns the parsed JSON as a `UserResponse`.

### `create(user): Promise<UserResponse>`
- Sends a **POST** request to `/api/users/signup` with the body `{ userName, email, password, role }`.
- Asserts that the response is successful.
- Returns `UserResponse` — the data of the created user.

### `update(userEmail, updateUser): Promise<any>`
- Sends a **PUT** request to `/api/users/{userEmail}` with partial or full update data `{ userName?, email?, password?, role? }`.
- Asserts that the response is successful.
- Returns the updated object from the response.

### `delete(userEmail: string): Promise<APIResponse>`
- Sends a **DELETE** request to `/api/users/{userEmail}`.
- Asserts that the response is successful.
- Returns the raw `APIResponse` object.

## Types
- `UserResponse` — imported from `./types`, describes the structure of the API response for a user.

## Usage in Tests

`UserController` is not instantiated directly in tests. It is accessed via the `api` fixture as `api.users`.

```typescript
import { test, expect } from '../fixture';

test('should create a user', async ({ api, userPayload }) => {
  const user = await api.users.create(userPayload);
  expect(user.email).toBe(userPayload.email);
  await api.users.delete(user.email);
});

test('should get user by email', async ({ api, createdUser }) => {
  const user = await api.users.getUserByEmail(createdUser.email);
  expect(user.email).toBe(createdUser.email);
});

test('should update user', async ({ api, createdUser, userPayload }) => {
  const updated = await api.users.update(createdUser.email, { userName: 'NewName' });
  expect(updated.userName).toBe('NewName');
});

test('should delete user', async ({ api, createdUser }) => {
  await api.users.delete(createdUser.email);
});
```

See [Fixtures skill](./fixtures.instructions.md) for `createdUser` and `userPayload` fixtures that handle user creation and cleanup automatically.

## Purpose
The class isolates HTTP logic from tests, enables reuse of API calls, and simplifies test maintenance when endpoints or request structures change.
