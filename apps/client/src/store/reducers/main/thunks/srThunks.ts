import { srGetCards, srPutAnswer } from "@api/methods";
import { ThunkActionApp } from "@store/store";
import { saveLastUpdate } from "@utils/saveLastUpdate";

import { mainActions } from "../slice";

export const saveSRAnswer = (_id: string, answer: 1 | -1) =>
  <ThunkActionApp>(async dispatch => {
    try {
      const data = await srPutAnswer(_id, answer);

      dispatch(mainActions.setCardSRAnswer({ _id, ...data }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const loadSRCards = (number: number) => <ThunkActionApp>(async (
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

      const { cards } = await srGetCards(number);

      const { length } = cards;

      if (!length) {
        window.location.replace("/home/sr");
        throw new Error("No cards to repeat.");
      }

      dispatch(mainActions.setSRCards({ cards }));
    } catch (err) {
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "srCards" }),
    );
  });
