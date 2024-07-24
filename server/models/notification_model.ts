import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Notification {
  _id: string;
  time: Date;
  number: number;
  user_id: string;
}

const NotificationSchema = new Schema<Notification>({
  time: Date,
  number: Number,
  user_id: String,
});

const notificationModel = mongoose.model<Notification>(
  "Notifications",
  NotificationSchema,
);

export default notificationModel;
