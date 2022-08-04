import express from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { LoginUserController } from './../controllers/LoginUserController';

const userRoute = express.Router();

userRoute
  .post("/register", CreateUserController.handle)
  .post("/login", LoginUserController.handle);

export { userRoute };
