import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { AuthenticatedRequest, UserRole } from "./auth.middleware.js";

export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authenticatedReq = req as AuthenticatedRequest;

    if (!allowedRoles.includes(authenticatedReq.role)) {
      throw new AppError("Você não tem permissão para realizar esta ação", 403);
    }

    next();
  };
}
