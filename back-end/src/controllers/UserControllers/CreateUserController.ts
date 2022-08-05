import { CreateUserService } from "../../services/UserServices/CreateUserService";
import { Request, Response } from "express";

export class CreateUserController {
  static async handle(req: Request, res: Response) {
    const { nickname, username, password } = req.body;

    const user = await CreateUserService.execute({ nickname, username, password });

    return res.status(201).json(user);
  }
}
