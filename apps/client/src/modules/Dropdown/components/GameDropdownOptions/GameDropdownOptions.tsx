import { useGameCardsById, useGameOrderLength } from "@modules/Game/hooks";
import { useGameStore } from "@modules/Game/store/gameStore";
import { ShuffleIcon } from "@ui/Icons";
import { memo, MouseEvent as ReactMouseEvent } from "react";

import Divider from "../Divider";
import Item from "../Item";

type GameDropdownOptionsProps = {
  isFlashcards: boolean;
  isWrite: boolean;
  isSR: boolean;
};

const GameDropdownOptions = ({
  isFlashcards,
  isWrite,
  isSR,
}: GameDropdownOptionsProps) => {
  const setFlashcardsShuffled = useGameStore(s => s.setFlashcardsShuffled);
  const resetFlashcardsProgress = useGameStore(s => s.resetFlashcardsProgress);
  const prepareWrite = useGameStore(s => s.prepareWrite);
  const endFlashcardsEarly = useGameStore(s => s.endFlashcardsEarly);
  const endWriteEarly = useGameStore(s => s.endWriteEarly);
  const shuffleOrder = useGameStore(s => s.shuffleOrder);
  const sortOrder = useGameStore(s => s.sortOrder);
  const cardsById = useGameCardsById();
  const orderLength = useGameOrderLength();

  const shuffled = useGameStore(s => s.flashcards.shuffled);
  const flashcards_ended_early = useGameStore(s => s.flashcards.ended_early);
  const write_ended_early = useGameStore(s => s.write.ended_early);
  const flashcards_progress = useGameStore(s => s.flashcards.progress);
  const write_remaining = useGameStore(s => s.write.remaining);
  const write_answered = useGameStore(s => s.write.answered);
  const write_is_init = useGameStore(s => s.write.is_init);

  const clickShuffle = (_e: ReactMouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sortOrder(cardsById);
      setFlashcardsShuffled(false);
    } else {
      shuffleOrder(cardsById);
      setFlashcardsShuffled(true);
    }

    resetFlashcardsProgress();
  };

  const clickStartOver = (_e: ReactMouseEvent<HTMLButtonElement>) =>
    prepareWrite(cardsById);

  const flashcards_at_end =
    orderLength === flashcards_progress || flashcards_ended_early;
  const write_is_game_finished =
    !write_remaining.length &&
    !write_answered.filter(item => item.answer === "incorrect").length &&
    write_is_init;
  const write_at_end = write_is_game_finished || write_ended_early;

  const clickEndGame = (_e: ReactMouseEvent<HTMLButtonElement>) => {
    if (isFlashcards) endFlashcardsEarly();
    else endWriteEarly();
  };

  const showEndGameItem =
    (isFlashcards || isWrite) &&
    !(isFlashcards && flashcards_at_end) &&
    !(isWrite && write_at_end);

  return (
    <>
      {!isSR && <Divider>Options:</Divider>}

      {isFlashcards && !isSR && (
        <Item onClick={clickShuffle} icon={<ShuffleIcon />} active={shuffled}>
          Shuffle
        </Item>
      )}
      {isWrite && !isSR && (
        <Item onClick={clickStartOver} caution>
          Start over
        </Item>
      )}
      {showEndGameItem && <Item onClick={clickEndGame}>End game</Item>}
    </>
  );
};

export default memo(GameDropdownOptions);
