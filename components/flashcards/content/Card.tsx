import { useRouter } from 'next/router';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import Img from '../../main/Img';
import SRIndicator from '../../main/SRIngicator';
import { Card as CardType } from '../../../store/reducers/main/mainInitState';
import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';

interface OwnProps {
  data: CardType;
  side?: 'definition' | 'term';
  position?: 'prev' | 'next';
}

type Props = OwnProps;

const Card: FC<Props> = ({ data, side = 'definition', position = null }) => {
  const { set_flashcards_side, set_card_edit } = useActions();

  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === 'sr';

  const { _id, term, defenition, imgurl } = data;

  const hidTranscrDefenition = defenition.replaceAll(
    /\( \/(.*?)\/ \)/g,
    (x, match) => `( /<span class="game__definition-hidden">${match}</span>/ )`
  );

  const frontClassName = [
    'game__card-front',
    position ? `transparent ${position}` : '',
    side === 'definition' ? '' : 'rearside',
  ].join(' ');
  const backClassName = [
    'game__card-back',
    position ? `transparent ${position}` : '',
    side === 'term' ? '' : 'rearside',
  ].join(' ');
  const cardClassName = ['game__card', position ? 'transparent' : ''].join(' ');

  const clickSide = (value: 'term' | 'definition') => (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.game__speaker-flashcards')) return;
    if ((e.target as HTMLElement).closest('.game__edit')) return;
    if ((e.target as HTMLElement).closest('.sr-indicator')) return;
    if ((e.target as HTMLElement).closest('.game__definition-hidden')) return;

    set_flashcards_side(value);
  };

  const clickEdit = (e: MouseEvent<HTMLDivElement>) => set_card_edit(_id, true);

  return (
    <div className={cardClassName}>
      <div className={frontClassName} onClick={clickSide('term')}>
        <Img
          containerClass={`game__img-container ${defenition ? '' : 'full'}`}
          imgClass={'game__img'}
          url={imgurl}
        />
        {isSR && <SRIndicator data={data} classStr={'sr-indicator--flashcards'} />}

        {defenition && (
          <div className={`game__definition-container ${imgurl ? '' : 'full'}`}>
            <ContentEditable
              html={hidTranscrDefenition}
              disabled={true}
              className='game__definition'
              onChange={null}
            />
          </div>
        )}
        <Speaker
          _id={_id}
          text={defenition}
          type={'definition'}
          className='game__speaker-flashcards'
        />
        <div className='game__edit' onClick={clickEdit}>
          <svg width='21' height='21'>
            <use href='../img/sprite.svg#icon__edit'></use>
          </svg>
        </div>
      </div>
      <div className={backClassName} onClick={clickSide('definition')}>
        {isSR && <SRIndicator data={data} classStr={'sr-indicator--flashcards'} />}
        <div className='game__term-container '>
          <ContentEditable
            html={term}
            disabled={true}
            className='game__term'
            onChange={null}
          />
        </div>
        <Speaker
          _id={_id}
          text={term}
          type={'term'}
          className='game__speaker-flashcards'
        />
        <div className='game__edit' onClick={clickEdit}>
          <svg width='21' height='21'>
            <use href='../img/sprite.svg#icon__edit'></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;
