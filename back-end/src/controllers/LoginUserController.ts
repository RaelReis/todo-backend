import { Request, Response } from "express";
import { LoginUserService } from "../services/LoginUserService";

export class LoginUserController {
  static async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const token = await LoginUserService.execute(username, password);

    return res.status(201).json({token: token});
  }
}
