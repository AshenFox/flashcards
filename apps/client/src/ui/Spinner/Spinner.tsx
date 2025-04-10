import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

type SpinnerProps = {
  small?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
};

const Spinner = ({ small, variant = "primary", className }: SpinnerProps) => (
  <div
    className={clsx(
      variant && s[variant],
      small && s.small,
      "spinner__spinner",
      className,
    )}
  />
);

export default memo(Spinner);
