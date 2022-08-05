import { Request, Response } from "express";
import { GetAllTasksService } from "../../services/TaskServices/GetAllTasksService";

export class GetAllTasksController {
  static async handle(req: Request, res: Response) {
    const user = req.user;

    const tasks = user && (await GetAllTasksService.execute(user.id));

    return res.json(tasks);
  }
}
