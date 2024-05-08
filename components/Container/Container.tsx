import clsx from "clsx";
import React, { memo, ReactNode } from "react";

import s from "./styles.module.scss";

type ContainerProps = {
  children?: ReactNode;
  noPadding?: boolean;
};

const Container = ({ children, noPadding }: ContainerProps) => (
  <div className={clsx(s.container, noPadding && s.noPadding)}>{children}</div>
);

export default memo(Container);
