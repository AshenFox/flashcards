import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { modalActions, modalThunks } from "../reducers/modal/slice";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(() => {
    const allActions = {
      ...modalActions,
      ...modalThunks,
    };

    return bindActionCreators(allActions, dispatch);
  }, [dispatch]);

  return boundActions;
};
