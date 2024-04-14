import React, { LegacyRef, memo } from 'react';
import ContentEditable, {
  ContentEditableEvent,
  Props as ContentEditableProps,
} from 'react-contenteditable';
import s from './styles.module.scss';
import { clsx } from 'clsx';
import { Override } from '@helpers/types';

type TextAreaProps = Override<
  ContentEditableProps,
  {
    ref?: LegacyRef<ContentEditable> & LegacyRef<HTMLDivElement>;
    error?: boolean;
    isStyled?: boolean;
    onChange?: (event: ContentEditableEvent) => void | null;
  }
>;

const TextArea = ({
  ref,
  disabled = true,
  error,
  className,
  isStyled,
  onChange = null,
  ...rest
}: TextAreaProps) => {
  return (
    <ContentEditable
      {...rest}
      disabled={disabled}
      className={clsx(isStyled && s.textarea, error && s.error, className)}
      onChange={onChange}
      ref={ref}
    />
  );
};

export default memo(TextArea);
