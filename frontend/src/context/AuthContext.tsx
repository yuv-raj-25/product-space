import { createContext, useEffect, useState } from "react";

import { authService } from "../services/authService";
import { AuthPayload, AuthUser, LoginFormValues, SignupFormValues } from "../types/auth";
import { getStoredAuth, setStoredAuth, StoredAuthState } from "../lib/storage";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (values: LoginFormValues) => Promise<void>;
  signup: (values: SignupFormValues) => Promise<void>;
  logout: () => void;
}

const initialState = getStoredAuth();

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const persistSession = (payload: AuthPayload): StoredAuthState => ({
  token: payload.token,
  user: payload.user,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(initialState?.user ?? null);
  const [token, setToken] = useState<string | null>(initialState?.token ?? null);
  const [isBootstrapping, setIsBootstrapping] = useState<boolean>(Boolean(initialState?.token));

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const currentUser = await authService.me(token);
        setUser(currentUser);
        setStoredAuth({ token, user: currentUser });
      } catch (_error) {
        setUser(null);
        setToken(null);
        setStoredAuth(null);
      } finally {
        setIsBootstrapping(false);
      }
    };

    void bootstrap();
  }, [token]);

  const login = async (values: LoginFormValues) => {
    const payload = await authService.login(values.email, values.password);
    const session = persistSession(payload);
    setUser(session.user);
    setToken(session.token);
    setStoredAuth(session);
  };

  const signup = async (values: SignupFormValues) => {
    const payload = await authService.signup(values.name, values.email, values.password);
    const session = persistSession(payload);
    setUser(session.user);
    setToken(session.token);
    setStoredAuth(session);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setStoredAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isBootstrapping,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

