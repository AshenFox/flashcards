import type { CardDto } from "@flashcards/common";
import { DropStudyRegimeIcon } from "@ui/Icons";
import { Tooltip } from "@ui/Tooltip";
import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

type SRDropProps = {
  data: CardDto;
  questionOpen: boolean;
  onRequestConfirm: () => void;
};

const SRDrop = ({ questionOpen, onRequestConfirm }: SRDropProps) => {
  const clickDropSR = () => onRequestConfirm();

  return (
    <Tooltip content="Drop card study progress">
      <div
        className={clsx(s.controls_item, s.sr_drop, {
          [s.question]: questionOpen,
        })}
        onClick={clickDropSR}
      >
        <DropStudyRegimeIcon height="19" width="19" />
      </div>
    </Tooltip>
  );
};

export default memo(SRDrop);
