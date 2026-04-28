import { Request } from "express";

import { TaskStatus } from "../models/Task";

const isTaskStatus = (value: string): value is TaskStatus => {
  return Object.values(TaskStatus).includes(value as TaskStatus);
};

export const validateCreateTask = [
  (req: Request) => {
    const { title } = req.body as { title?: unknown };
    if (typeof title !== "string" || !title.trim()) {
      return "Title is required";
    }
    if (title.trim().length > 150) {
      return "Title must not exceed 150 characters";
    }
    return null;
  },
  (req: Request) => {
    const { description } = req.body as { description?: unknown };
    if (description !== undefined && typeof description !== "string") {
      return "Description must be a string";
    }
    if (typeof description === "string" && description.trim().length > 5000) {
      return "Description must not exceed 5000 characters";
    }
    return null;
  },
];

export const validateUpdateTask = [
  (req: Request) => {
    const { title, description, status } = req.body as {
      title?: unknown;
      description?: unknown;
      status?: unknown;
    };

    if (title === undefined && description === undefined && status === undefined) {
      return "At least one field is required to update a task";
    }

    return null;
  },
  (req: Request) => {
    const { title } = req.body as { title?: unknown };
    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      return "Title must be a non-empty string";
    }
    if (typeof title === "string" && title.trim().length > 150) {
      return "Title must not exceed 150 characters";
    }
    return null;
  },
  (req: Request) => {
    const { description } = req.body as { description?: unknown };
    if (description !== undefined && typeof description !== "string") {
      return "Description must be a string";
    }
    if (typeof description === "string" && description.trim().length > 5000) {
      return "Description must not exceed 5000 characters";
    }
    return null;
  },
  (req: Request) => {
    const { status } = req.body as { status?: unknown };
    if (status !== undefined && (typeof status !== "string" || !isTaskStatus(status))) {
      return "Status must be either Pending or Completed";
    }
    return null;
  },
];
