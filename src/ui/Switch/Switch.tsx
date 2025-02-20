import Tooltip, { tooltipContainer } from "@ui/Tooltip";
import clsx from "clsx";
import {
  cloneElement,
  memo,
  MouseEventHandler,
  ReactElement,
  TouchEventHandler,
} from "react";

import s from "./styles.module.scss";

type SwitchProps = {
  id: string;
  active?: boolean;
  className?: string;
  small?: boolean;
  icon?: ReactElement;
  iconSize?: number;
  tooltip?: string;
  onClick?: MouseEventHandler<HTMLLabelElement>;
  onMouseDown?: MouseEventHandler<HTMLLabelElement>;
  onMouseUp?: MouseEventHandler<HTMLLabelElement>;
  onTouchStart?: TouchEventHandler<HTMLLabelElement>;
  onTouchEnd?: TouchEventHandler<HTMLLabelElement>;
};

const Switch = ({
  id,
  active,
  small = false,
  className,
  icon,
  iconSize,
  tooltip,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}: SwitchProps) => {
  const innerIconSize = iconSize ?? small ? 17 : 25;

  return (
    <div className={clsx(s.container, tooltipContainer, className, "test")}>
      <input
        className={"switch__checkbox"}
        type="checkbox"
        id={id}
        checked={active}
        readOnly
      />
      {!!icon &&
        cloneElement(icon, { width: innerIconSize, height: innerIconSize })}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      <label
        className={clsx("switch__switch", small && s.small)}
        htmlFor={id}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
    </div>
  );
};

export default memo(Switch);
