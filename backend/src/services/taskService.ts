import { Task, TaskStatus } from "../models/Task";
import { ApiError } from "../utils/ApiError";

interface CreateTaskInput {
  title: string;
  description?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

const parseTaskId = (value: unknown): number => {
  if (typeof value !== "string") {
    throw ApiError.badRequest("Invalid task id");
  }

  const taskId = Number(value);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    throw ApiError.badRequest("Invalid task id");
  }

  return taskId;
};

const createTask = async (userId: number, { title, description }: CreateTaskInput) => {
  return Task.create({
    title: title.trim(),
    description: description?.trim() || null,
    status: TaskStatus.Pending,
    userId,
  });
};

const getTasks = async (userId: number) => {
  return Task.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

const updateTask = async (userId: number, taskIdParam: unknown, updates: UpdateTaskInput) => {
  const taskId = parseTaskId(taskIdParam);

  const task = await Task.findOne({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw ApiError.notFound("Task not found");
  }

  const { title, description, status } = updates;

  if (typeof title === "string") {
    task.title = title.trim();
  }

  if (typeof description === "string") {
    task.description = description.trim() || null;
  }

  if (typeof status === "string") {
    task.status = status;
  }

  await task.save();

  return task;
};

const deleteTask = async (userId: number, taskIdParam: unknown) => {
  const taskId = parseTaskId(taskIdParam);

  const deletedCount = await Task.destroy({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!deletedCount) {
    throw ApiError.notFound("Task not found");
  }
};

export const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

