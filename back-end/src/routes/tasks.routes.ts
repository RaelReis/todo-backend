import express from "express";
import { GetAllTasksController } from "../controllers/TaskControllers/GetAllTasksController";
import { CreateTaskController } from "../controllers/TaskControllers/CreateTaskController";
import { ensureUserAuth } from "../middlewares/ensureUserAuth";

const tasksRoute = express.Router();

tasksRoute
  .get("/tasks", ensureUserAuth, GetAllTasksController.handle)
  .post("/tasks", ensureUserAuth, CreateTaskController.handle);

export { tasksRoute };
