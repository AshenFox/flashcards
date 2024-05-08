import DefaultProgress, {
  ProgressItem,
} from "@modules/Game/components/Progress";
import { useAppSelector } from "@store/hooks";
import ProgressBar from "@ui/ProgressBar";
import React, { memo } from "react";

const Progress = () => {
  const remaining = useAppSelector((s) => s.game.write.remaining);
  const answered = useAppSelector((s) => s.game.write.answered);
  const rounds = useAppSelector((s) => s.game.write.rounds);
  const all_cards_num = useAppSelector((s) => s.game.write.all_cards_num);

  const correctAnswered = answered.filter(
    (item) => item.answer === "correct",
  ).length;

  let correctRounds = 0;
  for (const round of rounds) {
    let correctRound = round.filter((item) => item.answer === "correct").length;
    correctRounds += correctRound;
  }

  const remainingNum = remaining.length;
  const correctNum = correctAnswered + correctRounds;
  const incorrectNum = answered.filter(
    (item) => item.answer === "incorrect",
  ).length;

  return (
    <DefaultProgress>
      <ProgressItem>
        <ProgressBar
          progress={remainingNum}
          complete={all_cards_num}
          title={"remaining"}
          showComplete={false}
        />
      </ProgressItem>

      <ProgressItem>
        <ProgressBar
          progress={incorrectNum}
          complete={all_cards_num}
          title={"incorrect"}
          showComplete={false}
          color="red"
        />
      </ProgressItem>

      <ProgressItem>
        <ProgressBar
          progress={correctNum}
          complete={all_cards_num}
          title={"correct"}
          showComplete={false}
          color="green"
        />
      </ProgressItem>
    </DefaultProgress>
  );
};

export default memo(Progress);
