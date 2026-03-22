import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { CSSProperties, memo, useMemo } from "react";

type VirtualizedItemProps = {
  virtualizer: Virtualizer<Window | Element, Element>;
  children: React.ReactNode;
  virtualItem: VirtualItem;
};

const VirtualizedItem = ({
  virtualizer,
  children,
  virtualItem,
}: VirtualizedItemProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      top: 0,
      width: "100%",
      transform: `translateY(${virtualItem.start}px)`,
    }),
    [virtualItem],
  );

  return (
    <div
      ref={virtualizer.measureElement}
      data-index={virtualItem.index}
      style={style}
    >
      {children}
    </div>
  );
};

export default memo(VirtualizedItem);
