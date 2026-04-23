import { EditCard } from "@components/Cards";
import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { VirtualizedItem, VirtualizedList } from "@components/Virtualized";
import { useEditContext } from "@modules/Edit/context";
import { useEditCards, useEditIsLoading } from "@modules/Edit/hooks";
import ScrollTop from "@modules/ScrollTop";
import ScrollLoader from "@ui/ScrollLoader";
import { memo } from "react";

import { Action, AddCard } from "./components";
import { useEditCardsVirtualizer } from "./hooks/useEditCardsVirtualizer";
import s from "./styles.module.scss";

const Cards = () => {
  const cards = useEditCards();
  const loading = useEditIsLoading();
  const { selectionActive } = useEditContext();
  const virtualizer = useEditCardsVirtualizer(cards);

  return (
    <ContentWrapper>
      <div className={s.cards}>
        <Container>
          {!!cards.length && <AddCard position="start" />}
          {!!cards.length && (
            <VirtualizedList
              className={s.container}
              totalSize={virtualizer.getTotalSize()}
            >
              {virtualizer.getVirtualItems().map(virtualItem => {
                const card = cards[virtualItem.index];
                if (!card) return null;

                return (
                  <VirtualizedItem
                    key={card._id}
                    virtualizer={virtualizer}
                    virtualItem={virtualItem}
                  >
                    <EditCard
                      data={card}
                      index={virtualItem.index + 1}
                      loading={loading}
                      selectionActive={selectionActive}
                      number={cards.length}
                    />
                  </VirtualizedItem>
                );
              })}
            </VirtualizedList>
          )}
          <ScrollLoader active={loading} />
          <ScrollTop virtualizer={virtualizer} />
          {!!cards.length && <AddCard position="end" />}
        </Container>
      </div>
      {!!cards.length && <Action />}
    </ContentWrapper>
  );
};

export default memo(Cards);
