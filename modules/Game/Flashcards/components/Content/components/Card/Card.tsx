import { useRouter } from 'next/router';
import Speaker from '@components/Speaker';
import Img from '@ui/Img';
import SRIndicator from '@components/SRIndicator';
import { Card as CardType } from '@store/reducers/main/mainInitState';
import { MouseEvent } from 'react';
import { useActions } from '@store/hooks';
import { tooltipContainer } from '@ui/Tooltip';
import s from './styles.module.scss';
import clsx from 'clsx';
import TextArea from '@ui/TextArea';
import { EditIcon } from '@ui/Icons';

type CardProps = {
  data: CardType;
  side?: 'definition' | 'term';
  position?: 'prev' | 'next';
};

const Card = ({ data, side = 'definition', position = null }: CardProps) => {
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
        {isSR && (
          <SRIndicator data={data} className={clsx(s.sr_indicator, tooltipContainer)} />
        )}

        {defenition && (
          <div className={`game__definition-container ${imgurl ? '' : 'full'}`}>
            <TextArea html={hidTranscrDefenition} className='game__definition' />
          </div>
        )}
        <Speaker
          _id={_id}
          text={defenition}
          type={'definition'}
          className='game__speaker-flashcards'
        />
        <div className='game__edit' onClick={clickEdit}>
          <EditIcon width='21' height='21' />
        </div>
      </div>
      <div className={backClassName} onClick={clickSide('definition')}>
        {isSR && (
          <SRIndicator data={data} className={clsx(s.sr_indicator, tooltipContainer)} />
        )}
        <div className='game__term-container '>
          <TextArea html={term} className='game__term' />
        </div>
        <Speaker
          _id={_id}
          text={term}
          type={'term'}
          className='game__speaker-flashcards'
        />
        <div className='game__edit' onClick={clickEdit}>
          <EditIcon width='21' height='21' />
        </div>
      </div>
    </div>
  );
};

export default Card;
