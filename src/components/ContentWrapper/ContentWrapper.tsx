import { memo, ReactNode } from "react";

import s from "./styles.module.scss";

type ContentWrapperProps = {
  children: ReactNode;
  tagType?: keyof JSX.IntrinsicElements;
};

const ContentWrapper = ({
  children,
  tagType = "main",
}: ContentWrapperProps) => {
  const WrapperTag = tagType;

  return <WrapperTag className={s.wrapper}>{children}</WrapperTag>;
};

export default memo(ContentWrapper);
