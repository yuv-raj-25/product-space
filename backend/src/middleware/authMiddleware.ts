import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(ApiError.unauthorized("Missing or invalid authorization header"));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyToken(token);
    next();
  } catch (_error) {
    next(ApiError.unauthorized("Invalid or expired token"));
  }
};
