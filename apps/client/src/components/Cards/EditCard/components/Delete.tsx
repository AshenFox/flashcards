import type { CardDto } from "@flashcards/common";
import { DeleteIcon } from "@ui/Icons";
import { Tooltip } from "@ui/Tooltip";
import clsx from "clsx";
import { memo, useCallback } from "react";

import { useDeleteCard } from "../../state/actions";
import s from "../styles.module.scss";

type DeleteProps = {
  data: CardDto;
  active: boolean;
};

const Delete = ({ data, active = false }: DeleteProps) => {
  const deleteCard = useDeleteCard();

  const { _id } = data || {};

  const clickCardDelete = useCallback(
    () => active && deleteCard(_id),
    [_id, active, deleteCard],
  );

  return (
    <Tooltip content="Delete card">
      <div
        className={clsx(s.delete, !active && s.inactive)}
        onClick={clickCardDelete}
      >
        <DeleteIcon width="17" height="17" />
      </div>
    </Tooltip>
  );
};

export default memo(Delete);
