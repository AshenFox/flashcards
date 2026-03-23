import Results, { ResultItem } from "@modules/Game/components/Results";
import { useActions, useAppSelector } from "@store/hooks";
import { memo, useEffect } from "react";

const Finish = () => {
  const { nextWriteRound } = useActions();

  const rounds = useAppSelector(s => s.game.write.rounds);

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
