import "express-async-errors";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import { userRoute } from "./user.routes";
import { tasksRoute } from "./tasks.routes";
import { errorsHandler } from "../middlewares/errorsHandler";

const routes = (app: Application) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send({
      message: "Hello World!",
    });
  });

  app.use(express.json(), cors(), userRoute, tasksRoute, errorsHandler);
};

export { routes };
