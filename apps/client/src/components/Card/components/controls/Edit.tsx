import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { EditIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type EditProps = {
  data: Card;
};

const Edit = ({ data }: EditProps) => {
  const { setCardEdit } = useActions();

  const { _id } = data;

  const clickEdit = (e: MouseEvent<HTMLDivElement>) =>
    setCardEdit({ _id, value: true });

  const id = `edit-card-${_id}`;

  return (
    <>
      <div
        className={clsx(s.controls_item, s.edit)}
        onClick={clickEdit}
        data-tooltip-id={id}
      >
        <EditIcon width="19" height="19" />
      </div>
      <Tooltip id={id}>Edit card</Tooltip>
    </>
  );
};

export default memo(Edit);
