import { memo, useCallback } from 'react';
import { useActions, useAppSelector } from '@store/hooks';

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
    <div className='edit__all-cards-save-include'>
      <input
        className='edit__checkbox edit__checkbox--save'
        type='checkbox'
        id='togglesave-main'
        checked={active}
        readOnly
      />
      <svg height='28' width='28'>
        <use href='../img/sprite.svg#icon__save'></use>
      </svg>
      <span>Save all cards</span>
      <label
        className='edit__toggle-switch'
        htmlFor='togglesave-main'
        onClick={clickAllSave}
      ></label>
    </div>
  );
};

export default memo(Save);
