import { UserModel, User } from "../../models/User";
import { passwordHash } from "../../utils/passwordHash";
import { ResponseError } from "../../utils/errors";

export class CreateUserService {
  static async execute({ nickname, username, password }: User) {
    let errorMessage: string[] = [];

    if (!nickname) errorMessage.push("nickname");
    if (!username) errorMessage.push("username");
    if (!password) errorMessage.push("password");

    if (errorMessage.length > 0)
      throw new ResponseError(`Paths ${errorMessage.join(", ")} are missing or invalid`, 400);

    const hashPassword = passwordHash.create(password);

    const user = await UserModel.create({
      nickname,
      username,
      password: hashPassword,
    });

    return user;
  }
}
