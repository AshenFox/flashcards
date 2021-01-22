import {
  CHANGE_MODAL,
  TOGGLE_MODAL,
  CONTROL_FIELD,
  CLEAR_LOG_IN,
  CLEAR_SIGN_UP,
} from './types';

// CLEAR_LOG_IN
export const clear_log_in = () => ({
  type: CLEAR_LOG_IN,
});

// CLEAR_SIGN_UP
export const clear_sign_up = () => ({
  type: CLEAR_SIGN_UP,
});

// TOGGLE_MODAL
export const toggle_modal = () => ({
  type: TOGGLE_MODAL,
});

// CHANGE_MODAL
export const change_modal = (active_modal) => {
  return {
    type: CHANGE_MODAL,
    payload: {
      active_modal,
    },
  };
};

// CONTROL_FIELD
export const control_field = (field, name, value) => {
  return {
    type: CONTROL_FIELD,
    payload: {
      field,
      name,
      value,
    },
  };
};
