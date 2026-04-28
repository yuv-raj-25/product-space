const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4000/api";

export interface ApiEnvelope<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
  errors?: string[];
}

export class ApiClientError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  token?: string | null;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<ApiEnvelope<T>> {
  const { token, headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success) {
    throw new ApiClientError(payload.message || "Request failed", response.status, payload.errors || []);
  }

  return payload;
}

