import { useActions } from "@store/hooks";
import { useAppSelector } from "@store/store";
import { Button } from "@ui/InteractiveElement";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";
import { useSaveState } from "./useSaveActive";

const Save = () => {
  const { createModule } = useActions();

  const { active, loading } = useSaveState();

  const clickSave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (active) createModule();
    },
    [active, createModule],
  );

  return (
    <Button
      className={s.save}
      active={active}
      loading={loading}
      onClick={clickSave}
    >
      Save
    </Button>
  );
};

export default memo(Save);
