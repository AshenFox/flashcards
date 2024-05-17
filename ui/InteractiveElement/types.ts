import { MouseEvent, ReactElement, SVGProps } from "react";

export type InnerProps = {
  loading?: boolean;
  children: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconSize?: number;
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
  href: string;
};
