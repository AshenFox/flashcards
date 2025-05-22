import { Module } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

const Schema = mongoose.Schema;

export type ModuleSortObj = { [key in keyof Module]?: SortOrder } & {
  "categories.name"?: SortOrder;
  "categories._id"?: SortOrder;
};

const ModuleSchema = new Schema<Module>({
  title: String,
  author: String,
  author_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  numberSR: { type: Number, default: 0 },
  cards: [{ type: Schema.Types.ObjectId, ref: "Cards" }],
  creation_date: Date,
  draft: Boolean,
  categories: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Categories", required: true },
      name: { type: String, required: true },
    },
  ],
});

// Add validation to ensure categories belong to the module author
ModuleSchema.pre("save", async function () {
  if (this.isModified("categories") && this.categories.length > 0) {
    const categoryModel = (await import("./category_model")).default;

    for (const category of this.categories) {
      const existingCategory = await categoryModel.findOne({
        _id: category._id,
        user_id: this.author_id,
      });

      if (!existingCategory) {
        throw new Error(
          `Category ${category._id} does not belong to this user or does not exist`,
        );
      }

      // Ensure the name matches what's in the database
      if (existingCategory.name !== category.name) {
        throw new Error(`Category name mismatch for ${category._id}`);
      }
    }
  }
});

ModuleSchema.set("toObject", { virtuals: true });
ModuleSchema.set("toJSON", { virtuals: true });

const moduleModel = mongoose.model<Module>("Modules", ModuleSchema);

export default moduleModel;
