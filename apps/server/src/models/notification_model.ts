import { Notification } from "@flashcards/common";
import mongoose from "mongoose";

import { userModelName } from "./user_model";

const Schema = mongoose.Schema;

export const notificationModelName = "Notifications";

const NotificationSchema = new Schema<Notification>({
  time: Date,
  number: Number,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: userModelName,
    required: true,
  },
});

const notificationModel = mongoose.model<Notification>(
  notificationModelName,
  NotificationSchema,
);

export default notificationModel;
