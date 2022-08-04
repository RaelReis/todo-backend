import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI || "");

const db = mongoose.connection;

export default db;
