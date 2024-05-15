import { useActions } from "@store/hooks";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";

const AddCard = () => {
  const { create_card } = useActions();

  const clickAddcard = useCallback(
    (e: MouseEvent<HTMLDivElement>) => create_card(),
    [create_card],
  );

  return (
    <div className={s.addcard} onClick={clickAddcard}>
      <button
        //helpers-delete
        className="fz15 uppercase h-yellow pad-bot10 br-bottom5 brc-lightblue h-brc-yellow"
        type="button"
      >
        + add card
      </button>
    </div>
  );
};

export default memo(AddCard);
