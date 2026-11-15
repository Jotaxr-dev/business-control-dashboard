import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

type UserRole = "OWNER" | "ADMIN" | "MEMBER";

export interface AuthenticatedRequest extends Request {
  userId: number;
  companyId: number;
  role: UserRole;
}

function isValidRole(role: unknown): role is UserRole {
  return role === "OWNER" || role === "ADMIN" || role === "MEMBER";
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new AppError("Token inválido", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    const userId = Number(decoded.sub);
    const companyId = decoded.companyId;
    const role = decoded.role;

    if (
      !Number.isSafeInteger(userId) ||
      userId <= 0 ||
      !Number.isSafeInteger(companyId) ||
      companyId <= 0 ||
      !isValidRole(role)
    ) {
      throw new AppError("Token inválido", 401);
    }

    const authenticatedReq = req as AuthenticatedRequest;

    authenticatedReq.userId = userId;
    authenticatedReq.companyId = companyId;
    authenticatedReq.role = role;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Token inválido ou expirado", 401);
  }
}
