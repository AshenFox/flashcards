import type { CardDto } from "@flashcards/common";
import { EditIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo } from "react";

import { useSetCardEdit } from "../../../state/ui";
import s from "./styles.module.scss";

type EditProps = {
  data: CardDto;
};

const Edit = ({ data }: EditProps) => {
  const setCardEdit = useSetCardEdit();

  const { _id } = data;

  const clickEdit = () => setCardEdit({ _id, value: true });

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
