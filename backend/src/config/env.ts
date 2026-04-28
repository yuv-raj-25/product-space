import dotenv from "dotenv";

dotenv.config();

const parseList = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseNumber = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (!value) {
    return fallback;
  }

  return value.toLowerCase() === "true";
};

const requireEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseNumber(process.env.PORT, 4000),
  jwtSecret: requireEnv(process.env.JWT_SECRET, "JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
  bcryptSaltRounds: parseNumber(process.env.BCRYPT_SALT_ROUNDS, 10),
  cors: {
    allowedOrigins: parseList(process.env.CORS_ALLOWED_ORIGINS),
    allowedOriginPatterns: parseList(process.env.CORS_ALLOWED_ORIGIN_PATTERNS),
    credentials: parseBoolean(process.env.CORS_CREDENTIALS, false),
  },
  db: {
    url: process.env.DATABASE_URL,
    ssl: parseBoolean(process.env.DB_SSL, false),
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: parseNumber(process.env.DB_PORT, 5432),
    name: process.env.DB_NAME ?? "task_management",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    logging: parseBoolean(process.env.DB_LOGGING, false),
  },
};
