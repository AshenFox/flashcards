import clsx from 'clsx';
import Link from 'next/link';
import { MouseEventHandler, memo, useMemo } from 'react';
import s from './styles.module.scss';

type ItemProps = {
  children: string;
  href?: string;
  icon?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  caution?: boolean;
  active?: boolean;
};

const Item = ({ href, children, icon, onClick, caution, active }: ItemProps) => {
  const InnerElements = useMemo(
    () => (
      <>
        {icon && (
          <svg width='20' height='20'>
            <use href={`../img/sprite.svg#${icon}`}></use>
          </svg>
        )}
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
