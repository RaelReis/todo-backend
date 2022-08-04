import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const JWTGenerator = (user: User) => {
  const payload = {
    id: user,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    subject: user.id,
    expiresIn: "15m",
  });

  return token;
};
