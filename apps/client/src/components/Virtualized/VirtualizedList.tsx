import React, { CSSProperties, memo, RefObject, useMemo } from "react";

import s from "./styles.module.scss";

type VirtualizedListProps = {
  totalSize: number;
  children: React.ReactNode;
  ref?: RefObject<HTMLDivElement>;
};

const VirtualizedList = ({
  totalSize = 0,
  children,
  ref,
}: VirtualizedListProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${totalSize}px`,
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
