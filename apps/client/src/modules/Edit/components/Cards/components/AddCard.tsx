import { useActions } from "@store/hooks";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";

type AddCardProps = {
  position: "start" | "end";
};

const AddCard = ({ position }: AddCardProps) => {
  const { createCard } = useActions();

  const clickAddcard = useCallback(
    (e: MouseEvent<HTMLDivElement>) => createCard(position),
    [position, createCard],
  );

  return (
    <div className={s.addcard} onClick={clickAddcard}>
      <button type="button">+ add card</button>
    </div>
  );
};

export default memo(AddCard);
