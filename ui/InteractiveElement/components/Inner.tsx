import clsx from "clsx";
import { cloneElement, memo } from "react";

import s from "../styles.module.scss";
import { InnerProps } from "../types";

const Inner = ({ loading, children, icon, iconSize }: InnerProps) => {
  return (
    <>
      {!!icon &&
        cloneElement(icon, {
          width: iconSize,
          height: iconSize,
          className: clsx(s.icon, "interactive_element__icon"),
        })}
      {!!children && (
        <span className="interactive_element__text">{children}</span>
      )}
      {typeof loading !== "undefined" && (
        <div className={clsx(s.spinner, "interactive_element__spinner")} />
      )}
    </>
  );
};

export default memo(Inner);
