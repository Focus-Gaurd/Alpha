import { Schema as _Schema, connect, model } from "mongoose";
import mongoose from "mongoose";
import "dotenv/config";

const dbUrl = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await connect(dbUrl);
  console.log("Mongo Connection Open!!!");
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const userSchema = new _Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("User", userSchema);
