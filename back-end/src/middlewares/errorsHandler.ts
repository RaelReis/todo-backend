import express from "express";
import { ResponseError } from "../utils/errors";
import { ErrorName } from "../interfaces/mongooseErrors";

export const errorsHandler = (err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = Object.keys(err.keyValue).join(", ");
    error = new ResponseError(`Paths ${message} already exists`, 400);
  }

  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ResponseError(message, 400);
  }

  if (err.name === "ValidationError") {
    const paths = Object.values<ErrorName>(err.errors).map((el) => el.path);
    const message = `Paths ${paths.join(", ")} are missing or invalid`;
    error = new ResponseError(message, 400);
  }

  return res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
};
