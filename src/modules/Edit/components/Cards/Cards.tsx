import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import EditCard from "@components/EditCard";
import { useAppSelector } from "@store/hooks";
import ScrollLoader from "@ui/ScrollLoader";
import { memo, useMemo } from "react";

import { AddCard, Save } from "./components";
import s from "./styles.module.scss";

const Cards = () => {
  const cards = useAppSelector(s => s.main.cards);
  const currentModule = useAppSelector(s => s.main.module);
  const loading = useAppSelector(s => s.main.loading);

  const { draft } = currentModule || {};

  const formatted_cards = useMemo(
    () => Object.values(cards).sort((a, b) => a.order - b.order),
    [cards],
  );

  return (
    <ContentWrapper>
      <div className={s.cards}>
        <Container>
          {!!formatted_cards.length && <AddCard position="start" />}
          <div className={s.container}>
            {formatted_cards.map((card, _, arr) => (
              <EditCard
                key={card._id}
                data={card}
                index={card.order + 1}
                loading={loading}
                draft={draft}
                number={arr.length}
              />
            ))}
            {loading && <ScrollLoader active={loading} />}
          </div>
          {!!formatted_cards.length && <AddCard position="end" />}
        </Container>
      </div>
      {!!formatted_cards.length && <Save />}
    </ContentWrapper>
  );
};

export default memo(Cards);
