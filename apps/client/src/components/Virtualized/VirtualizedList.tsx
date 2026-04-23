import clsx from "clsx";
import React, { CSSProperties, memo, RefObject, useMemo } from "react";

import s from "./styles.module.scss";

type VirtualizedListProps = {
  totalSize: number;
  children: React.ReactNode;
  ref?: RefObject<HTMLDivElement>;
  className?: string;
};

const VirtualizedList = ({
  totalSize = 0,
  children,
  ref,
  className,
}: VirtualizedListProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${totalSize}px`,
    }),
    [totalSize],
  );

  return (
    <div style={style} ref={ref} className={clsx(s.virtualizedList, className)}>
      {children}
    </div>
  );
};

export default memo(VirtualizedList);
