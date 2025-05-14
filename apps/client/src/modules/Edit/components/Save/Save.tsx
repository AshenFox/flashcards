import { useEditContext } from "@modules/Edit/context";
import { useActions } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";
import { useSaveState } from "./useSaveActive";

const Save = () => {
  const { selectionActive } = useEditContext();

  const { createModule } = useActions();

  const { active, loading } = useSaveState();

  const clickSave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (active) createModule(!selectionActive);
    },
    [active, createModule, selectionActive],
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
