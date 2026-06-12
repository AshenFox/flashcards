import type {
  AuthFieldErrors,
  LogInFormData,
  SignUpFormData,
  UserDto,
} from "@flashcards/common";

export type AuthActionResult =
  | { success: true }
  | { success: false; fieldErrors: AuthFieldErrors };

export type AuthState = {
  user: UserDto | null;
};

export type AuthStore = AuthState & {
  setUser: (user: UserDto) => void;
  clearUser: () => void;
  logOut: () => void;
  logIn: (credentials: LogInFormData) => Promise<AuthActionResult>;
  signUp: (data: SignUpFormData) => Promise<AuthActionResult>;
};
