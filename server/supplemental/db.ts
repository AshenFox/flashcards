import config from "config";
import mongoose from "mongoose";

const db: string = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
