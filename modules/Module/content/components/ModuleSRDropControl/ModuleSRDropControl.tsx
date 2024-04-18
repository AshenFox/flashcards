import { MouseEvent, memo } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import Tooltip, { tooltipContainer } from '@ui/Tooltip';
import clsx from 'clsx';
import s from './styles.module.scss';
import { StudyRegimeIcon } from '@ui/Icons';

const ModuleSRDropControl = () => {
  const { set_module_question } = useActions();

  const { module } = useAppSelector(({ main }) => main);

  const { question } = module || {};

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) => set_module_question(true);

  return (
    <div
      className={clsx(s.drop, tooltipContainer)}
      data-active={question}
      onClick={clickDropSR}
    >
      <StudyRegimeIcon width='30' height='30' />
      <Tooltip>Drop all cards study progress</Tooltip>
    </div>
  );
};

export default memo(ModuleSRDropControl);
