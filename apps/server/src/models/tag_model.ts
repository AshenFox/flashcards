import { Tag } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type TagSortObj = {
  [key in keyof Tag]?: SortOrder;
};

const TagSchema = new Schema<Tag>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

// Add compound index for unique tag names per user
TagSchema.index({ user_id: 1, name: 1 }, { unique: true });

// Add individual indexes for performance
TagSchema.index({ user_id: 1 });
TagSchema.index({ name: 1 });

// Add validation to ensure tag name is unique per user
TagSchema.pre("save", async function () {
  if (this.isModified("name") || this.isNew) {
    const existingTag = await tagModel.findOne({
      user_id: this.user_id,
      name: { $regex: new RegExp(`^${this.name}$`, "i") },
      _id: { $ne: this._id },
    });

    if (existingTag) {
      throw new Error("Tag name must be unique for this user");
    }
  }
});

const tagModel = mongoose.model<Tag>("Tags", TagSchema);

export default tagModel;
