import type { CardDto } from "@flashcards/common";
import {
  useCardsUIStore,
  useSetCardSave,
  useSetCardsSavePositive,
} from "@zustand/cards";
import Checkbox from "@ui/Checkbox";
import Tooltip from "@ui/Tooltip";
import { memo, MouseEvent, TouchEvent, useCallback, useRef } from "react";

import s from "./styles.module.scss";

type SaveProps = {
  data: CardDto;
};

const Save = ({ data }: SaveProps) => {
  const setCardSave = useSetCardSave();
  const setCardsSavePositive = useSetCardsSavePositive();
  const save = useCardsUIStore(s => s.cards[data._id]?.save);
  const { _id } = data;

  const up = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      e.preventDefault();
      clearTimeout(timer.current);

      if (timer.current) {
        setCardSave({ _id, value: !save });
      }
    },
    [_id, save, setCardSave],
  );

  const down = useCallback(
    (e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>) => {
      timer.current = setTimeout(() => {
        timer.current = null;
        if (!save) setCardsSavePositive(_id);
      }, 550);
    },
    [_id, save, setCardsSavePositive],
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const id = `switch-save${_id}`;

  return (
    <Checkbox
      id={id}
      className={s.save}
      active={save}
      small
      icon={<Tooltip id={id}>Select the card</Tooltip>}
      onMouseDown={down}
      onMouseUp={up}
      onTouchStart={down}
      onTouchEnd={up}
    />
  );
};

export default memo(Save);
