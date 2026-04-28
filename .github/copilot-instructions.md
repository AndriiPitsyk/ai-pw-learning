# Copilot Instructions

This file is the entry point for all Copilot Skills in the project.
The detailed skills are located in the `.github/skills/` folder.

## Available skills

| Скіл | Файл | Опис |
|------|------|------|
| Application | [application.instructions.md](./skills/application.instructions.md) | A facade class that composes all API controllers and provides a single entry point for interacting with the REST API in tests |
| AuthController | [authController.instructions.md](./skills/authController.instructions.md) | A wrapper class over Playwright APIRequestContext for handling authentication via the REST API in tests |
| UserController | [userController.instructions.md](./skills/userController.instructions.md) | A wrapper class over Playwright APIRequestContext for interacting with the users REST API in tests |
| Types | [types.instructions.md](./skills/types.instructions.md) | Shared TypeScript interfaces that describe API request and response shapes used across all controllers in tests |
| UserDataGenerator | [userDataGenerator.instructions.md](./skills/userDataGenerator.instructions.md) | A builder-pattern class for generating random or partially overridden user data for tests using Faker.js |
| Fixtures | [fixtures.instructions.md](./skills/fixtures.instructions.md) | Custom Playwright test fixtures that provide pre-configured API controllers and reusable test data setup for all tests |
