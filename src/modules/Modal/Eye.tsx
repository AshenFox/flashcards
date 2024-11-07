import { EyeClosedIcon, EyeIcon } from "@ui/Icons";
import React, { memo, MouseEventHandler } from "react";

import s from "./styles.module.scss";

type EyeProps = {
  isVisible: boolean;
  onClick: MouseEventHandler<SVGSVGElement>;
};

const Eye = ({ isVisible, onClick }: EyeProps) => {
  const Icon = isVisible ? EyeIcon : EyeClosedIcon;

  return <Icon className={s.eye} onClick={onClick} tabIndex={-1} />;
};

export default memo(Eye);
