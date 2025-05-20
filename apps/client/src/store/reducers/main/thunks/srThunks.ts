import { CardDto } from "@flashcards/common";
import { axiosInstance } from "@flashcards/common";
import { saveLastUpdate } from "@store/helper-functions";
import { ThunkActionApp } from "@store/store";

import { mainActions } from "../slice";

export const dropCardsSR = () => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const _id_arr = Object.keys(cards);

      const { data } = await axiosInstance.put<{
        stage: number;
        nextRep: string;
        prevStage: string;
        lastRep: string;
      }>("/api/sr/drop", {
        _id_arr,
      });

      dispatch(mainActions.dropCardsSRReducer(data));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const dropCardSR = (_id: string) => <ThunkActionApp>(async dispatch => {
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
      } = await axiosInstance.put("/api/sr/drop", {
        _id_arr: [_id],
      });

      dispatch(mainActions.dropCardSRReducer({ _id, ...data }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const setCardSR = (_id: string, value: boolean) =>
  <ThunkActionApp>(async dispatch => {
    try {
      await axiosInstance.put<{ msg: string }>("/api/sr/control", {
        _id_arr: [_id],
        study_regime: value,
      });

      dispatch(mainActions.setCardSRReducer({ _id, value }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const setCardsSRPositive = (_id: string) => <ThunkActionApp>(async (
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

      await axiosInstance.put<{ msg: string }>("/api/sr/control", {
        _id_arr,
        study_regime: true,
      });

      dispatch(mainActions.setCardsSRPositiveReducer({ _id_arr }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const setCardsSR = (value: boolean) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const _id_arr = Object.keys(cards);

      await axiosInstance.put<{ msg: string }>("/api/sr/control", {
        _id_arr,
        study_regime: value,
      });

      dispatch(mainActions.setCardsSRReducer({ value }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const putSRAnswer = (_id: string, answer: 1 | -1) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const loading = getState()?.main.cards[_id]?.sr.loading ?? true;

      if (loading) return;

      dispatch(mainActions.setCardSRLoading({ _id, value: true }));

      const { data } = await axiosInstance.put<{
        stage: number;
        nextRep: string;
        prevStage: string;
        lastRep: string;
        studyRegime: boolean;
      }>("/api/sr/answer", {
        _id,
        answer,
      });

      dispatch(mainActions.putSRAnswerReducer({ _id, ...data }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }

    dispatch(mainActions.setCardSRLoading({ _id, value: false }));
  });

export const getSRCards = (number: number) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
      } = getState();

      if (!user) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "srCards" }),
      );

      const {
        data: { cards },
      } = await axiosInstance.get<{
        cards: CardDto[];
      }>("/api/sr/cards", {
        params: {
          number,
        },
      });

      const { length } = cards;

      if (!length) {
        window.location.replace("/home/sr");
        throw new Error("No cards to repeat.");
      }

      dispatch(mainActions.getSRCardsReducer({ cards }));
    } catch (err) {
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "srCards" }),
    );
  });
