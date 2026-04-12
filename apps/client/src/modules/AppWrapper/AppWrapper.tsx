import { memo } from "react";

import s from "./styles.module.scss";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div className={s.appWrapper}>
      {children}
    </div>
  );
};

export default memo(AppWrapper);
