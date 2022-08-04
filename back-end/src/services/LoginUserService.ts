import { ResponseError } from "../utils/errors";
import { passwordHash } from "../utils/passwordHash";
import { UserModel } from "../models/User";
import { JWTGenerator } from "../utils/jwt";

export class LoginUserService {
  static async execute(username: string, password: string) {
    let errorMessage: string[] = [];

    if (!username) errorMessage.push("username");
    if (!password) errorMessage.push("password");

    if (errorMessage.length > 0)
      throw new ResponseError(`Paths ${errorMessage.join(", ")} are missing or invalid`, 400);

    const user = await UserModel.findOne({ username });

    if (!user) throw new ResponseError("User not found", 404);
    if (!passwordHash.compare(password, user.password)) throw new ResponseError("Invalid password", 401);

    const token = JWTGenerator(user);

    return token;
  }
}
