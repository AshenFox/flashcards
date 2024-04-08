import { memo } from 'react';
import s from './styles.module.scss';

type TooltipProps = {
  children: string;
};

const Tooltip = ({ children }: TooltipProps) => {
  return <span className={s.tooltip}>{children}</span>;
};

export default memo(Tooltip);
