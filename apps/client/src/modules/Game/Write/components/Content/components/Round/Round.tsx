import { useActions, useAppSelector } from "@store/hooks";
import { Link } from "@ui/InteractiveElement";
import { useRouter } from "next/router";
import { memo, MouseEvent, useEffect } from "react";

import Score from "./component/Score";
import s from "./styles.module.scss";

const Round = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const { nextWriteRound } = useActions();

  const answered = useAppSelector(s => s.game.write.answered);
  const rounds = useAppSelector(s => s.game.write.rounds);
  const all_cards_num = useAppSelector(s => s.game.write.all_cards_num);

  const correctAnswered = answered.filter(
    item => item.answer === "correct",
  ).length;

  let correctRounds = 0;

  for (const round of rounds) {
    let correctRound = round.answered.filter(
      item => item.answer === "correct",
    ).length;
    correctRounds += correctRound;
  }

  const correctNum = correctAnswered + correctRounds;
  const incorrectNum = answered.filter(
    item => item.answer === "incorrect",
  ).length;
  const roundCardsNum = answered.length;

  const roundNum = rounds.length + 1;

  const clickContinue = (e: MouseEvent<HTMLButtonElement>) => {
    nextWriteRound();
  };

  const keyDownContinue = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      nextWriteRound();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownContinue);

    return () => {
      window.removeEventListener("keydown", keyDownContinue);
    };
  }, []);

  return (
    <div className={s.round}>
      <div className={s.header}>
        <h1>
          <span>Round </span>
          <span>{roundNum}</span>
        </h1>
        <Link href={isSR ? "/home/sr" : `/module/${_id}`}>Return</Link>
      </div>
      <div className={s.body}>
        <Score
          title="Correct"
          progress={correctAnswered}
          all={roundCardsNum}
          result="correct"
        />

        <Score
          title="Incorrect"
          progress={incorrectNum}
          all={roundCardsNum}
          result="incorrect"
        />

        <Score
          title="Overall progress"
          progress={correctNum}
          all={all_cards_num}
          displayAll
        />
      </div>

      <div className={s.continue}>
        <button onClick={clickContinue}>Continue</button>
      </div>
    </div>
  );
};

export default memo(Round);
