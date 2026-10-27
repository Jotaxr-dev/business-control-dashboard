import { Request, Response } from "express";
import { createUser } from "./user.services.js";
import { createUserSchema } from "./user.schema.js";

export async function createUserController(req: Request, res: Response) {
  const data = createUserSchema.parse(req.body);

  const user = await createUser(data.name, data.email, data.password);

  return res.status(201).json(user);
}
