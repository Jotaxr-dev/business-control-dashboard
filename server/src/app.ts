import express from "express";
import cors from "cors";
import { userRoutes } from "./modules/users/user.routes.js";

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

export { app };
