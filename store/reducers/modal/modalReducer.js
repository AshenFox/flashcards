import {
  CHANGE_MODAL,
  TOGGLE_MODAL,
  CONTROL_FIELD,
  ENTER,
  CHANGE_MODAL_LOADING,
  CHECK_FIELD,
  CLEAR_LOG_IN,
  CLEAR_SIGN_UP,
} from '../../actions/types';
import initialState from './modalInitState';

const ModalReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        is_modal: !state.is_modal,
      };

    case CHANGE_MODAL:
      return {
        ...state,
        active_modal: payload.active_modal,
      };

    case CONTROL_FIELD:
      return {
        ...state,
        [payload.field]: {
          ...state[payload.field],
          [payload.name]: payload.value,
        },
      };

    case CHANGE_MODAL_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case ENTER:
      return {
        ...state,
        ...payload,
      };

    case CHECK_FIELD:
      return {
        ...state,
        sign_up_errors: {
          ...state.sign_up_errors,
          ...payload,
        },
      };
    case CLEAR_LOG_IN:
      return {
        ...state,
        log_in: {
          username: '',
          password: '',
        },
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
      };

    case CLEAR_SIGN_UP:
      return {
        ...state,
        sign_up: {
          username: '',
          email: '',
          password: '',
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
    default:
      return state;
  }
};

export default ModalReducer;
