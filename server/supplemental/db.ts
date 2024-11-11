import cardModel from "@models/card_model";
import moduleModel from "@models/module_model";
import config from "config";
import mongoose from "mongoose";

const dev = process.env.NODE_ENV !== "production";
const setting = dev ? "mongoURI_dev" : "mongoURI_prod";

const db: string = config.get(setting);

const updateCards = async () => {
  const modules = await moduleModel.find({});

  modules.forEach(async module => {
    const cards = await cardModel
      .find({ moduleID: module._id })
      .sort({ creation_date: 1 });

    cards.forEach(async (card, i) => {
      card.order = i;
      await card.save();
    });

    // console.log({ module, cards });
  });
};

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(db, {});

    console.log("MongoDB connected");

    await updateCards();

    console.log("Cards have been updated");
  } catch (err) {
    console.error(err);
    console.log("MongoDB failed to connect");
    process.exit(1);
  }
};

export default connectDB;
