import { Router } from "express";
import { createUserController } from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/", createUserController);

userRoutes.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Acesso autorizado",
    userId: (res as any).userId,
  });
});

export { userRoutes };
