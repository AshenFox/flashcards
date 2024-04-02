import { useAppSelector } from '@store/store';
import Spinner from '@ui/Spinner';
import { memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

const AuthSpinner = () => {
  const loading = useAppSelector(s => s.auth.loading);

  return (
    <div className={clsx(s.container, !loading && 'hidden')}>
      <Spinner />
    </div>
  );
};

export default memo(AuthSpinner);
