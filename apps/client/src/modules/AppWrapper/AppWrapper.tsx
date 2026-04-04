import { useAppSelector } from "@store/hooks";
import { CSSProperties, memo, useMemo } from "react";

import s from "./styles.module.scss";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  const app_vertical_offset = useAppSelector(s => s.dimen.app_vertical_offset);

  const style = useMemo<CSSProperties>(
    () => ({
      transform: `translateY(-${app_vertical_offset}px)`,
    }),
    [app_vertical_offset],
  );

  return (
    <div className={s.appWrapper} style={style}>
      {children}
    </div>
  );
};

export default memo(AppWrapper);
