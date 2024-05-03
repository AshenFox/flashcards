import { ReactNode, memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

type ProgressItemProps = {
  className?: string;
  children?: ReactNode;
};

export const ProgressItem = memo(({ className, children }: ProgressItemProps) => {
  return <div className={clsx(s.item, 'progress__item', className)}>{children}</div>;
});

ProgressItem.displayName = 'ProgressItem';

type ProgressProps = {
  className?: string;
  children?: ReactNode;
};

const Progress = ({ className, children }: ProgressProps) => {
  return (
    <div className={clsx(s.progress, 'progress__progress', className)}>{children}</div>
  );
};

export default memo(Progress);
