import { Virtualizer } from "@tanstack/react-virtual";
import React, { CSSProperties, memo, RefObject, useMemo } from "react";

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
      height: totalSize,
      width: "100%",
      position: "relative",
    }),
    [totalSize],
  );

  return (
    <div style={style} ref={ref}>
      {children}
    </div>
  );
};

export default memo(VirtualizedList);
