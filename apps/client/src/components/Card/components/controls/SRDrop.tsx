import type { CardDto } from "@flashcards/common";
import { DropStudyRegimeIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type SRDropProps = {
  data: CardDto;
  questionOpen: boolean;
  onRequestConfirm: () => void;
};

const SRDrop = ({ data, questionOpen, onRequestConfirm }: SRDropProps) => {
  const { _id } = data;

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) => onRequestConfirm();

  const id = `sr-drop-card-${_id}`;

  return (
    <div
      className={clsx(s.controls_item, s.sr_drop, {
        [s.question]: questionOpen,
      })}
      onClick={clickDropSR}
    >
      <DropStudyRegimeIcon height="19" width="19" data-tooltip-id={id} />
      <Tooltip id={id}>Drop card study progress</Tooltip>
    </div>
  );
};

export default memo(SRDrop);
