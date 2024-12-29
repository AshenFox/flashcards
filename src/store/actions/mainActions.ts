import { CardDto } from "@common/api/entities";
import {
  CardsGetQueryDto,
  CardsGetResponseDto,
  ModulesGetQueryDto,
  ModulesGetResponseDto,
} from "@common/api/methods";
import axios from "@common/axios";

import {
  card_fields,
  EntryCollectionName,
  FilterValue,
  module_fields,
} from "../reducers/main/mainInitState";
import {
  CLEAR_MODULE,
  GET_HOME_CARDS,
  GET_HOME_MODULES,
  GET_MODULE,
  GET_MODULE_CARDS,
  RESET_HOME_MODULES_DATA,
  RESET_HOME_MODULES_FILTERS,
  SET_ENTRY_COLLECTION_FILTER,
  SET_HOME_CARDS_LOADING,
  SET_HOME_MODULES_LOADING,
  SET_IS_SERVER,
  SET_MAIN_LOADING,
  SET_SCROLL_TOP,
  SET_SELECT_BY,
  SET_SELECT_CREATED,
} from "../types";
import { AppActions } from "../types";
import {
  Cards,
  Module,
  SelectBy,
  SelectCreated,
} from "./../reducers/main/mainInitState";
import { ThunkActionApp } from "./../store";

// SET_MAIN_LOADING
export const set_main_loading = (value: boolean): AppActions => ({
  type: SET_MAIN_LOADING,
  payload: value,
});

// SET_IS_SERVER
export const set_is_server = (): AppActions => ({
  type: SET_IS_SERVER,
  payload: {
    value: typeof document === "undefined",
  },
});

// CLEAR_MODULE
export const clear_module = (): AppActions => ({
  type: CLEAR_MODULE,
});

// RESET_HOME_MODULES_DATA
export const reset_home_modules_data = (): AppActions => ({
  type: RESET_HOME_MODULES_DATA,
});

// RESET_HOME_MODULES_FILTERS
export const reset_home_modules_filters = (): AppActions => ({
  type: RESET_HOME_MODULES_FILTERS,
});

// SET_SELECT_BY
export const set_select_by = (value: SelectBy): AppActions => ({
  type: SET_SELECT_BY,
  payload: value,
});

// SET_SELECT_CREATED
export const set_select_created = (value: SelectCreated): AppActions => ({
  type: SET_SELECT_CREATED,
  payload: value,
});

// SET_SCROLL_TOP
export const set_scroll_top = (value: boolean): AppActions => ({
  type: SET_SCROLL_TOP,
  payload: {
    value,
  },
});

// SET_ENTRY_COLLECTION_FILTER
export const set_entry_collection_filter = (
  entryCollection: EntryCollectionName,
  filter: string,
  value: FilterValue,
): AppActions => ({
  type: SET_ENTRY_COLLECTION_FILTER,
  payload: {
    entryCollection,
    filter,
    value,
  },
});

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

      dispatch({
        type: SET_HOME_MODULES_LOADING,
        payload: true,
      });

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

      dispatch({ type: GET_HOME_MODULES, payload: data });
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: SET_HOME_MODULES_LOADING,
      payload: false,
    });
  });

// GET CARDS
export const get_cards = () => <ThunkActionApp>(async (dispatch, getState) => {
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
        payload: { ...data, cards: arr_to_obj(data.entries) },
      });
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
  });

/*   export const get_cards = () => <ThunkActionApp>(async (dispatch, getState) => {
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

      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });

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

      dispatch({
        type: GET_CARDS,
        payload: { ...data, cards: arr_to_obj(data.cards) },
      });
      dispatch({
        type: SET_SKIP_CARDS,
        payload: skip_cards + 1,
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

      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });

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

      dispatch({
        type: GET_MODULE_CARDS,
        payload: { cards: arr_to_obj(data.cards) },
      });
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
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

      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });

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

      dispatch({
        type: GET_MODULE,
        payload: {
          ...data,
          cards: arr_to_obj(data.cards),
        },
      });
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
  });

// GET_DRAFT
export const get_draft = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();
      if (!user) return; // loading

      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });

      const {
        data,
      }: {
        data: {
          cards: CardDto[];
          module: Module;
        };
      } = await axios.get("/api/edit/draft");

      data.module = { ...data.module, ...module_fields };

      dispatch({
        type: GET_MODULE,
        payload: {
          ...data,
          cards: arr_to_obj(data.cards),
        },
      });
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
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
