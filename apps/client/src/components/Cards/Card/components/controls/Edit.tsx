import type { CardDto } from "@flashcards/common";
import { EditIcon } from "@ui/Icons";
import { Tooltip } from "@ui/Tooltip";
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

  return (
    <Tooltip content="Edit card">
      <div className={clsx(s.controls_item, s.edit)} onClick={clickEdit}>
        <EditIcon width="19" height="19" />
      </div>
    </Tooltip>
  );
};

export default memo(Edit);
