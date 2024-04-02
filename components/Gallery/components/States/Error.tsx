import { memo } from 'react';
import { clsx } from 'clsx';
import s from './styles.module.scss';

type ErrorProps = {
  active: boolean;
};

const Error = ({ active }: ErrorProps) => (
  <div className={clsx(s.error_container, !active && s.hide)}>
    <span>The service is currently unavailable. Please try later...</span>
  </div>
);

export default memo(Error);
