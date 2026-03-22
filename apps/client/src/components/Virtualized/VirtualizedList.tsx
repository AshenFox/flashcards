import { Virtualizer } from "@tanstack/react-virtual";
import React, { CSSProperties, memo, useMemo } from "react";

type VirtualizedListProps = {
  virtualizer: Virtualizer<Window | Element, Element>;
  children: React.ReactNode;
};

const VirtualizedList = ({ virtualizer, children }: VirtualizedListProps) => {
  const totalSize = virtualizer.getTotalSize();
  const style = useMemo<CSSProperties>(
    () => ({
      height: totalSize,
      width: "100%",
      position: "relative",
    }),
    [totalSize],
  );

  return <div style={style}>{children}</div>;
};

export default memo(VirtualizedList);
