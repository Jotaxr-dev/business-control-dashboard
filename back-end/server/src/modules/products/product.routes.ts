import { Router } from "express";
import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "./product.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.post("/", authMiddleware, createProductController);

productRoutes.get("/", authMiddleware, getProductsController);

productRoutes.get("/:id", authMiddleware, getProductByIdController);

productRoutes.patch("/:id", authMiddleware, updateProductController);

productRoutes.delete("/:id", authMiddleware, deleteProductController);

export { productRoutes };
