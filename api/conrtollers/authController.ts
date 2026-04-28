import {APIRequestContext} from "@playwright/test";
import {LoginResponse} from "./types";

export class AuthController {
    private defaultHeaders = {
        'accept': 'application/json',
        'content-type': 'application/json',
    };

    constructor(private request: APIRequestContext) {
    }

    async login(user: { email: string, password: string }): Promise<LoginResponse> {
        const response = await this.request.post('/api/login',
            {
                data: user,
                headers: this.defaultHeaders,
            });
        return response.json();
    }
}
