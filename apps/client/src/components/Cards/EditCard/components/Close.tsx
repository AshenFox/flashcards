import type { CardDto } from "@flashcards/common";
import { CloseIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import { memo, MouseEvent, useCallback } from "react";

import { useSetCardEdit } from "../../state/ui";
import s from "../styles.module.scss";

type CloseProps = {
  data: CardDto;
};

const Close = ({ data }: CloseProps) => {
  const setCardEdit = useSetCardEdit();

  const { _id } = data || {};

  const clickClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setCardEdit({ _id, value: false });
    },
    [_id, setCardEdit],
  );

  const id = `close-edit-card-${_id}`;

  return (
    <>
      <div className={s.close} onClick={clickClose} data-tooltip-id={id}>
        <CloseIcon width="15" height="15" />
      </div>
      <Tooltip id={id}>Stop editing</Tooltip>
    </>
  );
};

export default memo(Close);
