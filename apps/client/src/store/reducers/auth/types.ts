import { UserDto } from "@flashcards/common";
import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type AuthState = {
  user: UserDto;
  loading: boolean;
};

export type Subscription = {
  endpoint: string;
  expirationTime: null;
  key: {
    p256dh: string;
    auth: string;
  };
};

export type AuthCaseReducer<P = undefined> = CaseReducer<AuthState, Action<P>>;
