import { GET_SR_COUNT, SET_SR_LOADING, SET_SR_COUNTER } from '../../actions/types';
import initialState from './srInitState';

const SrReducer = (state = initialState, action) => {
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
