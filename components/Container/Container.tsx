import clsx from "clsx";
import React, { CSSProperties, memo, MutableRefObject, ReactNode } from "react";

import s from "./styles.module.scss";

type ContainerProps = {
  children?: ReactNode;
  noPadding?: boolean;
  className?: string;
  style?: CSSProperties;
  ref?: MutableRefObject<HTMLDivElement>;
};

const Container = ({
  children,
  noPadding,
  className,
  ref,
  style,
}: ContainerProps) => (
  <div
    className={clsx(
      s.container,
      noPadding && s.noPadding,
      className,
      "container__container",
    )}
    ref={ref}
    style={style}
  >
    {children}
  </div>
);

export default memo(Container);
