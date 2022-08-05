import dayjs from "dayjs";
import { verify } from "jsonwebtoken";
import { RefreshTokenModel } from "../../models/RefreshToken";
import { User, UserModel } from "../../models/User";
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken";
import { GenerateToken } from "../../providers/GeneratetToken";
import { ResponseError } from "../../utils/errors";

export class RefreshTokenService {
  static async execute(refreshToken: string) {
    const decode = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "");

    const { userId } = decode as { userId: string };

    const { refresh_token } = (await UserModel.findOne({ userId }).populate("refresh_token")) as User;
    if (!refresh_token) throw new ResponseError("Refresh token invalid", 401);

    const refreshTokenExpired = dayjs().isAfter(dayjs(refresh_token?.expiresAt));

    // If refresh token expired, delete it and generate new one
    if (refreshTokenExpired) {
      await UserModel.findByIdAndUpdate(userId, { $set: { refresh_token: null } });
      await RefreshTokenModel.findByIdAndDelete(refresh_token.id);

      const token = GenerateToken.execute(userId);
      const newRefreshToken = await GenerateRefreshToken.execute(userId);

      return { token, refreshToken: newRefreshToken };
    }

    const token = GenerateToken.execute(userId);

    return { token };
  }
}
