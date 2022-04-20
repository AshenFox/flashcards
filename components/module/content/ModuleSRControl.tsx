import { FC, MouseEvent } from 'react';
import { set_cards_sr } from '../../../store/actions/srActions';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const ModuleSRControl: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { cards } = useAppSelector(({ main }) => main);

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.studyRegime === false) {
      active = false;
      break;
    }
  }

  const clickToggleSwitch = (e: MouseEvent<HTMLLabelElement>) =>
    dispatch(set_cards_sr(!active));

  return (
    <div className='module__study-regime'>
      <input
        className='module__checkbox'
        type='checkbox'
        id='toggleswitch'
        checked={active}
        readOnly
      />
      <svg height='30' width='30'>
        <use href='../img/sprite.svg#icon__studyregime'></use>
      </svg>
      <span>All cards study regime</span>
      <label
        className='module__toggle-switch'
        htmlFor='toggleswitch'
        onClick={clickToggleSwitch}
      />
    </div>
  );
};

export default ModuleSRControl;
