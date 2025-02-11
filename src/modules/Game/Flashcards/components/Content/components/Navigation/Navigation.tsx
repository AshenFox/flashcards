import { useActions, useAppSelector } from "@store/hooks";
import { TriangleLeftIcon, TriangleRightIcon } from "@ui/Icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent, useEffect, useRef } from "react";

import s from "./styles.module.scss";

const Navigation = () => {
  const {
    set_flashcards_progress,
    save_flashcards_answer,
    set_flashcards_side,
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
        if (cardAnswer === "correct") putSRAnswer(activeCardData._id, 1);
        if (cardAnswer === "incorrect") putSRAnswer(activeCardData._id, -1);

        save_flashcards_answer(activeCardData._id, cardAnswer);
      }
      set_flashcards_progress(value);
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
          set_flashcards_side("definition");
          return;
        }
        if (sideRef.current === "definition") {
          set_flashcards_side("term");
          return;
        }
      }

      if (isSR && isTurnedRef.current) {
        if (e.key === "ArrowRight") {
          putSRAnswer(_idRef.current, 1);
          save_flashcards_answer(_idRef.current, "correct");
          set_flashcards_progress("next");
        }

        if (e.key === "ArrowLeft") {
          putSRAnswer(_idRef.current, -1);
          save_flashcards_answer(_idRef.current, "incorrect");
          set_flashcards_progress("next");
        }
      }

      if (!isSR) {
        if (e.key === "ArrowLeft") {
          set_flashcards_progress("prev");
        }

        if (e.key === "ArrowRight") {
          set_flashcards_progress("next");
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
