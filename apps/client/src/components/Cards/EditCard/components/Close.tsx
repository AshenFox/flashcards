import type { CardDto } from "@flashcards/common";
import { CloseIcon } from "@ui/Icons";
import { Tooltip } from "@ui/Tooltip";
import { memo, useCallback } from "react";

import { useSetCardEdit } from "../../state/ui";
import s from "../styles.module.scss";

type CloseProps = {
  data: CardDto;
};

const Close = ({ data }: CloseProps) => {
  const setCardEdit = useSetCardEdit();

  const { _id } = data || {};

  const clickClose = useCallback(() => {
    setCardEdit({ _id, value: false });
  }, [_id, setCardEdit]);

  return (
    <Tooltip content="Stop editing">
      <div className={s.close} onClick={clickClose}>
        <CloseIcon width="15" height="15" />
      </div>
    </Tooltip>
  );
};

export default memo(Close);
