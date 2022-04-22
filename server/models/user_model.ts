import mongoose from 'mongoose';
import { PushSubscription } from 'web-push';

const Schema = mongoose.Schema;

export interface IUser {
  _id: string;
  server_id: string;
  username: string;
  email: string;
  password: string;
  registration_date: Date;
  subscriptions: {
    pc: PushSubscription;
    tablet: PushSubscription;
    mobile: PushSubscription;
  };
}

const userSchema = new Schema<IUser>({
  server_id: String,
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

const userModel = mongoose.model<IUser>('Users', userSchema);

export default userModel;
