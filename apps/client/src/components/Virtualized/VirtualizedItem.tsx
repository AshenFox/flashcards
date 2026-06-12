import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { CSSProperties, memo, useMemo } from "react";

import { useDevicePixelRatio } from "./hooks/useDevicePixelRatio";
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
  const dpr = useDevicePixelRatio();

  const style = useMemo<CSSProperties>(() => {
    // Snap the offset to the physical pixel grid before compositing. On
    // fractional DPRs (Windows 125%/150% scaling) an integer CSS-pixel offset
    // can map to a half device pixel, blurring the entire composited layer.
    // Rounding to 1/dpr keeps every frame crisp without any layout cost.
    const y = Math.round(virtualItem.start * dpr) / dpr;
    return { transform: `translateY(${y}px)` };
  }, [virtualItem, dpr]);

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
