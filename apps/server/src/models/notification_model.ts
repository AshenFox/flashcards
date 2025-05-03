import { Notification } from "@flashcards/common";
import mongoose from "mongoose";

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
