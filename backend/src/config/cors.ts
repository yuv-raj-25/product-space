import { env } from "./env";

const defaultAllowedOrigins = [
  // "http://localhost:5173",
  // "http://127.0.0.1:5173",
  "https://product-space-tawny.vercel.app"
];

const isOriginAllowed = (origin: string): boolean => {
  const exactOrigins = env.cors.allowedOrigins.length > 0 ? env.cors.allowedOrigins : defaultAllowedOrigins;

  if (exactOrigins.includes(origin)) {
    return true;
  }

  return env.cors.allowedOriginPatterns.some((pattern) => origin.endsWith(pattern));
};

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (isOriginAllowed(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: env.cors.credentials,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
