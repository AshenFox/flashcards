import { useCanHover } from "@helpers/hooks/useCanHover";
import * as RT from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { memo, ReactElement, ReactNode } from "react";

import s from "./styles.module.scss";

export type TooltipProps = {
  /** Tooltip content. When nullish/empty the trigger renders with no tooltip. */
  content: ReactNode;
  /**
   * The anchor element. Radix clones it via `asChild`, so it must be a single
   * element that forwards its ref/props — plain DOM elements (div, button, svg)
   * do this out of the box; custom components must use `forwardRef` + spread.
   */
  children: ReactElement;
  side?: RT.TooltipContentProps["side"];
  align?: RT.TooltipContentProps["align"];
  sideOffset?: number;
  className?: string;
  disabled?: boolean;
};

/**
 * Thin wrapper over `@radix-ui/react-tooltip`. Unlike react-tooltip it installs
 * no document-wide MutationObserver — it binds pointer/focus listeners on its
 * own trigger only, so mounting one per virtualized row is cheap. Content is
 * passed as a prop (any node), so dynamic tooltips need no shared ids or
 * `data-*` attribute round-trips.
 *
 * Requires a single `<Tooltip.Provider>` somewhere above it (see `_app`).
 */
const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 10,
  className,
  disabled,
}: TooltipProps) => {
  const canHover = useCanHover();

  if (!canHover || disabled || content == null || content === "") {
    return children;
  }

  return (
    <RT.Root>
      <RT.Trigger asChild>{children}</RT.Trigger>
      <RT.Portal>
        <RT.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={clsx(s.content, className)}
        >
          {content}
        </RT.Content>
      </RT.Portal>
    </RT.Root>
  );
};

export default memo(Tooltip);
