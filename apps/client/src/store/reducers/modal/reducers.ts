import {
  defaultLogIn,
  defaultLogInErrors,
  defaultSignUp,
  defaultSignUpErrors,
} from "./initState";
import {
  LogInErrors,
  ModalCaseReducer,
  ModalInputFields,
  ModalType,
  SignUpErrors,
} from "./types";

export const enterReducer: ModalCaseReducer<{
  log_in_errors?: LogInErrors;
  sign_up_errors?: SignUpErrors;
}> = (state, action) => {
  Object.assign(state, action.payload);
};

export const toggleModal: ModalCaseReducer = (state, _action) => {
  state.is_modal = !state.is_modal;
};

export const changeModal: ModalCaseReducer<{
  active_modal: ModalType;
}> = (state, action) => {
  state.active_modal = action.payload.active_modal;
};

export const controlField: ModalCaseReducer<{
  field: ModalType;
  name: ModalInputFields;
  value: string;
}> = (state, action) => {
  const { field, name, value } = action.payload;
  state[field] = {
    ...state[field],
    [name]: value,
  };
};

export const changeModalLoading: ModalCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.loading = action.payload.value;
};

export const clearLogIn: ModalCaseReducer = (state, _action) => {
  state.log_in = defaultLogIn;
  state.log_in_errors = defaultLogInErrors;
};

export const checkFieldReducer: ModalCaseReducer<
  SignUpErrors & { type: string }
> = (state, action) => {
  const { payload } = action;
  state.sign_up_errors = {
    ...state.sign_up_errors,
    ok: payload.ok,
    [payload.type]: payload[payload.type],
  };
};

export const clearSignUp: ModalCaseReducer = (state, _action) => {
  state.sign_up = defaultSignUp;
  state.sign_up_errors = defaultSignUpErrors;
};
