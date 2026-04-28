import { apiRequest } from "../lib/api";
import { AuthPayload } from "../types/auth";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiRequest<AuthPayload>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return response.data;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await apiRequest<AuthPayload>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    return response.data;
  },

  me: async (token: string) => {
    const response = await apiRequest<AuthPayload["user"]>("/auth/me", {
      method: "GET",
      token,
    });

    return response.data;
  },
};

