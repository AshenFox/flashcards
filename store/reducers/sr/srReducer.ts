import { SrActions } from './../../types/types';
import { GET_SR_COUNT, SET_SR_LOADING, SET_SR_COUNTER } from '../../types/types';
import initialState, { SrState } from './srInitState';

const SrReducer = (state = initialState, action: SrActions): SrState => {
  const { payload, type } = action;

  switch (type) {
    case GET_SR_COUNT:
      return {
        ...state,
        ...payload,
        counter: payload.repeat_num > 999 ? 999 : payload.repeat_num,
      };

    case SET_SR_LOADING:
      return {
        ...state,
        loading: payload.value,
      };

    case SET_SR_COUNTER:
      return {
        ...state,
        counter: payload.value,
      };

    default:
      return state;
  }
};

export default SrReducer;
