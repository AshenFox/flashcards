import { HeaderActions } from './../../types/types';
import { SET_DROPDOWN } from '../../types/types';
import initialState, { HeaderState } from './headerInitState';

const HeaderReducer = (state = initialState, action: HeaderActions): HeaderState => {
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
