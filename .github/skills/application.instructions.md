---
name: Application
description: A facade class that composes all API controllers and provides a single entry point for interacting with the REST API in tests.
applyTo: "api/conrtollers/index.ts"
---

## Constructor
- Accepts an `APIRequestContext` (Playwright) instance.
- Initializes all controllers, passing the shared `request` context to each.

## Properties

### `users: UserController`
- An instance of `UserController`.
- Used to perform CRUD operations on users via the REST API.

### `auth: AuthController`
- An instance of `AuthController`.
- Used to perform authentication operations (e.g., login) via the REST API.

## Usage in Tests

`Application` is not instantiated directly in tests. It is created inside the Playwright fixture and exposed via the `api` fixture.

See [Fixtures skill](./fixtures.instructions.md) for details on how `Application` is wired into tests.

## Purpose
Centralizes controller instantiation, eliminates the need to create each controller individually in tests, and ensures all controllers share the same `APIRequestContext`.

