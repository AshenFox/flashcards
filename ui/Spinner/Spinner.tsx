import { memo } from 'react';
import clsx from 'clsx';
import s from './styles.module.scss';

type SpinnerProps = {
  small?: boolean;
};

const Spinner = ({ small }: SpinnerProps) => (
  <div className={clsx(s.spinner, small && s.small)} />
);

export default memo(Spinner);
