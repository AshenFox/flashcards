import { useEditCards, useEditCardsUIStore } from "@modules/Edit/hooks";
import Checkbox from "@ui/Checkbox";
import Tooltip from "@ui/Tooltip";
import { memo, useCallback, useMemo } from "react";

import s from "./styles.module.scss";

const SaveAllCards = () => {
  const cardsArr = useEditCards();
  const cardsUi = useEditCardsUIStore(s => s.cards);
  const setCardUI = useEditCardsUIStore(s => s.set);

  const active = useMemo(() => {
    if (!cardsArr.length) return false;
    for (const card of cardsArr) {
      const save = cardsUi[card._id]?.save ?? false;
      if (!save) return false;
    }
    return true;
  }, [cardsArr, cardsUi]);

  const clickAllSave = useCallback(() => {
    const target = !active;
    for (const card of cardsArr) {
      setCardUI(card._id, d => {
        d.save = target;
      });
    }
  }, [active, cardsArr, setCardUI]);

  const id = "switch-save-main";

  return (
    <Checkbox
      id={id}
      className={s.save}
      active={active}
      icon={<Tooltip id={id}>Select all cards</Tooltip>}
      onClick={clickAllSave}
      isGroupSelection
    />
  );
};

export default memo(SaveAllCards);
