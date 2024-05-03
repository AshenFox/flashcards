import { memo } from 'react';
import { Flashcards } from '@modules/Game';

const FlashcardsPage = () => {
  return (
    <>
      <Flashcards />
    </>
  );
};

export default memo(FlashcardsPage);
