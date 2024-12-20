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

export type ModalType = "log_in" | "sign_up" | "delete";

export type ModalInputFields = "username" | "password" | "email";

export type ModalState = {
  is_modal: boolean;
  active_modal: ModalType;
  log_in: {
    username: string;
    password: string;
  };
  sign_up: {
    username: string;
    email: string;
    password: string;
  };
  loading: boolean;
  log_in_errors: LogInErrors;
  sign_up_errors: SignUpErrors;
};

const modalInitState: ModalState = {
  is_modal: false,
  active_modal: null,
  log_in: {
    username: "",
    password: "",
  },
  sign_up: {
    username: "",
    email: "",
    password: "",
  },
  loading: false,

  log_in_errors: {
    ok: true,
    username: {
      ok: true,
      errors: [],
    },
    password: {
      ok: true,
      errors: [],
    },
  },

  sign_up_errors: {
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
  },
};

export default modalInitState;
