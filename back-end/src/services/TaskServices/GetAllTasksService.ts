import { TaskModel } from "../../models/Task";

export class GetAllTasksService {
  static async execute(user_id: string) {
    const tasks = await TaskModel.find({ user_id });

    return tasks;
  }
}
