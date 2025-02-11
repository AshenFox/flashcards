import EditCard from "@components/EditCard";
import ContentContainer from "@modules/Game/components/ContentContainer";
import { useAppSelector } from "@store/hooks";
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

  const progress = useAppSelector(s => s.game.flashcards.progress);
  const side = useAppSelector(s => s.game.flashcards.side);
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.sections.srCards.loading);

  const formatted_cards = Object.values(cards);
  const { length } = formatted_cards;

  const activeCardData = formatted_cards[progress];

  const isEnd = length === progress;
  const isEdit = length && length !== progress ? activeCardData.edit : false;

  let content: ReactNode = null;

  if (isEdit) {
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
          formatted_cards.map((card, i) => {
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
        {length && isSR && isEnd && <Finish />}
        {length && !isSR && <EndGame active={isEnd} />}
      </>
    );
  }

  return (
    <ContentContainer
      loading={loading || !length}
      isScrollable={isEdit || (isSR && isEnd)}
    >
      <div className={s.container}>{content}</div>
      {!isEdit && !isEnd && <Navigation />}
    </ContentContainer>
  );
};

export default memo(Content);
