import { srGetCount } from "@api/methods";
import { ThunkActionApp } from "@store/store";

import { srActions } from "./slice";

export const setSRCounter = (additionNumber: number, value?: string) =>
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

    dispatch(srActions.setSRCounterReducer({ value: result }));
  });

export const loadSRCount = () => <ThunkActionApp>(async dispatch => {
  try {
    dispatch(srActions.setSRLoading({ value: true }));

    const data = await srGetCount();

    dispatch(srActions.setSRCount(data));
  } catch (err) {
    console.error(err);
  }

  dispatch(srActions.setSRLoading({ value: false }));
});
