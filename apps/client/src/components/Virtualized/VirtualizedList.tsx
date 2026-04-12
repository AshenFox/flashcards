import { Virtualizer } from "@tanstack/react-virtual";
import React, { CSSProperties, memo, RefObject, useMemo } from "react";

import s from "./styles.module.scss";

type VirtualizedListProps = {
  virtualizer: Virtualizer<Window | Element, Element>;
  children: React.ReactNode;
  ref?: RefObject<HTMLDivElement>;
};

const VirtualizedList = ({
  virtualizer,
  children,
  ref,
}: VirtualizedListProps) => {
  const totalSize = virtualizer.getTotalSize();

  const style = useMemo<CSSProperties>(
    () => ({
      height: `calc(${totalSize}px - var(--app-vertical-offset, 0))`,
    }),
    [totalSize],
  );

  return (
    <div style={style} ref={ref} className={s.virtualizedList}>
      {children}
    </div>
  );
};

export default memo(VirtualizedList);
