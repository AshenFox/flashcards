import { memo } from 'react';
import Flashcards from '@modules/Flashcards';

const FlashcardsPage = () => {
  return (
    <>
      <Flashcards />
    </>
  );
};

export default memo(FlashcardsPage);
