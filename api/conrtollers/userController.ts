import { APIRequestContext, expect } from '@playwright/test';
import {UserResponse} from "./types";

export class UserController {
  private defaultHeaders = {
    'accept': 'application/json',
    'content-type': 'application/json',
  };
  constructor(private request: APIRequestContext) {}

  async getUserByEmail(userEmail: string): Promise <UserResponse> {
    const response = await this.request.get(`/api/users?query=${encodeURIComponent(userEmail)}`, { headers: this.defaultHeaders });
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async create(user: { userName: string; email: string; password: string; role: string }): Promise <UserResponse> {
    const response = await this.request.post('/api/users/signup',
      {
        data: user,
        headers: this.defaultHeaders,
      }
    );
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async update(userEmail: string, updateUser: { userName: string; email: string; password: string; role: string }) {
    const response = await this.request.put(`/api/users/${encodeURIComponent(userEmail)}`,
      {
        data: updateUser,
        headers: this.defaultHeaders,
      }
    );
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async delete(userEmail: string) {
    const response = await this.request.delete(`/api/users/${encodeURIComponent(userEmail)}`,
      { headers: this.defaultHeaders }
    );
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
