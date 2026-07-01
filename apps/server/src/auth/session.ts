import { SESSION_MAX_AGE_S, toUserDto, type UserDto } from "@flashcards/common";
import userModel from "@models/user_model";
import { env } from "@setup";
import jwt from "jsonwebtoken";

export const signAuthToken = (userId: unknown): string =>
  jwt.sign({ _id: userId }, env.JWT_SECRET, { expiresIn: SESSION_MAX_AGE_S });

/**
 * Resolve the current user from a session token: verify the signature, then
 * load the user. Returns the JSON-safe UserDto, or null when the token is
 * missing/invalid/expired or the user no longer exists.
 */
export const resolveUser = async (
  token: string | undefined,
): Promise<UserDto | null> => {
  if (!token) return null;
  try {
    const { _id } = jwt.verify(token, env.JWT_SECRET) as { _id: string };
    const user = await userModel.findOne({ _id });
    return user ? toUserDto(user) : null;
  } catch {
    return null;
  }
};

