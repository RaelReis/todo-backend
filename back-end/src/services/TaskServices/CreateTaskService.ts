import { TaskModel } from "../../models/Task";
import { UserModel } from "../../models/User";
import { ResponseError } from "../../utils/errors";

export class CreateTaskService {
  static async execute(user_id: string, title: string, description: string) {
    const task = await TaskModel.create({ user_id, title, description });
    if (!task) throw new ResponseError("Error on create task", 400);

    const user = await UserModel.findByIdAndUpdate(user_id, { $push: { tasks: task } });
    if (!user) throw new ResponseError("User not found", 404);

    return task;
  }
}
