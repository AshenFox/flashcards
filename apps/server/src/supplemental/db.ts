import mongoose from "mongoose";

const dev = process.env.NODE_ENV !== "production";
const db = (dev ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD) as string;

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
