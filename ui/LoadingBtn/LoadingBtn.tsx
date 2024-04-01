import { MouseEvent, memo, useCallback } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

type LoadingBtnProps = {
  active: boolean;
  loading: boolean;
  children: string;
  classStr?: string;
  onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
};

const LoadingBtn = ({
  active,
  loading,
  children,
  classStr,
  onClickHandler,
}: LoadingBtnProps) => {
  const logError = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    console.error('Button has been deactivated.');
  }, []);

  return (
    <div className={s.btn} data-loading={loading && active ? 'true' : 'false'}>
      <button
        className={clsx(classStr, !active && s.inactive)}
        onClick={active && onClickHandler ? onClickHandler : logError}
      >
        <span>{children}</span>
      </button>
      <div className={s.spinner}></div>
    </div>
  );
};

export default memo(LoadingBtn);
