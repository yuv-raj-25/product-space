import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/ApiError";

type ValidationRule = (req: Request) => string | null;

export const validateRequest =
  (rules: ValidationRule[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const errors = rules
      .map((rule) => rule(req))
      .filter((error): error is string => Boolean(error));

    if (errors.length > 0) {
      next(ApiError.badRequest("Validation failed", errors));
      return;
    }

    next();
  };
