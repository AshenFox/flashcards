import { AUTHENTICATE, CHANGE_AUTH_LOADING, LOG_OUT } from '../../types/types';
import initialState from './authInitState';

const AuthReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: payload,
      };

    case LOG_OUT:
      return {
        ...state,
      };

    case CHANGE_AUTH_LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
