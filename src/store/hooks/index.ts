import { voiceActions, voiceThunks } from "@store/reducers/voice/slice";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { authActions, authThunks } from "../reducers/auth/slice";
import { dimenActions } from "../reducers/dimen/slice";
import { gameActions, gameThunks } from "../reducers/game/slice";
import { headerActions } from "../reducers/header/slice";
import { mainActions, mainThunks } from "../reducers/main/slice";
import { modalActions, modalThunks } from "../reducers/modal/slice";
import { srActions, srThunks } from "../reducers/sr/slice";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(() => {
    const allActions = {
      ...headerActions,
      ...dimenActions,
      ...voiceActions,
      ...voiceThunks,
      ...modalActions,
      ...modalThunks,
      ...authActions,
      ...authThunks,
      ...gameActions,
      ...gameThunks,
      ...srActions,
      ...srThunks,
      ...mainActions,
      ...mainThunks,
    };

    return bindActionCreators(allActions, dispatch);
  }, [dispatch]);

  return boundActions;
};
