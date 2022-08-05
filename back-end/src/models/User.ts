import mongoose from "mongoose";
import { RefreshToken } from "./RefreshToken";
import { Task } from "./Task";

export interface User {
  id?: string;
  nickname: string;
  username: string;
  password: string;
  tasks?: Task[];
  refresh_token?: RefreshToken;
}

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  refresh_token: { type: mongoose.Schema.Types.ObjectId, ref: "RefreshToken" },
});

export const UserModel = mongoose.model("User", UserSchema);
