import Results, { ResultItem } from "@modules/Game/components/Results";
import { useGameStore } from "@modules/Game/store/gameStore";
import { memo } from "react";

const Finish = () => {
  const answers = useGameStore(s => s.flashcards.answers);

  const correctNum = answers.filter(item => item.answer === "correct").length;

  return (
    <Results title={"Results"} progress={correctNum} all={answers.length}>
      {answers.map((data, i) => (
        <ResultItem data={data} number={i + 1} key={data.id} />
      ))}
    </Results>
  );
};

export default memo(Finish);
