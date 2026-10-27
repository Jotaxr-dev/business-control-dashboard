import { apiRequest } from "./api";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export function login(credentials: LoginCredentials) {
  return apiRequest<LoginCredentials>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
