import EditCard from "@components/EditCard";
import ContentContainer from "@modules/Game/components/ContentContainer";
import { useAppSelector } from "@store/store";
import React, { memo, ReactNode } from "react";

import Answer from "./components/Answer";
import Finish from "./components/Finish";
import Question from "./components/Question";
import Round from "./components/Round";

const Content = () => {
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.sections.srCards.loading);
  const is_init = useAppSelector(s => s.game.write.is_init);
  const remaining = useAppSelector(s => s.game.write.remaining);
  const answered = useAppSelector(s => s.game.write.answered);

  const activeCard = remaining[remaining.length - 1];
  const isAnswered = activeCard ? !!activeCard.answer : false;
  const activeCardData = activeCard ? cards[activeCard.id] : null;

  const isRoundFinished = !remaining.length && is_init;
  const isGameFinished =
    !remaining.length &&
    !answered.filter(item => item.answer === "incorrect").length &&
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

export default memo(Content);
