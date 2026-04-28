import {UserController} from "./userController";
import {APIRequestContext} from "@playwright/test";
import {AuthController} from "./authController";

export class Application {
    users: UserController;
    auth: AuthController;

    constructor(private request: APIRequestContext) {
        this.users = new UserController(this.request);
        this.auth = new AuthController(this.request);
    }
}
