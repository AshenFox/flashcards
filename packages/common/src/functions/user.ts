import type { User, UserDto } from "@common/types";

/**
 * Convert a server-side `User` (Mongoose document shape: ObjectId / Date) into
 * the JSON-serializable `UserDto` the client consumes (string id / ISO dates).
 * This is the conversion JSON serialization performs at runtime anyway, made
 * explicit so the wire shape is type-checked instead of cast away.
 *
 * The password hash is never sent — it is blanked here.
 */
export const toUserDto = (user: User): UserDto => ({
  _id: user._id.toString(),
  username: user.username,
  email: user.email,
  password: "",
  registration_date: new Date(user.registration_date).toISOString(),
  subscriptions: user.subscriptions.map(subscription => ({
    _id: subscription._id.toString(),
    name: subscription.name,
    subscriptionDate: new Date(subscription.subscriptionDate).toISOString(),
    subscriptionData: subscription.subscriptionData,
  })),
});
