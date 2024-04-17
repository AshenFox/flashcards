import React, {
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  memo,
  useCallback,
  useRef,
} from 'react';
import clsx from 'clsx';
import s from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  movingBorder?: boolean;
  before?: ReactNode;
  after?: ReactNode;
  inputRef?: MutableRefObject<HTMLInputElement>;
};

const Input = ({
  children,
  className,
  id,
  before,
  after,
  inputRef,
  movingBorder,
  ...rest
}: InputProps) => {
  const innerInputRef = useRef<HTMLInputElement>(null);

  const onContainerClick = useCallback(() => {
    innerInputRef?.current?.focus();
    inputRef?.current?.focus();
  }, [inputRef]);

  return (
    <div
      className={clsx(
        s.container,
        movingBorder && s.movingBorder,
        'input__container',
        className
      )}
      onClick={onContainerClick}
    >
      {before}
      <input
        {...rest}
        className={clsx(s.input, 'input__input')}
        id={id}
        ref={inputRef ?? innerInputRef}
      />
      {after}
    </div>
  );
};

export default memo(Input);
