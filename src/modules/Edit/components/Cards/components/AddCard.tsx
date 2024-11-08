import { useActions } from "@store/hooks";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";

type AddCardProps = {
  position: "start" | "end";
};

const AddCard = ({ position }: AddCardProps) => {
  const { create_card } = useActions();

  const clickAddcard = useCallback(
    (e: MouseEvent<HTMLDivElement>) => create_card(position),
    [position, create_card],
  );

  return (
    <div className={s.addcard} onClick={clickAddcard}>
      <button type="button">+ add card</button>
    </div>
  );
};

export default memo(AddCard);
