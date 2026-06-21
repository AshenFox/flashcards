import { Tooltip, TooltipProps } from "@ui/Tooltip";
import clsx from "clsx";
import {
  cloneElement,
  memo,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SVGProps,
  TouchEventHandler,
} from "react";

import s from "./styles.module.scss";

type CheckboxProps = {
  id: string;
  active?: boolean;
  className?: string;
  small?: boolean;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconSize?: number;
  isGroupSelection?: boolean;
  tooltip?: ReactNode;
  tooltipSide?: TooltipProps["side"];
  onClick?: MouseEventHandler<HTMLLabelElement>;
  onMouseDown?: MouseEventHandler<HTMLLabelElement>;
  onMouseUp?: MouseEventHandler<HTMLLabelElement>;
  onTouchStart?: TouchEventHandler<HTMLLabelElement>;
  onTouchEnd?: TouchEventHandler<HTMLLabelElement>;
};

const Checkbox = ({
  id,
  active,
  className,
  icon,
  iconSize,
  small = false,
  isGroupSelection = false,
  tooltip,
  tooltipSide,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}: CheckboxProps) => {
  const innerIconSize = iconSize ?? small ? 17 : 25;

  return (
    <Tooltip content={tooltip} side={tooltipSide}>
      <div className={clsx(s.container, className)}>
        <input
          className={clsx(s.checkbox, "checkbox__input")}
          type="checkbox"
          id={id}
          checked={active}
          readOnly
        />
        {!!icon &&
          cloneElement(icon, { width: innerIconSize, height: innerIconSize })}
        <label
          className={clsx(
            s.label,
            "checkbox__label",
            small && s.small,
            isGroupSelection && s.groupSelection,
          )}
          htmlFor={id}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      </div>
    </Tooltip>
  );
};

export default memo(Checkbox);
