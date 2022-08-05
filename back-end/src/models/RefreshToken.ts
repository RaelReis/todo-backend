import mongoose from "mongoose";
import { User } from "./User";

export interface RefreshToken {
  id?: string;
  userId: string;
  user: User;
  expiresAt: number;
}

const RefreshTokenSchema = new mongoose.Schema({
  expiresAt: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: String, required: true },
});

export const RefreshTokenModel = mongoose.model("RefreshToken", RefreshTokenSchema);
