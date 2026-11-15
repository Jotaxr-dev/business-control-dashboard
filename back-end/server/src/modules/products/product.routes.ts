import { Router } from "express";
import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "./product.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const productRoutes = Router();

productRoutes.post(
  "/",
  authMiddleware,
  authorizeRoles("OWNER", "ADMIN"),
  createProductController,
);

productRoutes.get("/", authMiddleware, getProductsController);

productRoutes.get("/:id", authMiddleware, getProductByIdController);

productRoutes.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("OWNER", "ADMIN"),
  updateProductController,
);

productRoutes.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("OWNER", "ADMIN"),
  deleteProductController,
);

export { productRoutes };
