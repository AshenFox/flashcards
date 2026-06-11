import { env } from "@setup";
import mongoose from "mongoose";

const dev = env.NODE_ENV !== "production";
const db = dev ? env.MONGO_URI_DEV : env.MONGO_URI_PROD;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(db, {});

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    console.log("MongoDB failed to connect");
    process.exit(1);
  }
};

export default connectDB;
