import { memo } from 'react';
import { clsx } from 'clsx';
import s from './styles.module.scss';
import Spinner from '@ui/Spinner';

type SpinnerProps = {
  active: boolean;
};

const LoadingSpinner = ({ active }: SpinnerProps) => (
  <div className={clsx(s.spinner_container, !active && s.hide)}>
    <Spinner small />
  </div>
);

export default memo(LoadingSpinner);
