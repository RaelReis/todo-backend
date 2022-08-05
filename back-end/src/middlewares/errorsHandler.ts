import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/errors";

export const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = Object.keys(err.keyValue).join(", ");
    error = new ResponseError(`Paths ${message} already exists`, 400);
  }

  if (err.name === "CastError") {
    console.log(err);
    const message = "Resource not found";
    error = new ResponseError(message, 400);
  }

  if (err.name === "ValidationError") {
    const paths = Object.values<any>(err.errors).map((el) => el.path);
    const message = `Paths ${paths.join(", ")} are missing or invalid`;
    error = new ResponseError(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ResponseError(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Expired token";
    error = new ResponseError(message, 401);
  }

  return res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
};
