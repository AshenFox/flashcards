import { StudyRegimeIcon } from "@ui/Icons";
import { Tooltip, TooltipProps } from "@ui/Tooltip";
import clsx from "clsx";
import { memo, ReactElement, ReactNode, useMemo } from "react";

import s from "./styles.module.scss";

export type SRIndicatorProps = {
  stage: number;
  active?: boolean;
  small?: boolean;
  className?: string;
  tooltip?: ReactNode;
  tooltipSide?: TooltipProps["side"];
};

const full = 360;
const num = 11;
const part = full / num;
const radius = 2;
const diameter = radius * 2;

const SRIndicator = ({
  stage,
  active = true,
  small = false,
  className,
  tooltip,
  tooltipSide,
}: SRIndicatorProps) => {
  const dots = useMemo(() => {
    let angle = 120;

    const dots: ReactElement[] = [];

    for (let i = 1; i <= stage; i++) {
      angle = angle - part;
      let x = 0 + radius * Math.cos((-angle * Math.PI) / 180);
      let y = 0 + radius * Math.sin((-angle * Math.PI) / 180);

      let x_percent = ((x + radius) / diameter) * 100;
      let y_percent = ((y + radius) / diameter) * 100;

      dots.push(
        <div
          key={angle}
          className={"indicator__dot"}
          style={{
            top: `${y_percent}%`,
            left: `${x_percent}%`,
            backgroundColor: color_arr[i - 1],
            boxShadow: `0 0 0.15rem 0 ${color_arr[i - 1]}`,
          }}
        />,
      );
    }

    return dots;
  }, [stage]);

  return (
    <Tooltip content={tooltip} side={tooltipSide}>
      <div
        className={clsx(
          "sr_indicator",
          s.indicator,
          active && s.active,
          small && s.small,
          className,
        )}
      >
        <StudyRegimeIcon />
        <div className={"sr_indicator__dots"}>{dots}</div>
      </div>
    </Tooltip>
  );
};

export default memo(SRIndicator);

const color_arr = [
  "var(--sr-indicator-stage-1)",
  "var(--sr-indicator-stage-2)",
  "var(--sr-indicator-stage-3)",
  "var(--sr-indicator-stage-4)",
  "var(--sr-indicator-stage-5)",
  "var(--sr-indicator-stage-6)",
  "var(--sr-indicator-stage-7)",
  "var(--sr-indicator-stage-8)",
  "var(--sr-indicator-stage-9)",
  "var(--sr-indicator-stage-10)",
  "var(--sr-indicator-stage-11)",
];
