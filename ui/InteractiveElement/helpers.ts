import { clsx } from "clsx";

import s from "./styles.module.scss";
import { InteractiveElementProps } from "./types";

export const createClassName = ({
  loading = false,
  active = true,
  design = "padded",
  pressed = false,
  className,
}: InteractiveElementProps) =>
  clsx(
    s.interactive_element,
    loading && active && s.loading,
    !active && s.inactive,
    pressed && s.pressed,
    s[design],
    className,
    "interactive_element__element",
  );
