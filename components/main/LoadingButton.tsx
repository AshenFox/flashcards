import { FC, MouseEvent } from 'react';

interface OwnProps {
  active: boolean;
  loading: boolean;
  children: string;
  classStr?: string;
  onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

type Props = OwnProps;

const LoadingButton: FC<Props> = ({
  active,
  loading,
  children,
  classStr,
  onClickHandler,
}) => {
  const logError = (e: MouseEvent<HTMLButtonElement>) => {
    console.error('Button has been deactivated.');
  };

  return (
    <div className='loading-btn' data-loading={loading && active ? 'true' : 'false'}>
      <button
        className={`${classStr} ${!active ? 'inactive' : ''}`}
        {...{
          onClick: active && onClickHandler ? onClickHandler : logError,
        }}
      >
        <span>{children}</span>
      </button>
      <div className='loading-btn__spinner'></div>
    </div>
  );
};

export default LoadingButton;
