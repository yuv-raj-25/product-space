import { Request } from "express";

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const validateSignup = [
  (req: Request) => {
    const { name } = req.body as { name?: unknown };
    if (typeof name !== "string" || !name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2 || name.trim().length > 100) {
      return "Name must be between 2 and 100 characters";
    }
    return null;
  },
  (req: Request) => {
    const { email } = req.body as { email?: unknown };
    if (typeof email !== "string" || !email.trim()) {
      return "Email is required";
    }
    if (!isValidEmail(email.trim())) {
      return "Email must be valid";
    }
    return null;
  },
  (req: Request) => {
    const { password } = req.body as { password?: unknown };
    if (typeof password !== "string" || !password.trim()) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  },
];

export const validateLogin = [
  (req: Request) => {
    const { email } = req.body as { email?: unknown };
    if (typeof email !== "string" || !email.trim()) {
      return "Email is required";
    }
    if (!isValidEmail(email.trim())) {
      return "Email must be valid";
    }
    return null;
  },
  (req: Request) => {
    const { password } = req.body as { password?: unknown };
    if (typeof password !== "string" || !password.trim()) {
      return "Password is required";
    }
    return null;
  },
];

