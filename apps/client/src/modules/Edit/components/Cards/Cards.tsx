import { EditCard } from "@components/Cards";
import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useEditContext } from "@modules/Edit/context";
import { useEditCards, useEditIsLoading } from "@modules/Edit/hooks";
import ScrollLoader from "@ui/ScrollLoader";
import { memo } from "react";

import { Action, AddCard } from "./components";
import s from "./styles.module.scss";

const Cards = () => {
  const cards = useEditCards();
  const loading = useEditIsLoading();
  const { selectionActive } = useEditContext();

  return (
    <ContentWrapper>
      <div className={s.cards}>
        <Container>
          {!!cards.length && <AddCard position="start" />}
          <div className={s.container}>
            {cards.map((card, i, arr) => (
              <EditCard
                key={card._id}
                data={card}
                index={i + 1}
                loading={loading}
                selectionActive={selectionActive}
                number={arr.length}
              />
            ))}
            <ScrollLoader active={loading} />
          </div>
          {!!cards.length && <AddCard position="end" />}
        </Container>
      </div>
      {!!cards.length && <Action />}
    </ContentWrapper>
  );
};

export default memo(Cards);
