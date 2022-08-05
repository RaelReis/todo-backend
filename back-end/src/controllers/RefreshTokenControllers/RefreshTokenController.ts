import { Request, Response } from "express";
import { RefreshTokenService } from "../../services/RefreshTokenService/RefreshTokenService";

export class RefreshTokenController {
  static async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const { token, refreshToken } = await RefreshTokenService.execute(refresh_token);

    return res.json({ token, refreshToken });
  }
}
