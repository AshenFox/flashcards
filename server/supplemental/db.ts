import config from "config";
import mongoose from "mongoose";

const db: string = config.get("mongoURI");

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
