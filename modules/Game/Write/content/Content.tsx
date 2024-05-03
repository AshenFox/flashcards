import ContentContainer from '@modules/Game/components/ContentContainer';
import React, { ReactNode } from 'react';
import Finish from './Finish';
import Round from './Round';
import EditCard from '@components/EditCard';
import Answer from './Answer';
import Question from './Question';
import { useAppSelector } from '@store/store';

const Content = () => {
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.loading);
  const is_init = useAppSelector(s => s.game.write.is_init);
  const remaining = useAppSelector(s => s.game.write.remaining);
  const answered = useAppSelector(s => s.game.write.answered);

  const activeCard = remaining[remaining.length - 1];
  const isAnswered = activeCard ? !!activeCard.answer : false;
  const activeCardData = activeCard ? cards[activeCard.id] : null;

  const isRoundFinished = !remaining.length && is_init;
  const isGameFinished =
    !remaining.length &&
    !answered.filter(item => item.answer === 'incorrect').length &&
    is_init;

  let components: ReactNode = null;

  if (isGameFinished) {
    components = <Finish />;
  } else if (isRoundFinished) {
    components = <Round />;
  } else if (activeCard) {
    if (isAnswered) {
      if (activeCardData.edit) {
        components = (
          <EditCard
            key={activeCardData._id}
            toggle={true}
            game={true}
            data={activeCardData}
          />
        );
      } else {
        components = <Answer data={activeCardData} />;
      }
    } else {
      components = <Question data={activeCardData} />;
    }
  }

  return (
    <ContentContainer loading={!is_init && loading} isScrollable>
      {components}
    </ContentContainer>
  );
};

export default Content;
