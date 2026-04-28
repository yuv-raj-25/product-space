import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/apiResponse";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(ApiError.notFound("Route not found"));
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      ...new ApiResponse(error.data, error.message, error.statusCode),
      success: error.success,
      errors: error.errors,
    });
    return;
  }

  if (error instanceof ValidationError) {
    const validationError = ApiError.validationError(
      "Validation failed",
      error.errors.map((item) => item.message),
    );

    res.status(validationError.statusCode).json({
      ...new ApiResponse(validationError.data, validationError.message, validationError.statusCode),
      success: validationError.success,
      errors: validationError.errors,
    });
    return;
  }

  const internalError = ApiError.internalError(error.message || "Internal server error");

  res.status(internalError.statusCode).json({
    ...new ApiResponse(internalError.data, internalError.message, internalError.statusCode),
    success: internalError.success,
    errors: internalError.errors,
  });
};
