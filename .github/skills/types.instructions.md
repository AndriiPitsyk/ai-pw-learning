---
name: Types
description: Shared TypeScript interfaces that describe API request and response shapes used across all controllers in tests.
applyTo: "api/conrtollers/types.ts"
---

# Types Skill

`types.ts` defines shared TypeScript interfaces that describe the shape of REST API responses used across all controllers.

## Interfaces

### `LoginResponse`
Returned by `AuthController.login()` after a successful authentication request.

| Field | Type | Description |
|---|---|---|
| `accessToken` | `string` | JWT access token used for authenticated requests |
| `refreshToken` | `string` | JWT refresh token used to obtain a new access token |

### `UserResponse`
Returned by `UserController` methods (`create`, `getUserByEmail`, `update`).

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier of the user |
| `userName` | `string` | Display name of the user |
| `email` | `string` | Email address of the user |
| `password` | `string` | Hashed password of the user |
| `role` | `string` | Role assigned to the user (e.g. `"user"`) |
| `createdAt` | `string` | ISO timestamp of when the user was created |
| `updatedAt` | `string` | ISO timestamp of when the user was last updated |

## Purpose
Centralizes type definitions to ensure type safety across all controllers and tests, and serves as a single source of truth for API response structures.

