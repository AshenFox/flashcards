import { FC } from 'react';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const ModuleSave: FC<Props> = () => {
  const { set_cards_save } = useActions();

  const { cards } = useAppSelector(({ main }) => main);

  const clickAllSave = () => set_cards_save(!active);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.save === false) {
      active = false;
      break;
    }
  }

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

export default ModuleSave;
