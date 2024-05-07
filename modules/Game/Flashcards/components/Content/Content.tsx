import { useRouter } from 'next/router';
import Navigation from './components/Navigation';
import Card from './components/Card/Card';
import EndGame from './components/Card/EndGame';
import EditCard from '@components/EditCard';
import { useAppSelector } from '@store/hooks';
import ContentContainer from '@modules/Game/components/ContentContainer';
import { memo } from 'react';
import Finish from './components/Finish';

const Content = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const progress = useAppSelector(s => s.game.flashcards.progress);
  const side = useAppSelector(s => s.game.flashcards.side);
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.loading);

  const formatted_cards = Object.values(cards);
  const { length } = formatted_cards;

  const activeCardData = formatted_cards[progress];

  const isEnd = length === progress;
  const isEdit = length && length !== progress ? activeCardData.edit : false;

  return (
    <ContentContainer
      loading={loading || !length}
      isScrollable={isEdit || (isSR && isEnd)}
    >
      <div className='game__cards-container'>
        {!isEdit &&
          !isEnd &&
          formatted_cards.map((card, i) => {
            if (i === progress) {
              return <Card key={card._id} data={card} side={side} />;
            } else if (i === progress - 1 && progress - 1 >= 0) {
              return <Card key={card._id} data={card} position={'prev'} />;
            } else if (i === progress + 1 && progress + 1 <= length - 1) {
              return <Card key={card._id} data={card} position={'next'} />;
            } else {
              return false;
            }
          })}
        {!isEdit && length && isEnd && isSR ? <Finish /> : <EndGame active={isEnd} />}
        {isEdit && (
          <EditCard
            key={activeCardData._id}
            data={activeCardData}
            toggle={true}
            game={true}
          />
        )}
      </div>
      {!isEdit && !isEnd && <Navigation />}
    </ContentContainer>
  );
};

export default memo(Content);
