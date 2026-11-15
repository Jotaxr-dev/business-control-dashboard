import { Router } from "express";
import {
  createCustomerController,
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "./customer.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const customerRoutes = Router();

customerRoutes.post(
  "/",
  authMiddleware,
  authorizeRoles("OWNER", "ADMIN"),
  createCustomerController,
);

customerRoutes.get("/", authMiddleware, getCustomersController);

customerRoutes.get("/:id", authMiddleware, getCustomerByIdController);

customerRoutes.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("OWNER", "ADMIN"),
  updateCustomerController,
);

customerRoutes.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("OWNER", "ADMIN"),
  deleteCustomerController,
);

export { customerRoutes };
