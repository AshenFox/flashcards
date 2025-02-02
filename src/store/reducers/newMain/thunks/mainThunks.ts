import { CardDto } from "@common/api/entities";
import { ModulesGetQueryDto, ModulesGetResponseDto } from "@common/api/methods";
import axios from "@common/axios";
import { ThunkActionApp } from "@store/store";

import { card_fields, module_fields } from "../initState";
import { mainActions } from "../slice";
import { Cards, Module } from "../types";

export const getHomeModules = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
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

      dispatch(mainActions.setHomeModulesLoading(true));

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

    dispatch(mainActions.setHomeModulesLoading(false));
  });

export const getCards = () => <ThunkActionApp>(async (dispatch, getState) => {
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

      dispatch(mainActions.setMainLoading(true));

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

      dispatch(
        mainActions.setCards({ ...data, cards: arr_to_obj(data.cards) }),
      );
      /* dispatch({
        type: SET_SKIP_CARDS,
        payload: skip_cards + 1,
      }); */
    } catch (err) {
      console.error(err);
    }

    dispatch(mainActions.setMainLoading(false));
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
