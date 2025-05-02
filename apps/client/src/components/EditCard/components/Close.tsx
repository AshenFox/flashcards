import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { CloseIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import { memo, MouseEvent, useCallback } from "react";

import s from "../styles.module.scss";

type CloseProps = {
  data: Card;
};

const Close = ({ data }: CloseProps) => {
  const { setCardEdit, resetGalleryFields } = useActions();

  const { _id } = data || {};

  const clickClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setCardEdit({ _id, value: false });
      resetGalleryFields({ _id });
    },
    [_id, resetGalleryFields, setCardEdit],
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
