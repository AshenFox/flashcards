import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { DeleteIcon } from "@ui/Icons";
import clsx from "clsx";
import { memo, MouseEvent, useCallback } from "react";

import s from "../styles.module.scss";

type DeleteProps = {
  data: Card;
  active: boolean;
};

const Delete = ({ data, active = false }: DeleteProps) => {
  const { deleteCard } = useActions();

  const { _id } = data || {};

  const clickCardDelete = useCallback(
    (e: MouseEvent<HTMLDivElement>) => active && deleteCard(_id),
    [_id, active, deleteCard],
  );

  return (
    <div
      className={clsx(s.delete, !active && s.inactive)}
      onClick={clickCardDelete}
    >
      <DeleteIcon width="17" height="17" />
    </div>
  );
};

export default memo(Delete);
