import { useActions, useAppSelector } from "@store/hooks";
import { TriangleLeftIcon, TriangleRightIcon } from "@ui/Icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent, useEffect, useRef } from "react";

import s from "./styles.module.scss";

const Navigation = () => {
  const {
    saveFlashcardsAnswer,
    setFlashcardsSide,
    setFlashcardsProgress,
    putSRAnswer,
  } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const cards = useAppSelector(s => s.main.cards);
  const progress = useAppSelector(s => s.game.flashcards.progress);
  const is_turned = useAppSelector(s => s.game.flashcards.is_turned);
  const side = useAppSelector(s => s.game.flashcards.side);

  const clickNavItem =
    (value: "next" | "prev", cardAnswer?: "correct" | "incorrect") =>
    (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (value === "next" && isSR) {
        const { _id } = activeCardData;
        if (cardAnswer === "correct") putSRAnswer(_id, 1);
        if (cardAnswer === "incorrect") putSRAnswer(_id, -1);

        saveFlashcardsAnswer({
          _id,
          answer: cardAnswer,
        });
      }
      setFlashcardsProgress(value);
    };

  const cardsArr = Object.values(cards);

  const activeCardData = cardsArr[progress];

  const _idRef = useRef(activeCardData._id);
  const sideRef = useRef(side);
  const isTurnedRef = useRef(is_turned);

  _idRef.current = activeCardData._id;
  sideRef.current = side;
  isTurnedRef.current = is_turned;

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (sideRef.current === "term") {
          setFlashcardsSide({ value: "definition" });
          return;
        }
        if (sideRef.current === "definition") {
          setFlashcardsSide({ value: "term" });
          return;
        }
      }

      if (isSR && isTurnedRef.current) {
        const _id = _idRef.current;
        if (e.key === "ArrowRight") {
          putSRAnswer(_id, 1);
          saveFlashcardsAnswer({
            _id,
            answer: "correct",
          });
          setFlashcardsProgress("next");
        }

        if (e.key === "ArrowLeft") {
          putSRAnswer(_id, -1);
          saveFlashcardsAnswer({
            _id,
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
  }, []);

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
              progress >= cardsArr.length && s.inactive,
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
