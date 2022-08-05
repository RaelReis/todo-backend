import mongoose from "mongoose";

export interface Task {
  id?: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

const TaskSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const TaskModel = mongoose.model("Task", TaskSchema);
