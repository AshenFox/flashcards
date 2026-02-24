import DefaultProgress, {
  ProgressItem,
} from "@modules/Game/components/Progress";
import { useAppSelector } from "@store/hooks";
import ProgressBar from "@ui/ProgressBar";
import { memo } from "react";

import s from "./styles.module.scss";

const Progress = () => {
  const progress = useAppSelector(s => s.game.flashcards.progress);
  const all_cards_num = useAppSelector(s => s.game.flashcards.all_cards_num);

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
