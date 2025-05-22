import { Card } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

import moduleModel from "./module_model";

const Schema = mongoose.Schema;

export type CardSortObj = {
  [key in keyof Card]?: SortOrder | { $meta: "textScore" };
} & {
  "categories.name"?: SortOrder;
  "categories._id"?: SortOrder;
};

const CardSchema = new Schema<Card>({
  moduleID: { type: Schema.Types.ObjectId, ref: "Modules", required: true },
  term: String,
  definition: String,
  imgurl: String,
  creation_date: Date,
  studyRegime: Boolean,
  stage: Number,
  nextRep: Date,
  prevStage: Date,
  lastRep: Date,
  author_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  author: String,
  categories: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Categories", required: true },
      name: { type: String, required: true },
    },
  ],
});

// Add validation to ensure categories belong to the card author
CardSchema.pre("save", async function () {
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

const cardModel = mongoose.model<Card>("Cards", CardSchema);

/**
 * Updates the numberSR field on a module to reflect the current count of cards in study regime
 * @param moduleId The ID of the module to update
 * @param authorId The ID of the author of the module and cards
 */
export async function updateModuleNumberSR(
  moduleId: mongoose.Types.ObjectId,
  authorId: mongoose.Types.ObjectId,
) {
  if (!moduleId || !authorId) return;

  const numberSR = await cardModel.countDocuments({
    moduleID: moduleId,
    author_id: authorId,
    studyRegime: true,
  });

  await moduleModel.updateOne(
    { _id: moduleId, author_id: authorId },
    { numberSR },
  );
}

export default cardModel;
