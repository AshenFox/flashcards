import { useCardActions } from "@zustand/cards";
import type { Card } from "@zustand/cards";
import { EditIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type EditProps = {
  data: Card;
};

const Edit = ({ data }: EditProps) => {
  const { setCardEdit } = useCardActions();

  const { _id } = data;

  const clickEdit = (e: MouseEvent<HTMLDivElement>) =>
    setCardEdit({ _id, value: true });

  const editCardBtnId = `edit-card-${_id}`;

  return (
    <>
      <div
        className={clsx(s.controls_item, s.edit)}
        onClick={clickEdit}
        data-tooltip-id={editCardBtnId}
      >
        <EditIcon width="19" height="19" />
      </div>
      <Tooltip id={editCardBtnId}>Edit card</Tooltip>
    </>
  );
};

export default memo(Edit);
