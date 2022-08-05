import { Request, Response } from "express";
import { LoginUserService } from "../../services/UserServices/LoginUserService";

export class LoginUserController {
  static async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const { token, refreshToken } = await LoginUserService.execute(username, password);

    return res.status(201).json({ token: token, refreshToken: refreshToken });
  }
}
