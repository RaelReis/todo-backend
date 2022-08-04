import mongoose from "mongoose";

export interface User {
  id?: string;
  nickname: string;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", UserSchema);
