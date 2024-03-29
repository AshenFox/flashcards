import { memo } from 'react';
import { clsx } from 'clsx';
import s from '../styles.module.scss';

type SpinnerProps = {
  active: boolean;
};

const Spinner = ({ active }: SpinnerProps) => (
  <div className={clsx(s.spinner_container, !active && s.hide)}>
    <div className='spinner spinner--small'></div>
  </div>
);

export default memo(Spinner);
