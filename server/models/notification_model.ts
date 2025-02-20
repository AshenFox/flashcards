import mongoose from "mongoose";
import { Notification } from "types/entities";

const Schema = mongoose.Schema;

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
