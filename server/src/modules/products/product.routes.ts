import { Router } from "express";
import { createProductController } from "./product.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.post("/", authMiddleware, createProductController);

export { productRoutes };
