import express from "express";
import cors from "cors";
import { userRoutes } from "./modules/users/user.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { productRoutes } from "./modules/products/product.routes.js";
import { customerRoutes } from "./modules/customer/customer.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Business Control API is running",
  });
});

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/customers", customerRoutes);

app.use(errorMiddleware);

export { app };
