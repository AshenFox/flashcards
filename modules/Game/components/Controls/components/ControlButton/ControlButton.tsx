import clsx from "clsx";
import { memo, MouseEventHandler, ReactNode } from "react";

import s from "./styles.module.scss";

type ControlButtonProps = {
  active?: boolean;
  title?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ControlButton = ({
  active,
  title,
  icon,
  onClick,
}: ControlButtonProps) => {
  return (
    <div className={clsx(s.control_button, active && s.active)}>
      <button onClick={onClick}>
        {icon}
        <span>{title}</span>
      </button>
    </div>
  );
};

export default memo(ControlButton);
