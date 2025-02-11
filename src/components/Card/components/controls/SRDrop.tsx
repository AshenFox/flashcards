import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { DropStudyRegimeIcon } from "@ui/Icons";
import Tooltip, { tooltipContainer } from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

// const test: ClassValue;

type SRDropProps = {
  data: Card;
};

const SRDrop = ({ data }: SRDropProps) => {
  const { set_card_question } = useActions();

  const { question, _id } = data;

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) =>
    set_card_question(_id, true);

  return (
    <div
      className={clsx(s.controls_item, s.sr_drop, tooltipContainer, {
        [s.question]: question,
      })}
      onClick={clickDropSR}
    >
      <DropStudyRegimeIcon height="19" width="19" />
      <Tooltip>Drop card study progress</Tooltip>
    </div>
  );
};

export default memo(SRDrop);
