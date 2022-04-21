// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface INotification {
  _id: string;
  time: Date;
  number: number;
  user_id: string;
}

const notificationSchema = new Schema<INotification>({
  time: Date,
  number: Number,
  user_id: String,
});

const notificationModel = mongoose.model<INotification>(
  'Notifications',
  notificationSchema
);

export default notificationModel;
