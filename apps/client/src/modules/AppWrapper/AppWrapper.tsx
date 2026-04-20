import { useAppSelector } from "@store/store";
import { CSSProperties, memo, useEffect, useState } from "react";

import s from "./styles.module.scss";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  const appVerticalOffset = useAppSelector(s => s.dimen.app_vertical_offset);
  const appVerticalOffsetActive = useAppSelector(
    s => s.dimen.app_vertical_offset_active,
  );

  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (appVerticalOffsetActive) {
      setStyle(prev => ({
        ...prev,
        transform: `translateY(${-appVerticalOffset}px)`,
        marginBottom: `-${appVerticalOffset}px`,
        willChange: "margin-bottom, transform",
      }));

      setTimeout(() => {
        setStyle(prev => ({
          ...prev,
          transition: "transform 0.1s linear",
        }));
      }, 400);
    } else {
      setStyle({});
    }
  }, [appVerticalOffset, appVerticalOffsetActive]);

  useEffect(() => {
    return () => {
      setStyle({});
    };
  }, []);

  return (
    <div className={s.appWrapper} style={style}>
      {children}
    </div>
  );
};

export default memo(AppWrapper);
