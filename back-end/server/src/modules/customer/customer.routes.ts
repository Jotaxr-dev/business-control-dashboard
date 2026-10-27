import { Router } from "express";

import {
  createCustomerController,
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "./customer.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const customerRoutes = Router();

customerRoutes.post("/", authMiddleware, createCustomerController);
customerRoutes.get("/", authMiddleware, getCustomersController);
customerRoutes.get("/:id", authMiddleware, getCustomerByIdController);
customerRoutes.patch("/:id", authMiddleware, updateCustomerController);
customerRoutes.delete("/:id", authMiddleware, deleteCustomerController);

export { customerRoutes };
