import DefaultProgress, {
  ProgressItem,
} from "@modules/Game/components/Progress";
import ProgressBar from "@ui/ProgressBar";
import { useGameStore } from "@zustand/game/gameStore";
import { memo } from "react";

const Progress = () => {
  const remaining = useGameStore(s => s.write.remaining);
  const answered = useGameStore(s => s.write.answered);
  const rounds = useGameStore(s => s.write.rounds);
  const all_cards_num = useGameStore(s => s.write.all_cards_num);

  const correctAnswered = answered.filter(
    item => item.answer === "correct",
  ).length;

  let correctRounds = 0;
  for (const round of rounds) {
    const correctRound = round.answered.filter(
      item => item.answer === "correct",
    ).length;
    correctRounds += correctRound;
  }

  const remainingNum = remaining.length;
  const correctNum = correctAnswered + correctRounds;
  const incorrectNum = answered.filter(
    item => item.answer === "incorrect",
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
