import { EditCard } from "@components/Cards";
import { useCardsUIStore } from "@components/Cards/state/context";
import ContentContainer from "@modules/Game/components/ContentContainer";
import {
  useGameActiveCardsQuery,
  useOrderedGameCards,
} from "@modules/Game/hooks";
import { useGameStore } from "@zustand/game/gameStore";
import { useRouter } from "next/router";
import { memo, ReactNode } from "react";

import Card from "./components/Card/Card";
import EndGame from "./components/Card/EndGame";
import Finish from "./components/Finish";
import Navigation from "./components/Navigation";
import s from "./styles.module.scss";

const Content = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const progress = useGameStore(s => s.flashcards.progress);
  const side = useGameStore(s => s.flashcards.side);
  const ended_early = useGameStore(s => s.flashcards.ended_early);
  const orderedCards = useOrderedGameCards();
  const { isLoading } = useGameActiveCardsQuery();

  const activeCardData = orderedCards[progress];
  const length = orderedCards.length;
  const cardId = activeCardData?._id;
  const cardEdit = useCardsUIStore(s =>
    cardId ? (s.cards[cardId]?.edit ?? false) : false,
  );

  const isEnd = length === progress || ended_early;
  const isEdit = !!(length && length !== progress && cardEdit);

  let content: ReactNode = null;

  if (isEdit && activeCardData) {
    content = (
      <EditCard
        key={activeCardData._id}
        data={activeCardData}
        toggle={true}
        game={true}
      />
    );
  } else {
    content = (
      <>
        {!isEnd &&
          orderedCards.map((card, i) => {
            if (i === progress) {
              return <Card key={card._id} data={card} side={side} />;
            } else if (i === progress - 1 && progress - 1 >= 0) {
              return <Card key={card._id} data={card} position={"prev"} />;
            } else if (i === progress + 1 && progress + 1 <= length - 1) {
              return <Card key={card._id} data={card} position={"next"} />;
            } else {
              return false;
            }
          })}
        {length && isSR && isEnd && !ended_early && <Finish />}
        {length && ((!isSR && isEnd) || ended_early) && (
          <EndGame
            active={isEnd}
            cardsStudied={ended_early ? progress : length}
          />
        )}
      </>
    );
  }

  return (
    <ContentContainer
      loading={isLoading || !length}
      isScrollable={isEdit || (isSR && isEnd)}
    >
      <div className={s.container}>{content}</div>
      {!isEdit && !isEnd && <Navigation />}
    </ContentContainer>
  );
};

export default memo(Content);
