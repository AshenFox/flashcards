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
    "interactive_element__element",
    loading && active && "interactive_element__loading",
    !active && "interactive_element__inactive",
    pressed && "interactive_element__pressed",
    s[design],
    className,
  );
