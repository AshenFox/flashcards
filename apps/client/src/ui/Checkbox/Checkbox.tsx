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

type CheckboxProps = {
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

const Checkbox = ({
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
}: CheckboxProps) => {
  const innerIconSize = iconSize ?? small ? 17 : 25;

  return (
    <div className={clsx(s.container, tooltipContainer, className)}>
      <input
        className={clsx(s.checkbox, "checkbox__input")}
        type="checkbox"
        id={id}
        checked={active}
        readOnly
      />
      {!!icon &&
        cloneElement(icon, { width: innerIconSize, height: innerIconSize })}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      <label
        className={clsx(s.label, "checkbox__label", small && s.small)}
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

export default memo(Checkbox);
