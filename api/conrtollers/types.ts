export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserResponse {
    userName: string;
    email: string;
    password: string;
    role: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}
