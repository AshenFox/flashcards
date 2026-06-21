import DateStr from "@ui/DateStr";
import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

export type SRInfoTooltipContentProps = {
  stage: number;
  nextRep: string;
  prevStage: string;
  /** Colours the text with the success colour when the card is in study regime. */
  active?: boolean;
};

const SRInfoTooltipContent = ({
  stage,
  nextRep,
  prevStage,
  active,
}: SRInfoTooltipContentProps) => {
  return (
    <div className={clsx(s.info, active && s.info_active)}>
      <span>SR Stage: {stage}</span>
      <span>
        Next repeat: <DateStr date={nextRep} />
      </span>
      <span>
        Drop stage: <DateStr date={prevStage} />
      </span>
    </div>
  );
};

export default memo(SRInfoTooltipContent);
