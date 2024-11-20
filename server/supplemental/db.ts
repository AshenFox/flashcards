// import cardModel from "@models/card_model";
// import moduleModel from "@models/module_model";
import config from "config";
import mongoose from "mongoose";

const dev = process.env.NODE_ENV !== "production";
const setting = dev ? "mongoURI_dev" : "mongoURI_prod";

const db: string = config.get(setting);

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
