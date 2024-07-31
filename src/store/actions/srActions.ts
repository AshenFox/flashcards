import axios from "@common/axios";
import { CardDto } from "@common/types";

import { saveLastUpdate } from "../helper-functions";
import { card_fields } from "../reducers/main/mainInitState";
import {
  DROP_CARD_SR,
  DROP_CARDS_SR,
  GET_SR_CARDS,
  GET_SR_COUNT,
  PUT_SR_ANSWER,
  SET_CARD_SR,
  SET_CARDS_SR,
  SET_CARDS_SR_POSITIVE,
  SET_MAIN_LOADING,
  SET_SR_COUNTER,
  SET_SR_LOADING,
} from "../types";
import { AppActions } from "../types";
import { Cards } from "./../reducers/main/mainInitState";
import { ThunkActionApp } from "./../store";

// SET_SR_COUNTER
export const set_sr_counter = (additionNumber: number, value?: string) =>
  <ThunkActionApp>((dispatch, getState) => {
    const {
      sr: { counter, repeat_num },
    } = getState();
    let result: number;

    if (value) {
      result = parseInt(value);
    } else {
      let remainder = Math.abs(counter % additionNumber);
      let abs = Math.abs(additionNumber);

      if (remainder) {
        result = counter + (additionNumber > 0 ? abs - remainder : -remainder);
      } else {
        result = counter + additionNumber;
      }
    }

    if (result > repeat_num) result = repeat_num;
    if (result > 999) result = 999;
    if (result < 1) result = 1;
    if (!result) result = 1;

    dispatch({
      type: SET_SR_COUNTER,
      payload: {
        value: result,
      },
    });
  });

// SET_SR_LOADING
export const set_sr_loading = (value: boolean): AppActions => ({
  type: SET_SR_LOADING,
  payload: {
    value,
  },
});

// PUT_SR_ANSWER
export const put_sr_answer = (_id: string, answer: 1 | -1) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        sr: { loading },
      } = getState();

      if (loading) return;

      dispatch(set_sr_loading(true));

      const {
        data,
      }: {
        data: {
          stage: number;
          nextRep: string;
          prevStage: string;
          lastRep: string;
          studyRegime: boolean;
        };
      } = await axios.put("/api/sr/answer", {
        _id,
        answer,
      });

      dispatch({
        type: PUT_SR_ANSWER,
        payload: { _id, ...data },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }

    dispatch(set_sr_loading(false));
  });

// GET_SR_COUNT
export const get_sr_count = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });

      const {
        data,
      }: {
        data: {
          all_num: number;
          repeat_num: number;
          next_num: number;
          next_date: string;
        };
      } = await axios.get("/api/sr/count");

      dispatch({
        type: GET_SR_COUNT,
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
  });

// SET_CARDS_SR_POSITIVE
export const set_cards_sr_positive = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const cards_arr = Object.values(cards);
      let _id_arr: string[] = [];

      for (const card of cards_arr) {
        if (card._id === _id) {
          _id_arr.push(card._id);
          break;
        }
        if (card.studyRegime) {
          _id_arr = [];
        } else {
          _id_arr.push(card._id);
        }
      }

      const { data }: { data: { msg: string } } = await axios.put(
        "/api/sr/control",
        {
          _id_arr,
          study_regime: true,
        },
      );

      console.log(data);

      dispatch({
        type: SET_CARDS_SR_POSITIVE,
        payload: {
          _id_arr,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// SET_CARDS_SR
export const set_cards_sr = (value: boolean) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const _id_arr = Object.keys(cards);

      const { data }: { data: { msg: string } } = await axios.put(
        "/api/sr/control",
        {
          _id_arr,
          study_regime: value,
        },
      );

      dispatch({
        type: SET_CARDS_SR,
        payload: {
          value,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// SET_CARD_SR
export const set_card_sr = (_id: string, value: boolean) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const { data }: { data: { msg: string } } = await axios.put(
        "/api/sr/control",
        {
          _id_arr: [_id],
          study_regime: value,
        },
      );

      dispatch({
        type: SET_CARD_SR,
        payload: {
          _id,
          value,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// DROP_CARDS_SR
export const drop_cards_sr = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const _id_arr = Object.keys(cards);

      const {
        data,
      }: {
        data: {
          stage: number;
          nextRep: string;
          prevStage: string;
          lastRep: string;
        };
      } = await axios.put("/api/sr/drop", {
        _id_arr,
      });

      dispatch({
        type: DROP_CARDS_SR,
        payload: {
          ...data,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// DROP_CARD_SR
export const drop_card_sr = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        data,
      }: {
        data: {
          stage: number;
          nextRep: string;
          prevStage: string;
          lastRep: string;
        };
      } = await axios.put("/api/sr/drop", {
        _id_arr: [_id],
      });

      dispatch({
        type: DROP_CARD_SR,
        payload: {
          _id,
          ...data,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// GET_SR_CARDS
export const get_sr_cards = (number: number) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
      } = getState();

      if (!user) return;

      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });

      let {
        data: { cards },
      }: {
        data: {
          cards: CardDto[];
        };
      } = await axios.get("/api/sr/cards", {
        params: {
          number,
        },
      });

      const { length } = cards;

      if (!length) {
        window.location.replace("/home/sr");
        throw new Error("No cards to repeat.");
      }

      dispatch({
        type: GET_SR_CARDS,
        payload: {
          cards: arr_to_obj(cards),
        },
      });
    } catch (err) {
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
