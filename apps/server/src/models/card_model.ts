import { Card } from "@flashcards/common";
import mongoose, { SortOrder } from "mongoose";

import moduleModel from "./module_model";

const Schema = mongoose.Schema;

export type CardSortObj = {
  [key in keyof Card]?: SortOrder | { $meta: "textScore" };
} & {
  "tags.name"?: SortOrder;
  "tags._id"?: SortOrder;
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
  tags: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Tags", required: true },
      name: { type: String, required: true },
    },
  ],
});

// Add validation to ensure tags belong to the card author
CardSchema.pre("save", async function () {
  if (this.isModified("tags") && this.tags.length > 0) {
    const tagModel = (await import("./tag_model")).default;

    for (const tag of this.tags) {
      const existingTag = await tagModel.findOne({
        _id: tag._id,
        user_id: this.author_id,
      });

      if (!existingTag) {
        throw new Error(
          `Tag ${tag._id} does not belong to this user or does not exist`,
        );
      }

      // Ensure the name matches what's in the database
      if (existingTag.name !== tag.name) {
        throw new Error(`Tag name mismatch for ${tag._id}`);
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
