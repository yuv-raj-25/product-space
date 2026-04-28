import cors from "cors";
import express from "express";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };

