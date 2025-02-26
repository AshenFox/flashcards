import {
  GetMainCardsQueryDto,
  GetMainCardsResponseDto,
  GetMainModuleCardsResponseDto,
  GetMainModuleQueryDto,
  GetMainModuleResponseDto,
  GetMainModulesQueryDto,
  GetMainModulesResponseDto,
} from "@flashcards/common/src/api/methods";
import { GetEditDraftResponseDto } from "@flashcards/common/src/api/methods/edit/getEditDraft";
import axios from "@flashcards/common/src/axios";
import { ThunkActionApp } from "@store/store";

import { mainActions } from "../slice";

export const getModules = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            homeModules: {
              loading,
              filters,
              pagination: { end, page },
            },
          },
        },
      } = getState();

      if (!user || end || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "homeModules" }),
      );

      const params: GetMainModulesQueryDto = {
        page,
        ...filters,
      };

      const { data } = await axios.get<GetMainModulesResponseDto>(
        "/api/main/modules",
        {
          params,
        },
      );

      dispatch(mainActions.setHomeModules(data));
    } catch (err) {
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "homeModules" }),
    );
  });

export const getCards = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            homeCards: {
              loading,
              filters,
              pagination: { end, page },
            },
          },
        },
      } = getState();
      if (!user || end || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "homeCards" }),
      );

      const params: GetMainCardsQueryDto = {
        page,
        ...filters,
      };

      const { data } = await axios.get<GetMainCardsResponseDto>(
        "/api/main/cards",
        {
          params,
        },
      );

      dispatch(mainActions.setCards(data));
    } catch (err) {
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "homeCards" }),
    );
  });

export const getModuleCards = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            moduleCards: { loading },
          },
        },
      } = getState();

      if (!user || loading) return;

      mainActions.setSectionLoading({ value: true, section: "moduleCards" });

      const { data } = await axios.get<GetMainModuleCardsResponseDto>(
        "/api/main/module/cards",
        {
          params: {
            _id,
          },
        },
      );

      dispatch(mainActions.setModuleCards(data));
    } catch (err) {
      console.error(err);
    }

    mainActions.setSectionLoading({ value: false, section: "moduleCards" });
  });

export const getModule = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            module: { loading, filters },
          },
        },
      } = getState();

      if (!user || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "module" }),
      );

      const params: GetMainModuleQueryDto = {
        _id,
        ...filters,
      };

      const { data } = await axios.get<GetMainModuleResponseDto>(
        "/api/main/module",
        {
          params,
        },
      );

      dispatch(mainActions.setModule(data));
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "module" }),
    );
  });

export const getDraft = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            editDraft: { loading },
          },
        },
      } = getState();

      if (!user || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "editDraft" }),
      );

      const { data } =
        await axios.get<GetEditDraftResponseDto>("/api/edit/draft");

      dispatch(mainActions.setModule(data));
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "editDraft" }),
    );
  });
