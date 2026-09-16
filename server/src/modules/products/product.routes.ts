import { Router } from "express";
import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
} from "./product.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.post("/", authMiddleware, createProductController);

productRoutes.get("/", authMiddleware, getProductsController);

productRoutes.get("/:id", authMiddleware, getProductByIdController);

productRoutes.patch("/:id", authMiddleware, updateProductController);

export { productRoutes };
