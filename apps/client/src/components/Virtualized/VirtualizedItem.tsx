import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { CSSProperties, memo, useMemo } from "react";

import s from "./styles.module.scss";

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
      transform: `translateY(${virtualItem.start}px)`,
    }),
    [virtualItem],
  );

  return (
    <div
      className={s.virtualizedItem}
      ref={virtualizer.measureElement}
      data-index={virtualItem.index}
      style={style}
    >
      {children}
    </div>
  );
};

export default memo(VirtualizedItem);
