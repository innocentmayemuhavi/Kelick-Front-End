import { handleError } from "@shared/index";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { code, ...errorResponse } = handleError(err) as {
    code: string;
    message: string;
    data: null;
  };
  const httpCode = [
    "auth/id-token-expired",
    "auth/id-token-revoked",
    "auth/unauthorized",
    "auth/argument-error",
  ].includes(code)
    ? 401
    : code === "server/error"
    ? 500
    : 200;
  res.status(httpCode).send(errorResponse);
};
