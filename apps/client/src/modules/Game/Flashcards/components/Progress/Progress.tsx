import DefaultProgress, {
  ProgressItem,
} from "@modules/Game/components/Progress";
import { useGameStore } from "@modules/Game/store/gameStore";
import ProgressBar from "@ui/ProgressBar";
import { memo } from "react";

import s from "./styles.module.scss";

const Progress = () => {
  const progress = useGameStore(s => s.flashcards.progress);
  const all_cards_num = useGameStore(s => s.flashcards.all_cards_num);

  return (
    <DefaultProgress>
      <ProgressItem>
        <ProgressBar
          progress={progress}
          complete={all_cards_num}
          title={"progress"}
          showComplete
          className={s.progress_bar}
        />
      </ProgressItem>
    </DefaultProgress>
  );
};

export default memo(Progress);
