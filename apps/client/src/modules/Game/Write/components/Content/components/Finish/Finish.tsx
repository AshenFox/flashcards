import Results, { ResultItem } from "@modules/Game/components/Results";
import { useActions, useAppSelector } from "@store/hooks";
import { memo, useEffect } from "react";

const Finish = () => {
  const { nextWriteRound } = useActions();

  const all_cards_num = useAppSelector(s => s.game.write.all_cards_num);
  const rounds = useAppSelector(s => s.game.write.rounds);

  useEffect(() => {
    if (all_cards_num) nextWriteRound();
  }, []);

  return (
    <>
      {rounds.map((round, i) => {
        const correctNum = round.filter(
          item => item.answer === "correct",
        ).length;

        return (
          <Results
            key={i}
            title={`Round ${i + 1}`}
            progress={correctNum}
            all={round.length}
            showLink={i === 0}
          >
            {round.map((data, z) => (
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
