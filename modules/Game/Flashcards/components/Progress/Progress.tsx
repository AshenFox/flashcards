import DefaultProgress, {
  ProgressItem,
} from "@modules/Game/components/Progress";
import { useAppSelector } from "@store/hooks";
import ProgressBar from "@ui/ProgressBar";
import { memo } from "react";

import s from "./styles.module.scss";

const Progress = () => {
  const cards = useAppSelector((s) => s.main.cards);
  const progress = useAppSelector((s) => s.game.flashcards.progress);

  const cards_arr = Object.keys(cards);

  return (
    <DefaultProgress>
      <ProgressItem>
        <ProgressBar
          progress={progress}
          complete={cards_arr.length}
          title={"progress"}
          showComplete
          className={s.progress_bar}
        />
      </ProgressItem>
    </DefaultProgress>
  );
};

export default memo(Progress);
