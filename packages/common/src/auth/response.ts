import type { UserDto } from "@common/types";

export type AuthFieldErrors = Partial<
  Record<"username" | "email" | "password", string[]>
>;

export type AuthResponse = {
  user?: UserDto;
  fieldErrors?: AuthFieldErrors;
};
