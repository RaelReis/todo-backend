import { Request, Response } from "express";
import { CreateTaskService } from "../../services/TaskServices/CreateTaskService";

export class CreateTaskController {
  static async handle(req: Request, res: Response) {
    const { title, description } = req.body;
    const user = req.user;

    const task = user && (await CreateTaskService.execute(user.id, title, description));

    return res.json(task);
  }
}
