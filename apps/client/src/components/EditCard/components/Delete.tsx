import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { DeleteIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
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

  const id = `delete-card-${_id}`;

  return (
    <>
      <div
        className={clsx(s.delete, !active && s.inactive)}
        onClick={clickCardDelete}
        data-tooltip-id={id}
      >
        <DeleteIcon width="17" height="17" />
      </div>
      <Tooltip id={id}>Delete card</Tooltip>
    </>
  );
};

export default memo(Delete);
