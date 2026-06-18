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

// Login looks users up by username; signup checks both username and email for
// uniqueness (see checks.ts). Unique indexes enforce that at the DB level too,
// closing the race window in the app-level findOne checks. `sparse` skips docs
// missing the field, so legacy/imported users without a username/email don't
// collide on a null key (which would otherwise fail the whole index build).
UserSchema.index({ username: 1 }, { unique: true, sparse: true });
UserSchema.index({ email: 1 }, { unique: true, sparse: true });

const userModel = mongoose.model<User>("Users", UserSchema);

export default userModel;
