import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
import { RefreshTokenModel } from "../models/RefreshToken";
import { User, UserModel } from "../models/User";

export class GenerateRefreshToken {
  static async execute(userId: string | undefined) {
    const days = dayjs().add(7, "days").unix();

    const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET || "", {
      expiresIn: days,
    });

    const dbRefreshToken = await RefreshTokenModel.create({
      userId,
      expiresAt: days,
      user: userId,
    });

    if (!dbRefreshToken) throw new Error("Error on create refresh token");

    const { refresh_token } = (await UserModel.findOne({ _id: userId }).populate("refresh_token")) as User;
    
    await RefreshTokenModel.findByIdAndDelete(refresh_token?.id);
    await UserModel.findByIdAndUpdate(userId, { $set: { refresh_token: dbRefreshToken._id } });

    return refreshToken;
  }
}
