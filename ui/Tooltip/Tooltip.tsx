import { ReactNode, memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

type TooltipProps = {
  children: ReactNode;
  className?: string;
};

const Tooltip = ({ children, className }: TooltipProps) => {
  const Tag: keyof JSX.IntrinsicElements = typeof children === 'string' ? 'span' : 'div';

  return <Tag className={clsx(s.tooltip, 'tooltip__tooltip', className)}>{children}</Tag>;
};

export default memo(Tooltip);
