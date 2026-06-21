import { TooltipProps } from "@ui/Tooltip";
import { Url } from "next/dist/shared/lib/router/router";
import { MouseEvent, ReactElement, ReactNode, SVGProps } from "react";

export type Design = "plain" | "padded" | "outline";

export type InnerProps = {
  loading?: boolean;
  children?: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconSize?: number;
  pressed?: boolean;
};

export type InteractiveElementProps = InnerProps & {
  id?: string;
  className?: string;
  active?: boolean;
  design?: "plain" | "padded" | "outline";
  tooltip?: ReactNode;
  tooltipSide?: TooltipProps["side"];
};

export type ButtonProps = InteractiveElementProps & {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export type LinkProps = InteractiveElementProps & {
  href?: Url;
  isReturn?: boolean;
};
