import "./setup";

import cardModel from "@models/card_model";
import moduleModel from "@models/module_model";
import { Types } from "mongoose";

// --- Migration Logic ---
export async function migrate() {
  //  A) Connect

  //  C) Now update all cards: convert moduleID to ObjectId and remove `order`
  const bulk = cardModel.collection.initializeUnorderedBulkOp();
  bulk.find({}).update({
    $set: {
      moduleID: { $toObjectId: "$moduleID" },
      author_id: { $toObjectId: "$author_id" },
    },
    $unset: { order: "" },
  });

  // Note: $toObjectId requires MongoDB 4.0+ and run via aggregation pipeline in update.
  // If $toObjectId in update is not supported, fall back to per-document:
  try {
    const res = await cardModel.bulkWrite([
      {
        updateMany: {
          filter: {},
          update: [
            {
              $set: {
                moduleID: { $toObjectId: "$moduleID" },
                author_id: { $toObjectId: "$author_id" },
              },
            },
            { $unset: "order" },
          ],
        },
      },
    ]);
    console.log(`Cards converted via aggregation:`, res);
  } catch (e) {
    console.warn(
      "Bulk conversion via $toObjectId failed; falling back to iterative update.",
      e,
    );
    const all = await cardModel.find().select("_id moduleID").lean();
    for (const c of all) {
      await cardModel.updateOne(
        { _id: c._id },
        {
          $set: {
            moduleID: new Types.ObjectId(c.moduleID),
            author_id: new Types.ObjectId(c.author_id),
          },
          $unset: { order: "" },
        },
      );
    }
    console.log(`Iteratively converted ${all.length} cards`);
  }
  //  B) Process each module one by one
  const modules = await moduleModel.find().lean();
  console.log(`Found ${modules.length} modules`);

  for await (const mod of modules) {
    const modId = mod._id;

    // 1. Fetch all cards belonging to this module, sorted by old `order`
    const cards = await cardModel
      .find({ moduleID: modId.toString() })
      .sort({ order: 1 })
      .select("_id studyRegime") // we only need _id (and maybe studyRegime for logging)
      .lean();

    const newCardIds = cards.map(c => new Types.ObjectId(c._id));

    // 2. Update the module: set `cards` to the new ObjectId array; remove number/numberSR
    await moduleModel.updateOne(
      { _id: modId },
      {
        $set: {
          cards: newCardIds,
          author_id: new Types.ObjectId(mod.author_id),
        },
        $unset: { number: "", numberSR: "" },
      },
    );
    console.log({ mod, "mod._id": mod._id });
    console.log(`→ Module ${modId} updated with ${newCardIds.length} cards`);
  }
}
