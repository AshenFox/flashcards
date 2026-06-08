import { UserDto } from "@flashcards/common";

export type ErrorsArr = string[];

export type ErrorObj = {
  ok: boolean;
  errors: ErrorsArr;
};

export type LogInErrors = {
  ok: boolean;
  username: ErrorObj;
  password: ErrorObj;
};

export type SignUpErrors = {
  ok: boolean;
  username: ErrorObj;
  password: ErrorObj;
  email: ErrorObj;
};

export type AuthState = {
  user: UserDto | null;
};

export type AuthStore = AuthState & {
  setUser: (user: UserDto) => void;
  clearUser: () => void;
  logOut: () => void;
  logIn: (credentials: {
    username: string;
    password: string;
  }) => Promise<LogInErrors>;
  signUp: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<SignUpErrors>;
};
