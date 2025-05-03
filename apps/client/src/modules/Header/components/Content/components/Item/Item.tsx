import { Button, Link } from "@ui/InteractiveElement";
import clsx from "clsx";
import {
  cloneElement,
  memo,
  MouseEventHandler,
  ReactElement,
  SVGProps,
  useMemo,
} from "react";

import s from "./styles.module.scss";

type ItemProps = {
  children?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  iconSize?: number;
  padded?: boolean;
  className?: string;
  active?: boolean;
};

const Item = ({
  children,
  href,
  onClick,
  padded,
  icon,
  iconSize = 20,
  className = "",
  active = true,
}: ItemProps) => {
  const innerClassName = useMemo(
    () => clsx(s.item, padded ? s.padded : s.plain, className),
    [className, padded],
  );

  if (onClick) {
    return (
      <Button
        onClick={onClick}
        icon={icon}
        iconSize={iconSize}
        design={padded ? "padded" : "plain"}
        className={innerClassName}
        active={active}
      >
        {children}
      </Button>
    );
  }

  return (
    <Link
      href={href}
      icon={icon}
      iconSize={iconSize}
      className={innerClassName}
      design="plain"
      active={active}
    >
      {children}
    </Link>
  );
};

export default memo(Item);
