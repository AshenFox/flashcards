import { memo, useCallback } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import Switch from '@ui/Switch';
import s from './styles.module.scss';

const Save = () => {
  const { set_cards_save } = useActions();

  const cards = useAppSelector(s => s.main.cards);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.save === false) {
      active = false;
      break;
    }
  }

  const clickAllSave = useCallback(
    () => set_cards_save(!active),
    [active, set_cards_save]
  );

  return (
    <Switch
      id={'switch-save-main'}
      className={s.save}
      active={active}
      icon={'icon__save'}
      tooltip='Save the card'
      onClick={clickAllSave}
    />
  );
};

export default memo(Save);
