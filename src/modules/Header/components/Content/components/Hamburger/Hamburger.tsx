import clsx from "clsx";
import React, { memo, MouseEventHandler } from "react";

import s from "./styles.module.scss";

type HamburgerProps = {
  active?: boolean;
  hidden?: "tablet" | "mobile";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Hamburger = ({ active, className, onClick }: HamburgerProps) => {
  return (
    <button
      className={clsx(
        s.hamburger,
        s.spring,
        active && s.active,
        className,
        "hamburger__hamburger",
      )}
      onClick={onClick}
    >
      <span className={s.box}>
        <span className={s.inner}></span>
      </span>
    </button>
  );
};

export default memo(Hamburger);
