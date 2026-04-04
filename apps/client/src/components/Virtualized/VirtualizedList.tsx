import { useAppSelector } from "@store/store";
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
  const app_vertical_offset = useAppSelector(s => s.dimen.app_vertical_offset);

  const style = useMemo<CSSProperties>(
    () => ({
      height: totalSize - app_vertical_offset,
    }),
    [totalSize, app_vertical_offset],
  );

  return (
    <div style={style} ref={ref} className={s.virtualizedList}>
      {children}
    </div>
  );
};

export default memo(VirtualizedList);
