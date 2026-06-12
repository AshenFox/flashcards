import { useDevicePixelRatio } from "@components/Virtualized/hooks/useDevicePixelRatio";
import { CSSProperties, memo, useMemo, useState } from "react";

import { useHasActiveOwner } from "./hooks/registry";
import { useGlobalHeaderPull } from "./hooks/useGlobalHeaderPull";
import s from "./styles.module.scss";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  const [offset, setOffset] = useState(0);

  useGlobalHeaderPull(setOffset);

  const hasActiveOwner = useHasActiveOwner();

  const dpr = useDevicePixelRatio();

  const modifiedOffset = Math.round(offset * dpr) / dpr;

  const style = useMemo<CSSProperties | undefined>(() => {
    if (!hasActiveOwner) return undefined;

    return {
      transform: `translateY(${-modifiedOffset}px)`,
      marginBottom: `-${modifiedOffset}px`,
      willChange: "margin-bottom, transform",
    };
  }, [hasActiveOwner, modifiedOffset]);

  return (
    <div className={s.appWrapper} style={style}>
      {children}
    </div>
  );
};

export default memo(AppWrapper);
