import {
  CHANGE_MODAL,
  CLEAR_LOG_IN,
  CLEAR_SIGN_UP,
  CONTROL_FIELD,
  TOGGLE_MODAL,
} from "../types/types";
import {
  ModalInputFileds,
  ModalType,
} from "./../reducers/modal/modalInitState";
import { AppActions } from "./../types/types";

// CLEAR_LOG_IN
export const clear_log_in = (): AppActions => ({
  type: CLEAR_LOG_IN,
});

// CLEAR_SIGN_UP
export const clear_sign_up = (): AppActions => ({
  type: CLEAR_SIGN_UP,
});

// TOGGLE_MODAL
export const toggle_modal = (): AppActions => ({
  type: TOGGLE_MODAL,
});

// CHANGE_MODAL
export const change_modal = (active_modal: ModalType): AppActions => {
  return {
    type: CHANGE_MODAL,
    payload: {
      active_modal,
    },
  };
};

// CONTROL_FIELD
export const control_field = (
  field: ModalType,
  name: string,
  value: string,
): AppActions => {
  if (name === "username" || name === "password" || name === "email")
    return {
      type: CONTROL_FIELD,
      payload: {
        field,
        name,
        value,
      },
    };
};
