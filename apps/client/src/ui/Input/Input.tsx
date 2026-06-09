import clsx from "clsx";
import React, {
  InputHTMLAttributes,
  memo,
  ReactNode,
  Ref,
  useCallback,
  useRef,
} from "react";

import s from "./styles.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  movingBorder?: boolean;
  before?: ReactNode;
  after?: ReactNode;
  error?: boolean;
};

const Input = ({
  ref,
  className,
  id,
  before,
  after,
  movingBorder,
  error,
  ...rest
}: InputProps) => {
  const innerInputRef = useRef<HTMLInputElement>(null);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      innerInputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const onContainerClick = useCallback(() => {
    innerInputRef.current?.focus();
  }, []);

  return (
    <div
      className={clsx(
        s.container,
        movingBorder && s.movingBorder,
        "input__container",
        className,
        error && s.error,
      )}
      onClick={onContainerClick}
    >
      {before}
      <input
        {...rest}
        className={clsx(s.input, "input__input")}
        id={id}
        ref={setRef}
      />
      {after}
    </div>
  );
};

export default memo(Input);
