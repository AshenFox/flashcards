import { useAppSelector } from "@store/store";
import { CSSProperties, memo, useMemo } from "react";

import s from "./styles.module.scss";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  const appVerticalOffset = useAppSelector(s => s.dimen.app_vertical_offset);
  const appVerticalOffsetActive = useAppSelector(
    s => s.dimen.app_vertical_offset_active,
  );

  const style = useMemo<CSSProperties>(() => {
    if (appVerticalOffsetActive)
      return {
        transform: `translateY(${-appVerticalOffset}px)`,
        marginBottom: `-${appVerticalOffset}px`,
        willChange: "margin-bottom, transform",
      };

    return null;
  }, [appVerticalOffset, appVerticalOffsetActive]);

  return (
    <div className={s.appWrapper} style={style}>
      {children}
    </div>
  );
};

export default memo(AppWrapper);
