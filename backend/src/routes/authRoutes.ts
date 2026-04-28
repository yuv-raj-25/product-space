import { Router } from "express";

import { getCurrentUser, login, signup } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { validateLogin, validateSignup } from "../validators/authValidators";

const authRoutes = Router();

authRoutes.post("/signup", validateRequest(validateSignup), signup);
authRoutes.post("/login", validateRequest(validateLogin), login);
authRoutes.get("/me", authenticate, getCurrentUser);

export { authRoutes };

