import React, { LegacyRef, memo } from 'react';
import ContentEditable, {
  ContentEditableEvent,
  Props as ContentEditableProps,
} from 'react-contenteditable';
import s from './styles.module.scss';
import { clsx } from 'clsx';
import { noop } from '@helpers/functions/noop';
import { Override } from '@helpers/types';

type TextareaProps = Override<
  ContentEditableProps,
  {
    ref?: LegacyRef<ContentEditable> & LegacyRef<HTMLDivElement>;
    error?: boolean;
    isStyled?: boolean;
    onChange?: (event: ContentEditableEvent) => void | null;
  }
>;

const Textarea = ({
  ref,
  disabled = true,
  error,
  className,
  isStyled,
  onChange = null,
  ...rest
}: TextareaProps) => {
  return (
    <ContentEditable
      disabled={disabled}
      className={clsx(isStyled && s.textarea, error && s.error, className)}
      onChange={onChange}
      ref={ref}
      {...rest}
    />
  );
};

export default memo(Textarea);
