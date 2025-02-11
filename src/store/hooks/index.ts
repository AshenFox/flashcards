import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import * as authActions from "../actions/authActions";
import * as dimenActions from "../actions/dimenActions";
import * as gameActions from "../actions/gameActions";
import * as headerActions from "../actions/headerActions";
import * as modalActions from "../actions/modalActions";
import * as voiceActions from "../actions/voiceActions";
import { mainActions, mainThunks } from "../reducers/main/slice";
import { srActions, srThunks } from "../reducers/sr/slice";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(() => {
    const allActions = {
      ...authActions,
      ...dimenActions,
      ...gameActions,
      ...headerActions,
      ...modalActions,
      ...voiceActions,
      ...srActions,
      ...srThunks,
      ...mainActions,
      ...mainThunks,
    };

    return bindActionCreators(allActions, dispatch);
  }, [dispatch]);

  return boundActions;
};
