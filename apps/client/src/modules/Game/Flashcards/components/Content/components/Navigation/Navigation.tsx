import {
  useOrderedGameCards,
  useSaveSRAnswerMutation,
} from "@modules/Game/hooks";
import { TriangleLeftIcon, TriangleRightIcon } from "@ui/Icons";
import { useGameStore } from "@zustand/game/gameStore";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent, useEffect, useRef } from "react";

import s from "./styles.module.scss";

const Navigation = () => {
  const saveFlashcardsAnswer = useGameStore(s => s.saveFlashcardsAnswer);
  const setFlashcardsSide = useGameStore(s => s.setFlashcardsSide);
  const setFlashcardsProgress = useGameStore(s => s.setFlashcardsProgress);
  const { mutate: saveSRAnswer } = useSaveSRAnswerMutation();

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const orderedCards = useOrderedGameCards();
  const progress = useGameStore(s => s.flashcards.progress);
  const is_turned = useGameStore(s => s.flashcards.is_turned);
  const side = useGameStore(s => s.flashcards.side);

  const activeCardData = orderedCards[progress];

  const clickNavItem =
    (value: "next" | "prev", cardAnswer?: "correct" | "incorrect") =>
    (_e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (value === "next" && isSR && activeCardData) {
        const { _id } = activeCardData;
        if (cardAnswer === "correct") saveSRAnswer({ _id, answer: 1 });
        if (cardAnswer === "incorrect") saveSRAnswer({ _id, answer: -1 });

        saveFlashcardsAnswer({
          _id,
          answer: cardAnswer,
        });
      }
      setFlashcardsProgress(value);
    };

  const _idRef = useRef(activeCardData?._id);
  const sideRef = useRef(side);
  const isTurnedRef = useRef(is_turned);

  _idRef.current = activeCardData?._id;
  sideRef.current = side;
  isTurnedRef.current = is_turned;

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (sideRef.current === "term") {
          setFlashcardsSide("definition");
          return;
        }
        if (sideRef.current === "definition") {
          setFlashcardsSide("term");
          return;
        }
      }

      if (isSR && isTurnedRef.current) {
        const cardId = _idRef.current;
        if (!cardId) return;

        if (e.key === "ArrowRight") {
          saveSRAnswer({ _id: cardId, answer: 1 });
          saveFlashcardsAnswer({
            _id: cardId,
            answer: "correct",
          });
          setFlashcardsProgress("next");
        }

        if (e.key === "ArrowLeft") {
          saveSRAnswer({ _id: cardId, answer: -1 });
          saveFlashcardsAnswer({
            _id: cardId,
            answer: "incorrect",
          });
          setFlashcardsProgress("next");
        }
      }

      if (!isSR) {
        if (e.key === "ArrowLeft") {
          setFlashcardsProgress("prev");
        }

        if (e.key === "ArrowRight") {
          setFlashcardsProgress("next");
        }
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, [
    isSR,
    saveFlashcardsAnswer,
    saveSRAnswer,
    setFlashcardsProgress,
    setFlashcardsSide,
  ]);

  if (!activeCardData) return null;

  return (
    <div className={s.navigation}>
      {isSR && (
        <div
          className={clsx(s.question, {
            [s.active]: is_turned,
          })}
        >
          <p>Did you know the answer?</p>
          <div
            className={clsx(s.answer, s.correct)}
            onClick={clickNavItem("next", "correct")}
          >
            <span>Yes</span>
          </div>
          <div
            className={clsx(s.answer, s.incorrect)}
            onClick={clickNavItem("next", "incorrect")}
          >
            <span>No</span>
          </div>
        </div>
      )}

      {!isSR && (
        <>
          <div className={clsx(s.item, s.prev, progress <= 0 && s.inactive)}>
            <button onClick={clickNavItem("prev")}>
              <TriangleLeftIcon />
            </button>
          </div>

          <div
            className={clsx(
              s.item,
              s.next,
              progress >= orderedCards.length && s.inactive,
            )}
          >
            <button onClick={clickNavItem("next")}>
              <TriangleRightIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Navigation);
