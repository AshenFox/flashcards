import { SET_DROPDOWN } from '../../types/types';
import initialState from './headerInitState';

const HeaderReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_DROPDOWN:
      return {
        ...state,
        dropdown_active: payload,
      };
    default:
      return state;
  }
};

export default HeaderReducer;
