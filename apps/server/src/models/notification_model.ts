import { Notification } from "@flashcards/common";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotificationSchema = new Schema<Notification>({
  time: Date,
  number: Number,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

// Poller scans { time: { $lt: now } } every 5s; sr lookups query by user_id.
NotificationSchema.index({ time: 1 });
NotificationSchema.index({ user_id: 1 });

const notificationModel = mongoose.model<Notification>(
  "Notifications",
  NotificationSchema,
);

export default notificationModel;
