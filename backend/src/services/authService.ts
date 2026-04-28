import bcrypt from "bcrypt";

import { env } from "../config/env";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { generateToken } from "../utils/jwt";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthPayload {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const buildAuthPayload = (user: User): AuthPayload => ({
  token: generateToken({
    id: user.id,
    email: user.email,
  }),
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  },
});

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const signup = async ({ name, email, password }: SignupInput): Promise<AuthPayload> => {
  const normalizedEmail = normalizeEmail(email);

  const existingUser = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw ApiError.conflict("User already exists with this email");
  }

  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
  });

  return buildAuthPayload(user);
};

const login = async ({ email, password }: LoginInput): Promise<AuthPayload> => {
  const normalizedEmail = normalizeEmail(email);

  const user = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  return buildAuthPayload(user);
};

const getCurrentUser = async (userId: number) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
  });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};

export const authService = {
  signup,
  login,
  getCurrentUser,
};

