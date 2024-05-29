import { SET_HEADER_DIMEN } from "../../types";
import { DimenActions } from "../../types";
import initialState, { DimenState } from "./dimenInitState";

const DimenReducer = (
  state = initialState,
  action: DimenActions,
): DimenState => {
  const { payload, type } = action;

  switch (type) {
    case SET_HEADER_DIMEN:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default DimenReducer;
