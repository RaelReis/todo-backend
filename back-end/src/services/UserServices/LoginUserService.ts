import { User, UserModel } from "../../models/User";
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken";
import { GenerateToken } from "../../providers/GeneratetToken";
import { ResponseError } from "../../utils/errors";
import { passwordHash } from "../../utils/passwordHash";

export class LoginUserService {
  static async execute(username: string, password: string) {
    let errorMessage: string[] = [];

    if (!username) errorMessage.push("username");
    if (!password) errorMessage.push("password");

    if (errorMessage.length > 0)
      throw new ResponseError(`Paths ${errorMessage.join(", ")} are missing or invalid`, 400);

    const user = (await UserModel.findOne({ username }).populate("tasks")) as User | null;
    if (!user) throw new ResponseError("User or password invalid", 404);

    if (!passwordHash.compare(password, user.password)) throw new ResponseError("Invalid password", 401);

    const token = GenerateToken.execute(user.id);
    const refreshToken = await GenerateRefreshToken.execute(user.id);

    return { token, refreshToken };
  }
}
