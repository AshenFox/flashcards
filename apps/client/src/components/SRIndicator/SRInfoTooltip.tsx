import DateStr from "@ui/DateStr";
import Tooltip, { TooltipProps } from "@ui/Tooltip";
import React, { memo } from "react";

import s from "./styles.module.scss";

export type SRInfoTooltipProps = Omit<TooltipProps, "children"> & {
  data: {
    stage: number;
    nextRep: string;
    prevStage: string;
  };
};

const SRInfoTooltip = ({
  data: { stage, nextRep, prevStage },
  ...rest
}: SRInfoTooltipProps) => {
  return (
    <Tooltip {...rest}>
      <div className={s.info}>
        <span>SR Stage: {stage}</span>
        <span>
          Next repeat: <DateStr date={nextRep} />
        </span>
        <span>
          Drop stage: <DateStr date={prevStage} />
        </span>
      </div>
    </Tooltip>
  );
};

export default memo(SRInfoTooltip);
