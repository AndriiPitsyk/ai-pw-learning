---
name: UserDataGenerator
description: A builder-pattern class for generating random or partially overridden user data for tests using Faker.js.
applyTo: "api/data/userDataGenerator.ts"
---

# UserDataGenerator Skill

`UserDataGenerator` is a builder-pattern class for generating user request body data in tests. It uses `@faker-js/faker` to produce realistic random values and supports partial overrides via a fluent API.

## Exported Factory Function

### `userData(): UserDataGenerator`
- Creates and returns a new `UserDataGenerator` instance.
- Use this factory instead of instantiating the class directly.

## Methods

### `setUserData(userData): this`
- Accepts a partial object `{ userName?, email?, password?, role? }`.
- Merges the provided fields into the internal state (overrides only the specified fields).
- Returns `this` to support method chaining.

### `generate(): UserRequestBody`
- Produces the final user data object `{ userName, email, password, role }`.
- For each field not explicitly set via `setUserData`, a random value is generated using Faker:
  - `userName` → `faker.internet.userName()`
  - `email` → `faker.internet.email()`
  - `password` → `faker.internet.password()`
  - `role` → always defaults to `"user"`

## Types

### `UserRequestBody` (internal interface)
| Field | Type |
|---|---|
| `userName` | `string` |
| `email` | `string` |
| `password` | `string` |
| `role` | `string` |

## Usage in Tests
```typescript
import { userData } from '../api/data/userDataGenerator';

// Fully random user
const randomUser = userData().generate();

// Partially overridden user
const customUser = userData()
  .setUserData({ email: 'custom@example.com', role: 'admin' })
  .generate();

// Use with UserController
const createdUser = await app.users.create(randomUser);
```

## Purpose
Eliminates hardcoded test data, ensures each test run uses unique credentials, and provides a flexible builder API for customizing only the fields that matter for a specific test case.

