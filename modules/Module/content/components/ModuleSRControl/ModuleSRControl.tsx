import { MouseEvent, memo } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import Toggle from '@ui/Toggle';
import clsx from 'clsx';
import s from './styles.module.scss';

const ModuleSRControl = () => {
  const { set_cards_sr } = useActions();

  const { cards } = useAppSelector(({ main }) => main);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.studyRegime === false) {
      active = false;
      break;
    }
  }

  const clickToggleSwitch = (e: MouseEvent<HTMLLabelElement>) => set_cards_sr(!active);

  return (
    <Toggle
      id={`module-sr-control`}
      className={clsx(s.sr_control)}
      active={active}
      icon={'icon__studyregime'}
      onClick={clickToggleSwitch}
      tooltip={'All cards study regime'}
    />
  );
};

export default memo(ModuleSRControl);