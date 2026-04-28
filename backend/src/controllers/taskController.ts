import { Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { TaskStatus } from "../models/Task";
import { taskService } from "../services/taskService";

export const createTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required");
  }

  const { title, description } = req.body as {
    title: string;
    description?: string;
  };

  const task = await taskService.createTask(req.user.id, { title, description });

  res.status(201).json(new ApiResponse(task, "Task created successfully", 201));
});

export const getTasks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required");
  }

  const tasks = await taskService.getTasks(req.user.id);

  res.status(200).json(new ApiResponse(tasks, "Tasks fetched successfully", 200));
});

export const updateTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required");
  }

  const { title, description, status } = req.body as {
    title?: string;
    description?: string;
    status?: TaskStatus;
  };

  const task = await taskService.updateTask(req.user.id, req.params.id, {
    title,
    description,
    status,
  });

  res.status(200).json(new ApiResponse(task, "Task updated successfully", 200));
});

export const deleteTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required");
  }

  await taskService.deleteTask(req.user.id, req.params.id);

  res.status(200).json(new ApiResponse(null, "Task deleted successfully", 200));
});
