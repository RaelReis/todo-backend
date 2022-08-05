import express from "express";
import { CreateUserController } from "../controllers/UserControllers/CreateUserController";
import { LoginUserController } from "../controllers/UserControllers/LoginUserController";
import { RefreshTokenController } from "../controllers/RefreshTokenControllers/RefreshTokenController";
import { ensureUserAuth } from "../middlewares/ensureUserAuth";

const userRoute = express.Router();

userRoute
  .post("/refresh-token", ensureUserAuth, RefreshTokenController.handle)
  .post("/register", CreateUserController.handle)
  .post("/login", LoginUserController.handle);

export { userRoute };
