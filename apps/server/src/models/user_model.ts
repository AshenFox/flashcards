import { User } from "@flashcards/common";
import mongoose, { Schema, Types } from "mongoose";

const UserSchema = new Schema<User>({
  username: String,
  email: String,
  password: String,
  registration_date: Date,
  subscriptions: [
    {
      _id: { type: Types.ObjectId, required: true },
      name: String,
      subscriptionDate: Date,
      subscriptionData: {
        endpoint: String,
        expirationTime: Number,
        keys: {
          p256dh: String,
          auth: String,
        },
      },
    },
  ],
});

const userModel = mongoose.model<User>("Users", UserSchema);

export default userModel;
