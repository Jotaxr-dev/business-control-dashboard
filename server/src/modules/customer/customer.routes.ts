import { Router } from "express";

import {
  createCustomerController,
  getCustomersController,
} from "./customer.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const customerRoutes = Router();

customerRoutes.post("/", authMiddleware, createCustomerController);
customerRoutes.get("/", authMiddleware, getCustomersController);

export { customerRoutes };
