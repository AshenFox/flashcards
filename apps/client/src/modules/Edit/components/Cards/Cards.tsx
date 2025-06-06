import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import EditCard from "@components/EditCard";
import { useEditContext } from "@modules/Edit/context";
import { useAppSelector } from "@store/hooks";
import ScrollLoader from "@ui/ScrollLoader";
import { memo, useMemo } from "react";

import { Action, AddCard } from "./components";
import s from "./styles.module.scss";

const Cards = () => {
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(
    s => s.main.sections.editDraft.loading || s.main.sections.module.loading,
  );

  const { selectionActive } = useEditContext();

  const formatted_cards = useMemo(() => Object.values(cards), [cards]);

  return (
    <ContentWrapper>
      <div className={s.cards}>
        <Container>
          {!!formatted_cards.length && <AddCard position="start" />}
          <div className={s.container}>
            {formatted_cards.map((card, i, arr) => (
              <EditCard
                key={card._id}
                data={card}
                index={i + 1}
                loading={loading}
                selectionActive={selectionActive}
                number={arr.length}
              />
            ))}
            {loading && <ScrollLoader active={loading} />}
          </div>
          {!!formatted_cards.length && <AddCard position="end" />}
        </Container>
      </div>
      {!!formatted_cards.length && <Action />}
    </ContentWrapper>
  );
};

export default memo(Cards);
