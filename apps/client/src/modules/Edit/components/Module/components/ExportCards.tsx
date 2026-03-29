import { useCardsCash } from "@components/Cards";
import { useEditCards, useEditCardsUIStore } from "@modules/Edit/hooks";
import { Button } from "@ui/InteractiveElement";
import { memo, useCallback, useMemo } from "react";

import s from "./styles.module.scss";

const ExportCards = () => {
  const cardsCache = useCardsCash();
  const cardsList = useEditCards();
  const cardsUi = useEditCardsUIStore((s) => s.cards);

  const active = useMemo(
    () => cardsList.some((card) => cardsUi[card._id]?.save),
    [cardsList, cardsUi],
  );

  const exportSelectedCards = useCallback(() => {
    const selectedCards = cardsCache
      .getAllCards()
      .filter((card) => cardsUi[card._id]?.save)
      .map((card) => ({
        _id: card._id,
        moduleID: card.moduleID,
        term: card.term,
        definition: card.definition,
        imgurl: card.imgurl,
        author_id: card.author_id,
        author: card.author,
      }));

    if (selectedCards.length === 0) {
      console.error("No cards selected for export");
      return;
    }

    const dataStr = JSON.stringify(selectedCards, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `flashcards_export_${new Date().toISOString().slice(0, 10)}_${new Date().toLocaleTimeString().replace(/:/g, "-")}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [cardsCache, cardsUi]);

  return (
    <Button
      onClick={exportSelectedCards}
      design="plain"
      className={s.export}
      active={active}
    >
      Export
    </Button>
  );
};

export default memo(ExportCards);
