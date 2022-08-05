import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ResponseError } from "../utils/errors";

export const ensureUserAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ResponseError("JWT token is missing", 401);
  }

  const token = authHeader.split(" ")[1];

  const decoded = verify(token, process.env.JWT_SECRET || "");

  const { sub } = decoded as { sub: string };

  req.user = {
    id: sub,
  };
  return next();
};
