import mongoose from "mongoose";
import { User } from "types/entities";

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
  username: String,
  email: String,
  password: String,
  registration_date: Date,
  subscriptions: {
    pc: Object,
    tablet: Object,
    mobile: Object,
  },
});

const userModel = mongoose.model<User>("Users", UserSchema);

export default userModel;
