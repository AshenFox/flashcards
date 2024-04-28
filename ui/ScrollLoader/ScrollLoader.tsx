import clsx from 'clsx';
import { memo } from 'react';
import s from './styles.module.scss';

type ScrollLoaderProps = {
  active: boolean;
};

const ScrollLoader = ({ active }: ScrollLoaderProps) => {
  return (
    <div className={clsx(s.container, active && s.active)}>
      <div className={s.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default memo(ScrollLoader);
