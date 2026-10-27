import { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { loginUser } from "./auth.services";

export async function loginController(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);

  const result = await loginUser(data.email, data.password);

  return res.status(200).json(result);
}
