import clsx from 'clsx';
import Link from 'next/link';
import {
  MouseEventHandler,
  ReactElement,
  SVGProps,
  cloneElement,
  memo,
  useMemo,
} from 'react';
import s from './styles.module.scss';

type ItemProps = {
  children: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  caution?: boolean;
  active?: boolean;
};

const iconSize = '20';

const Item = ({ href, children, icon, onClick, caution, active }: ItemProps) => {
  const InnerElements = useMemo(
    () => (
      <>
        {!!icon && cloneElement(icon, { width: iconSize, height: iconSize })}
        <span>{children}</span>
      </>
    ),
    [children, icon]
  );

  const className = useMemo(
    () => clsx(s.item, caution && s.caution, active && s.active),
    [active, caution]
  );

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {InnerElements}
      </button>
    );
  }

  return (
    <Link className={className} href={href}>
      {InnerElements}
    </Link>
  );
};

export default memo(Item);
