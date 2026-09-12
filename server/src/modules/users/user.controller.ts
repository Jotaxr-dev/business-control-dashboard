import { Request, Response } from "express";
import { createUser } from "./user.services.js";

export async function createUserController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = await createUser(name, email, password);

  return res.status(201).json(user);
}
