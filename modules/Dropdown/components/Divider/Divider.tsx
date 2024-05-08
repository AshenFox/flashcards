import { memo } from "react";

import s from "./styles.module.scss";

type DividerProps = {
  children: string;
};

const Divider = ({ children }: DividerProps) => (
  <div className={s.divider}>
    <span>{children}</span>
  </div>
);

export default memo(Divider);
