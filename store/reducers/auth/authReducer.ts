import { AuthActions } from './../../types/types';
import { AUTHENTICATE, CHANGE_AUTH_LOADING, LOG_OUT } from '../../types/types';
import initialState, { AuthState } from './authInitState';

const AuthReducer = (state = initialState, action: AuthActions): AuthState => {
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
