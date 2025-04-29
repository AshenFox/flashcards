import { Url } from "next/dist/shared/lib/router/router";
import { MouseEvent, ReactElement, SVGProps } from "react";

export type Design = "plain" | "padded" | "outline";

export type InnerProps = {
  loading?: boolean;
  children?: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconSize?: number;
  pressed?: boolean;
};

export type InteractiveElementProps = InnerProps & {
  className?: string;
  active?: boolean;
  design?: "plain" | "padded" | "outline";
};

export type ButtonProps = InteractiveElementProps & {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export type LinkProps = InteractiveElementProps & {
  href?: Url;
  isReturn?: boolean;
};
