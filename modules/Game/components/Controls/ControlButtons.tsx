import React, { ReactNode, memo } from 'react';
import s from './styles.module.scss';

type ControlButtonsProps = {
  children?: ReactNode;
};

const ControlButtons = ({ children }: ControlButtonsProps) => {
  return <div className={s.control_buttons}>{children}</div>;
};

export default memo(ControlButtons);
