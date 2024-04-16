import React, { InputHTMLAttributes, ReactNode, memo, useCallback, useRef } from 'react';
import clsx from 'clsx';
import s from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  before?: ReactNode;
  after?: ReactNode;
};

const Input = ({ children, className, id, before, after, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onContainerClick = useCallback(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className={clsx(s.container, 'input__container', className)}
      onClick={onContainerClick}
    >
      {before}
      <input {...rest} className={clsx(s.input, 'input__input')} id={id} ref={inputRef} />
      {after}
    </div>
  );
};

export default memo(Input);
