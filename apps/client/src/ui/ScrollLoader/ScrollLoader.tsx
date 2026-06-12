import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

type ScrollLoaderProps = {
  active: boolean;
};

const ScrollLoader = ({ active }: ScrollLoaderProps) => {
  if (!active) return null;

  return (
    <div className={clsx(s.container)}>
      <div className={s.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default memo(ScrollLoader);
