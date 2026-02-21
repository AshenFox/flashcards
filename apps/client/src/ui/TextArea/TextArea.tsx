import { Override } from "@flashcards/common";
import { clsx } from "clsx";
import React, { LegacyRef, memo } from "react";
import ContentEditable, {
  ContentEditableEvent,
  Props as ContentEditableProps,
} from "react-contenteditable";

import s from "./styles.module.scss";

type TextAreaProps = Override<
  ContentEditableProps,
  {
    ref?: LegacyRef<ContentEditable> & LegacyRef<HTMLDivElement>;
    error?: boolean;
    isStyled?: boolean;
    html?: string;
    onChange?: (event: ContentEditableEvent) => void | null;
  }
>;

const TextArea = ({
  ref,
  html = "",
  disabled = true,
  error,
  className,
  isStyled,
  onChange = null,
  ...rest
}: TextAreaProps) => {
  return (
    <ContentEditable
      html={html}
      spellCheck={true}
      {...rest}
      disabled={disabled}
      className={clsx(isStyled && s.textarea, error && s.error, className)}
      onChange={onChange}
      ref={ref}
    />
  );
};

export default memo(TextArea);
