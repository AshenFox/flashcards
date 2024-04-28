import clsx from 'clsx';
import Link from 'next/link';
import React, { memo } from 'react';
import s from './styles.module.scss';

type ItemProps = {
  children: string;
  href: string;
  active?: boolean;
};

const Item = ({ active, href, children }: ItemProps) => {
  return (
    <li className={clsx(s.item, active && s.active)}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default memo(Item);
