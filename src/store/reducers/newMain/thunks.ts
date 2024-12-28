import { CardDto } from "@common/api/entities";
import { ModulesGetQueryDto, ModulesGetResponseDto } from "@common/api/methods";
import axios from "@common/axios";

import { ThunkActionApp } from "../../store";
import { card_fields, module_fields } from "./initState";
import { actions } from "./slice";
import { Cards, Module } from "./types";

// GET MODULES NEW
export const get_home_modules = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: {
          homeModules: {
            loading,
            data: { end, page },
            filters,
          },
        },
      } = getState();

      if (!user || end || loading) return;

      dispatch(actions.setHomeModulesLoading(true));

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

      actions.getHomeModules(data);
    } catch (err) {
      console.error(err);
    }

    actions.setHomeModulesLoading(false);
  });

// GET CARDS
export const get_cards = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          skip_cards,
          all_cards,
          search_cards,
          select_by,
          select_created,
          loading,
        },
      } = getState();
      if (!user || all_cards || loading) return;

      dispatch(actions.setMainLoading(true));

      const {
        data,
      }: {
        data: {
          all_cards: boolean;
          all_cards_number: number;
          cards: CardDto[];
          cards_number: number;
        };
      } = await axios.get("/api/main/cards", {
        params: {
          skip: skip_cards,
          filter: search_cards.value,
          by: select_by.value,
          created: select_created.value,
        },
      });

      dispatch(actions.getCards({ ...data, cards: arr_to_obj(data.cards) }));
      /* dispatch({
        type: SET_SKIP_CARDS,
        payload: skip_cards + 1,
      }); */
    } catch (err) {
      console.error(err);
    }

    dispatch(actions.setMainLoading(false));
  });

/* export const get_cards = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          homeCards: {
            loading,
            data: { end, page },
            filters,
          },
        },
      } = getState();
      if (!user || end || loading) return;

      dispatch({
        type: SET_HOME_CARDS_LOADING,
        payload: true,
      });

      const params: CardsGetQueryDto = {
        page,
        ...filters,
      };

      const { data } = await axios.get<CardsGetResponseDto>("/api/main/cards", {
        params,
      });

      dispatch({
        type: GET_HOME_CARDS,
        payload: { ...data, cards: arr_to_obj(data.cards) },
      });
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
  }); */

// GET MODULE CARDS
export const get_module_cards = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: { search_cards, select_by, select_created },
      } = getState();
      if (!user) return; // loading

      dispatch(actions.setMainLoading(true));

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

      dispatch(actions.getModuleCards({ cards: arr_to_obj(data.cards) }));
    } catch (err) {
      console.error(err);
    }

    dispatch(actions.setMainLoading(false));
  });

// GET_MODULE
export const get_module = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
      } = getState();
      if (!user) return; // loading

      dispatch(actions.setMainLoading(true));

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
        actions.getModule({
          ...data,
          cards: arr_to_obj(data.cards),
        }),
      );
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(actions.setMainLoading(false));
  });

// GET_DRAFT
export const get_draft = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();
      if (!user) return; // loading

      dispatch(actions.setMainLoading(true));

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
        actions.getModule({
          ...data,
          cards: arr_to_obj(data.cards),
        }),
      );
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(actions.setMainLoading(false));
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
