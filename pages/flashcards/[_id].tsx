import { Flashcards } from "@modules/Game";
import { memo } from "react";

const FlashcardsPage = () => {
  return (
    <>
      <Flashcards />
    </>
  );
};

export default memo(FlashcardsPage);
