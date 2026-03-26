import { api } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

export const authService = {
  login: (payload: LoginPayload) => api.post<AuthResponse>("/auth/login", payload),
  register: (payload: RegisterPayload) => api.post<AuthResponse>("/auth/register", payload),
  logout: () => api.post<void>("/auth/logout", {}),
};
