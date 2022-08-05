import { sign } from "jsonwebtoken";

export class GenerateToken {
  static execute(userId: string | undefined) {
    const payload = {
      id: userId,
    };

    const token = sign(payload, process.env.JWT_SECRET || "", {
      subject: userId,
      expiresIn: "15m",
    });

    return token;
  }
}
