import { Router } from "express";
import { createUserController } from "./user.controller.js";

const userRoutes = Router();

userRoutes.post("/", createUserController);

export { userRoutes };
