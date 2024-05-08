import clsx from "clsx";
import Link from "next/link";
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
};

const Item = ({
  children,
  href,
  onClick,
  padded,
  icon,
  iconSize = 20,
  className = "",
}: ItemProps) => {
  const InnerElements = useMemo(
    () => (
      <>
        {!!icon && cloneElement(icon, { width: iconSize, height: iconSize })}
        {children && <span>{children}</span>}
      </>
    ),
    [children, icon, iconSize],
  );

  const innerClassName = useMemo(
    () => clsx(s.item, padded && s.padded, className),
    [padded, className],
  );

  if (onClick) {
    return (
      <button className={innerClassName} onClick={onClick}>
        {InnerElements}
      </button>
    );
  }

  return (
    <Link href={href} className={innerClassName}>
      {InnerElements}
    </Link>
  );
};

export default memo(Item);
