import React, { CSSProperties, memo, RefObject, useMemo } from "react";

import s from "./styles.module.scss";

type VirtualizedListProps = {
  totalSize: number;
  verticalOffset?: number;
  children: React.ReactNode;
  ref?: RefObject<HTMLDivElement>;
};

const VirtualizedList = ({
  totalSize = 0,
  verticalOffset = 0,
  children,
  ref,
}: VirtualizedListProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${Math.max(0, totalSize - verticalOffset)}px`,
    }),
    [totalSize, verticalOffset],
  );

  return (
    <div style={style} ref={ref} className={s.virtualizedList}>
      {children}
    </div>
  );
};

export default memo(VirtualizedList);
