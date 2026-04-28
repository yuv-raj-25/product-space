import { apiRequest } from "../lib/api";
import { Task, TaskStatus } from "../types/task";

export const taskService = {
  list: async (token: string) => {
    const response = await apiRequest<Task[]>("/tasks", {
      method: "GET",
      token,
    });

    return response.data;
  },

  create: async (token: string, title: string, description: string) => {
    const response = await apiRequest<Task>("/tasks", {
      method: "POST",
      token,
      body: JSON.stringify({ title, description }),
    });

    return response.data;
  },

  updateStatus: async (token: string, taskId: number, status: TaskStatus) => {
    const response = await apiRequest<Task>(`/tasks/${taskId}`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ status }),
    });

    return response.data;
  },

  delete: async (token: string, taskId: number) => {
    await apiRequest<null>(`/tasks/${taskId}`, {
      method: "DELETE",
      token,
    });
  },
};

