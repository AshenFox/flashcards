import { useActions } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { memo } from "react";

import s from "./styles.module.scss";

const ExportCards = () => {
  const { exportSelectedCards } = useActions();

  return (
    <Button onClick={exportSelectedCards} design="plain" className={s.export}>
      Export
    </Button>
  );
};

export default memo(ExportCards);
