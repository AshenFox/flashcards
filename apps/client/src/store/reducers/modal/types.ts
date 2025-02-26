import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

export type ErrorsArr = string[];

export type ErrorObj = {
  ok: boolean;
  errors: ErrorsArr;
};

export type LogIn = {
  username: string;
  password: string;
};
export type LogInErrors = {
  ok: boolean;
  username: ErrorObj;
  password: ErrorObj;
};

export type SignUp = {
  username: string;
  email: string;
  password: string;
};
export type SignUpErrors = {
  ok: boolean;
  username: ErrorObj;
  password: ErrorObj;
  email: ErrorObj;
};

export type ModalType = "log_in" | "sign_up" | "delete";

export type ModalInputFields = "username" | "password" | "email";

export type ModalState = {
  is_modal: boolean;
  active_modal: ModalType;

  log_in: LogIn;
  log_in_errors: LogInErrors;

  sign_up: SignUp;
  sign_up_errors: SignUpErrors;

  loading: boolean;
};

export type ModalCaseReducer<P = undefined> = CaseReducer<
  ModalState,
  Action<P>
>;
