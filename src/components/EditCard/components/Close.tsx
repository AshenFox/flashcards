import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { CloseIcon } from "@ui/Icons";
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

  return (
    <div className={s.close} onClick={clickClose}>
      <CloseIcon width="15" height="15" />
    </div>
  );
};

export default memo(Close);
