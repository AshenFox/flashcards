import { User } from "@flashcards/common";
import mongoose, { Schema, Types } from "mongoose";

// Import moduleModel for the utility function
import moduleModel from "./module_model";

const UserSchema = new Schema<User>({
  username: String,
  email: String,
  password: String,
  registration_date: Date,
  subscriptions: [
    {
      _id: { type: Types.ObjectId, required: true },
      name: String,
      subscriptionDate: Date,
      subscriptionData: {
        endpoint: String,
        expirationTime: Number,
        keys: {
          p256dh: String,
          auth: String,
        },
      },
    },
  ],
  tags: {
    type: [String],
    select: false,
    default: [],
  },
});

const userModel = mongoose.model<User>("Users", UserSchema);

/**
 * Updates the user's tags array with unique tags from all their modules
 * @param userId The ID of the user to update
 */
export async function updateUserTags(userId: mongoose.Types.ObjectId) {
  if (!userId) return;

  try {
    // Get all modules for this user including draft modules
    const userModules = await moduleModel
      .find({
        author_id: userId,
      })
      .select("tags");

    // Collect all tags from all modules
    const allTags: string[] = [];
    userModules.forEach(module => {
      if (module.tags && Array.isArray(module.tags)) {
        allTags.push(...module.tags);
      }
    });

    // Get unique tags and sort them
    const uniqueTags = [...new Set(allTags)].sort();

    // Update user's tags
    await userModel.updateOne({ _id: userId }, { tags: uniqueTags });
  } catch (error) {
    console.error("Error updating user tags:", error);
  }
}

export default userModel;
