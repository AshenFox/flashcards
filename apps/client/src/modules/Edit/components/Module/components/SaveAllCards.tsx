import { useActions, useAppSelector } from "@store/hooks";
import Checkbox from "@ui/Checkbox";
import Tooltip from "@ui/Tooltip";
import { memo, useCallback } from "react";

import s from "./styles.module.scss";

const SaveAllCards = () => {
  const { setCardsSave } = useActions();

  const cards = useAppSelector(s => s.main.cards);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.save === false) {
      active = false;
      break;
    }
  }

  const clickAllSave = useCallback(
    () => setCardsSave({ value: !active }),
    [active, setCardsSave],
  );

  const id = "switch-save-main";

  return (
    <Checkbox
      id={id}
      className={s.save}
      active={active}
      icon={<Tooltip id={id}>Select all cards</Tooltip>}
      onClick={clickAllSave}
    />
  );
};

export default memo(SaveAllCards);
