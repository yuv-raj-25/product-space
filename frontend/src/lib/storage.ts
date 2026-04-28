export const AUTH_STORAGE_KEY = "product-space-auth";

export interface StoredAuthUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredAuthState {
  token: string;
  user: StoredAuthUser;
}

export const getStoredAuth = (): StoredAuthState | null => {
  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoredAuthState;
  } catch (_error) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const setStoredAuth = (value: StoredAuthState | null): void => {
  if (!value) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
};

