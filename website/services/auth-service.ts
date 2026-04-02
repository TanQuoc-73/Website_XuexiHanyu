import { api } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

interface BackendAuthResponse {
  token: string;
  id: number;
  email: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    role: string;
  };
}

function mapBackendAuthResponse(data: BackendAuthResponse): AuthResponse {
  return {
    token: data.token,
    user: {
      id: String(data.id),
      email: data.email,
      displayName: data.username,
      role: data.role,
    },
  };
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<BackendAuthResponse>("/auth/login", payload).then(mapBackendAuthResponse),
  register: (payload: RegisterPayload) =>
    api.post<BackendAuthResponse>("/auth/register", payload).then(mapBackendAuthResponse),
  logout: () => api.post<{ message: string }>("/auth/logout", {}),
};
