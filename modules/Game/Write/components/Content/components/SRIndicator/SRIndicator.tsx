import React, { memo } from 'react';
import DefaultSRIndicator, {
  SRIndicatorProps as DefaultSRIndicatorProps,
} from '@components/SRIndicator';
import { tooltipContainer } from '@ui/Tooltip';
import clsx from 'clsx';
import s from './styles.module.scss';

type SRIndicatorProps = DefaultSRIndicatorProps & {
  type: 'question' | 'answer';
};

const SRIndicator = ({ data, type }: SRIndicatorProps) => {
  return <DefaultSRIndicator data={data} className={clsx(s[type], tooltipContainer)} />;
};

export default memo(SRIndicator);
