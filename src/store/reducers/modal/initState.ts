import { LogIn, LogInErrors, ModalState, SignUp, SignUpErrors } from "./types";

export const defaultLogIn: LogIn = {
  username: "",
  password: "",
};
export const defaultLogInErrors: LogInErrors = {
  ok: true,
  username: {
    ok: true,
    errors: [],
  },
  password: {
    ok: true,
    errors: [],
  },
};

export const defaultSignUp: SignUp = {
  username: "",
  email: "",
  password: "",
};
export const defaultSignUpErrors: SignUpErrors = {
  ok: false,
  username: {
    ok: true,
    errors: [],
  },
  password: {
    ok: true,
    errors: [],
  },
  email: {
    ok: true,
    errors: [],
  },
};

const modalInitState: ModalState = {
  is_modal: false,
  active_modal: null,

  log_in: defaultLogIn,
  log_in_errors: defaultLogInErrors,

  sign_up: defaultSignUp,
  sign_up_errors: defaultSignUpErrors,

  loading: false,
};

export default modalInitState;
