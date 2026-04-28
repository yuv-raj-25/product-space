import { Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { authService } from "../services/authService";

export const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const authPayload = await authService.signup({ name, email, password });

  res
    .status(201)
    .json(new ApiResponse(authPayload, "User created successfully", 201));
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const authPayload = await authService.login({ email, password });

  res
    .status(200)
    .json(new ApiResponse(authPayload, "Login successful", 200));
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required");
  }

  const user = await authService.getCurrentUser(req.user.id);

  res.status(200).json(new ApiResponse(user, "Current user fetched successfully", 200));
});
