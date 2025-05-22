import { Category } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type CategorySortObj = {
  [key in keyof Category]?: SortOrder;
};

const CategorySchema = new Schema<Category>({
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
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

// Add compound index for unique category names per user
CategorySchema.index({ user_id: 1, name: 1 }, { unique: true });

// Add individual indexes for performance
CategorySchema.index({ user_id: 1 });
CategorySchema.index({ name: 1 });

// Add validation to ensure category name is unique per user
CategorySchema.pre("save", async function () {
  if (this.isModified("name") || this.isNew) {
    const existingCategory = await categoryModel.findOne({
      user_id: this.user_id,
      name: { $regex: new RegExp(`^${this.name}$`, "i") },
      _id: { $ne: this._id },
    });

    if (existingCategory) {
      throw new Error("Category name must be unique for this user");
    }
  }
});

const categoryModel = mongoose.model<Category>("Categories", CategorySchema);

export default categoryModel;
