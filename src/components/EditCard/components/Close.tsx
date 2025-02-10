import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
import { CloseIcon } from "@ui/Icons";
import { memo, MouseEvent, useCallback } from "react";

import s from "../styles.module.scss";

type CloseProps = {
  data: Card;
};

const Close = ({ data }: CloseProps) => {
  const { setCardEdit, reset_gallery_fields } = useActions();

  const { _id } = data || {};

  const clickClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setCardEdit({ _id, value: false });
      reset_gallery_fields(_id);
    },
    [_id, reset_gallery_fields, setCardEdit],
  );

  return (
    <div className={s.close} onClick={clickClose}>
      <CloseIcon width="15" height="15" />
    </div>
  );
};

export default memo(Close);
