import { Router } from "express";
import {
  createProductController,
  getProductsController,
} from "./product.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.post("/", authMiddleware, createProductController);

productRoutes.get("/", authMiddleware, getProductsController);

export { productRoutes };
