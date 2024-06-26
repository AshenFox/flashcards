import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
import { EditIcon } from "@ui/Icons";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type EditProps = {
  data: Card;
};

const Edit = ({ data }: EditProps) => {
  const { set_card_edit } = useActions();

  const { _id } = data;

  const clickEdit = (e: MouseEvent<HTMLDivElement>) => set_card_edit(_id, true);

  return (
    <div className={clsx(s.controls_item, s.edit)} onClick={clickEdit}>
      <EditIcon width="19" height="19" />
    </div>
  );
};

export default memo(Edit);
