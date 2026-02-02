import { useCanHover } from "@helpers/hooks/useCanHover";
import clsx from "clsx";
import { memo, ReactNode, useEffect, useState } from "react";
import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";

import s from "./styles.module.scss";

export type TooltipProps = ITooltip & {
  id: string;
  children: ReactNode;
  className?: string;
};

const Tooltip = ({ id, children, className, ...rest }: TooltipProps) => {
  const canHover = useCanHover();

  if (!canHover) return null;

  return (
    <ReactTooltip
      {...rest}
      id={id}
      className={clsx(s.tooltip, "tooltip__tooltip", className)}
      noArrow
    >
      {children}
    </ReactTooltip>
  );
};

export default memo(Tooltip);
