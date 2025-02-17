import { CardDto } from "@common/api/entities";
import {
  GetMainCardsQueryDto,
  GetMainCardsResponseDto,
  GetMainModuleCardsResponseDto,
  GetMainModuleQueryDto,
  GetMainModuleResponseDto,
  GetMainModulesQueryDto,
  GetMainModulesResponseDto,
} from "@common/api/methods";
import axios from "@common/axios";
import { ThunkActionApp } from "@store/store";

import { card_fields, module_fields } from "../initState";
import { mainActions } from "../slice";
import { Cards, Module } from "../types";

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
      } = getState();
      if (!user) return; // loading

      dispatch(mainActions.setMainLoading(true));

      const {
        data,
      }: {
        data: {
          cards: CardDto[];
          module: Module;
        };
      } = await axios.get("/api/edit/draft");

      data.module = { ...data.module, ...module_fields };

      dispatch(
        mainActions.setModule({
          ...data,
          cards: arr_to_obj(data.cards),
        }),
      );
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(mainActions.setMainLoading(false));
  });

// ==============================
// ==============================
// ==============================

const arr_to_obj = (arr: CardDto[]): Cards => {
  return Object.fromEntries(
    arr.map(card => [
      card._id,
      {
        ...card,
        ...card_fields,
      },
    ]),
  );
};
