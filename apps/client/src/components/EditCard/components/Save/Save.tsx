import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import Checkbox from "@ui/Checkbox";
import Tooltip from "@ui/Tooltip";
import { memo, MouseEvent, TouchEvent, useCallback, useRef } from "react";

import s from "./styles.module.scss";

type SaveProps = {
  data: Card;
};

const Save = ({ data }: SaveProps) => {
  const { setCardSave, setCardsSavePositive } = useActions();

  const { _id, save } = data;

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
