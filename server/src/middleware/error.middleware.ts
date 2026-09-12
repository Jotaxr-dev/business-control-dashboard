import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

function isPrismaKnownError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  );
}

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

  if (isPrismaKnownError(error) && error.code === "P2002") {
    return res.status(409).json({
      message: "E-mail já cadastrado",
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}
