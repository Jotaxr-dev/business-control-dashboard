import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Error interno do servidor",
  });
}
