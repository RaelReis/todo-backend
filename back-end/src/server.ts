require("dotenv").config();
import express from "express";
import db from "./config/db";
import { routes } from "./routes/routes";

// Db connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create express app
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} 🚀`);
});

// Routes & middlewares
routes(app);
