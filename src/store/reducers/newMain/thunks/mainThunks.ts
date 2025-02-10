import { CardDto } from "@common/api/entities";
import {
  CardsGetQueryDto,
  CardsGetResponseDto,
  ModulesGetQueryDto,
  ModulesGetResponseDto,
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

      const params: ModulesGetQueryDto = {
        page,
        ...filters,
      };

      const { data } = await axios.get<ModulesGetResponseDto>(
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

      const params: CardsGetQueryDto = {
        page,
        ...filters,
      };

      const { data } = await axios.get<CardsGetResponseDto>("/api/main/cards", {
        params,
      });

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
        main: { search_cards, select_by, select_created },
      } = getState();

      if (!user) return; // loading

      dispatch(mainActions.setMainLoading(true));

      const {
        data,
      }: {
        data: {
          cards: CardDto[];
        };
      } = await axios.get("/api/main/module/cards", {
        params: {
          _id,
          filter: search_cards.value,
          by: select_by.value,
          created: select_created.value,
        },
      });

      dispatch(mainActions.setModuleCards({ cards: arr_to_obj(data.cards) }));
    } catch (err) {
      console.error(err);
    }

    dispatch(mainActions.setMainLoading(false));
  });

export const getModule = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
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
      } = await axios.get("/api/main/module", {
        params: {
          _id,
        },
      });

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
