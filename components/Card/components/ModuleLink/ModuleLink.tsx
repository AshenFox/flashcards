import Tooltip, { tooltipContainer } from '@ui/Tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import React, { memo } from 'react';
import s from './styles.module.scss';
import { ExternalLinkIcon } from '@ui/Icons';

type ModuleLinkProps = {
  moduleId: string;
};

const ModuleLink = ({ moduleId }: ModuleLinkProps) => {
  return (
    <Link href={`/module/${moduleId}`}>
      <div className={clsx(s.module_link, tooltipContainer)}>
        <ExternalLinkIcon />
        <Tooltip>To the card&apos;s module</Tooltip>
      </div>
    </Link>
  );
};

export default memo(ModuleLink);
