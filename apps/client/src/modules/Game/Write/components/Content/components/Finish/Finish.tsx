import Results, { ResultItem } from "@modules/Game/components/Results";
import { useGameStore } from "@modules/Game/store/gameStore";
import { memo, useEffect } from "react";

const Finish = () => {
  const nextWriteRound = useGameStore(s => s.nextWriteRound);
  const rounds = useGameStore(s => s.write.rounds);

  useEffect(() => {
    nextWriteRound();
  }, [nextWriteRound]);

  return (
    <>
      {rounds.map((round, i) => {
        const correctNum = round.answered.filter(
          item => item.answer === "correct",
        ).length;

        return (
          <Results
            key={i}
            title={`Round ${i + 1}`}
            progress={correctNum}
            all={round.cards_num}
            showLink={i === 0}
          >
            {round.answered.map((data, z) => (
              <ResultItem
                data={data}
                number={z + 1}
                key={data.id}
                showHeader={i === 0}
              />
            ))}
          </Results>
        );
      })}
    </>
  );
};

export default memo(Finish);
