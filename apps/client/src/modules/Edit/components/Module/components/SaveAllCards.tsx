import { useActions, useAppSelector } from "@store/hooks";
import Checkbox from "@ui/Checkbox";
import { SaveIcon } from "@ui/Icons";
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

  return (
    <Checkbox
      id={"switch-save-main"}
      className={s.save}
      active={active}
      icon={<SaveIcon />}
      tooltip="Save all the cards"
      onClick={clickAllSave}
    />
  );
};

export default memo(SaveAllCards);
