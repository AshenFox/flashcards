import "./setup";

import cardModel from "@models/card_model";
import moduleModel from "@models/module_model";
import notificationModel from "@models/notification_model";
import { Types } from "mongoose";

/**
 * Database migration script to:
 * 1. Convert string IDs to ObjectIds in cards collection
 * 2. Remove 'order' field from cards
 * 3. Update modules with proper card references and remove legacy fields
 * 4. Convert string IDs to ObjectIds in notifications collection
 */
export async function migrate() {
  await migrateCards();
  await migrateModules();
  await migrateNotifications();
}

/**
 * Migrates the cards collection by:
 * - Converting moduleID and author_id to ObjectIds
 * - Removing the 'order' field
 */
async function migrateCards() {
  try {
    // Attempt bulk update using MongoDB 4.0+ aggregation pipeline
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
    console.log("Cards converted via aggregation:", res);
  } catch (e) {
    console.warn(
      "Bulk conversion via $toObjectId failed; falling back to iterative update.",
      e,
    );

    // Fallback: Update cards one by one
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
}

/**
 * Migrates the modules collection by:
 * - Converting author_id to ObjectId
 * - Setting up proper card references
 * - Removing legacy number/numberSR fields
 */
async function migrateModules() {
  const modules = await moduleModel.find().lean();
  console.log(`Found ${modules.length} modules to migrate`);

  for await (const mod of modules) {
    const modId = mod._id;

    // Get all cards for this module, sorted by old order
    const cards = await cardModel
      .find({ moduleID: modId.toString() })
      .sort({ order: 1 })
      .select("_id studyRegime")
      .lean();

    const newCardIds = cards.map(c => new Types.ObjectId(c._id));

    // Update module with new card references and remove legacy fields
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

    console.log(`Module ${modId} updated with ${newCardIds.length} cards`);
  }
}

/**
 * Migrates the notifications collection by:
 * - Converting _id and user_id to ObjectIds
 */
async function migrateNotifications() {
  try {
    // Attempt bulk update using MongoDB 4.0+ aggregation pipeline
    const res = await notificationModel.bulkWrite([
      {
        updateMany: {
          filter: {},
          update: [
            {
              $set: {
                user_id: { $toObjectId: "$user_id" },
              },
            },
          ],
        },
      },
    ]);
    console.log("Notifications converted via aggregation:", res);
  } catch (e) {
    console.warn(
      "Bulk conversion via $toObjectId failed; falling back to iterative update.",
      e,
    );

    // Fallback: Update notifications one by one
    const all = await notificationModel.find().select("_id user_id").lean();
    for (const n of all) {
      await notificationModel.updateOne(
        { _id: n._id },
        {
          $set: {
            user_id: new Types.ObjectId(n.user_id),
          },
        },
      );
    }
    console.log(`Iteratively converted ${all.length} notifications`);
  }
}
