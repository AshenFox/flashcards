import { useAppSelector } from "@store/store";
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
  const globalHeaderMarginTopPx = useAppSelector(
    s => s.dimen.global_header_margin_top_px,
  );

  const style = useMemo<CSSProperties>(
    () => ({
      height: totalSize - globalHeaderMarginTopPx,
      width: "100%",
      position: "relative",
      willChange: "height",
    }),
    [totalSize, globalHeaderMarginTopPx],
  );

  return (
    <div style={style} ref={ref}>
      {children}
    </div>
  );
};

export default memo(VirtualizedList);
