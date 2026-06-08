import { UserDto } from "@flashcards/common";

export type AuthState = {
  user: UserDto | null;
};

export type AuthStore = AuthState & {
  setUser: (user: UserDto) => void;
  clearUser: () => void;
  logOut: () => void;
};
