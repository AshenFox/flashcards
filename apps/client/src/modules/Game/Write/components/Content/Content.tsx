import { EditCard } from "@components/Cards";
import { useCardsUIStore } from "@components/Cards/state/context";
import ContentContainer from "@modules/Game/components/ContentContainer";
import { useGameActiveCardsQuery, useGameCardsById } from "@modules/Game/hooks";
import { useGameStore } from "@zustand/game/gameStore";
import React, { memo, ReactNode } from "react";

import Answer from "./components/Answer";
import Finish from "./components/Finish";
import Question from "./components/Question";
import Round from "./components/Round";

const Content = () => {
  const cardsById = useGameCardsById();
  const { isLoading } = useGameActiveCardsQuery();

  const is_init = useGameStore(s => s.write.is_init);
  const remaining = useGameStore(s => s.write.remaining);
  const is_game_finished = useGameStore(s => s.write.is_game_finished);
  const is_round_finished = useGameStore(s => s.write.is_round_finished);

  const activeCard = remaining[remaining.length - 1];
  const isAnswered = activeCard ? !!activeCard.answer : false;
  const activeCardData = activeCard ? cardsById[activeCard.id] : null;
  const cardId = activeCardData?._id;
  const cardEdit = useCardsUIStore(s =>
    cardId ? (s.cards[cardId]?.edit ?? false) : false,
  );

  const isRoundFinished = is_round_finished && is_init;
  const isGameFinished = is_game_finished && is_init;

  let components: ReactNode = null;

  if (isGameFinished) {
    components = <Finish />;
  } else if (isRoundFinished) {
    components = <Round />;
  } else if (activeCard && activeCardData) {
    if (isAnswered) {
      if (cardEdit) {
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
    <ContentContainer loading={!is_init || isLoading} isScrollable>
      {components}
    </ContentContainer>
  );
};

export default memo(Content);
