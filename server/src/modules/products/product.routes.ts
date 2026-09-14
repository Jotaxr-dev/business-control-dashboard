import { Router } from "express";
import {
  createProductController,
  getProductsController,
  getProductByIdController,
} from "./product.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.post("/", authMiddleware, createProductController);

productRoutes.get("/", authMiddleware, getProductsController);

productRoutes.get("/:id", authMiddleware, getProductByIdController);

export { productRoutes };
