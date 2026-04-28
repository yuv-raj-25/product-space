import { Router } from "express";

import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";
import { authenticate } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { validateCreateTask, validateUpdateTask } from "../validators/taskValidators";

const taskRoutes = Router();

taskRoutes.use(authenticate);
taskRoutes.get("/", getTasks);
taskRoutes.post("/", validateRequest(validateCreateTask), createTask);
taskRoutes.patch("/:id", validateRequest(validateUpdateTask), updateTask);
taskRoutes.delete("/:id", deleteTask);

export { taskRoutes };

