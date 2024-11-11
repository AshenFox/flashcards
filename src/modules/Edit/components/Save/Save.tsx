import { useActions } from "@store/hooks";
import { useAppSelector } from "@store/store";
import { Button } from "@ui/InteractiveElement";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";
import { useSaveState } from "./useSaveActive";

const Save = () => {
  const { create_module } = useActions();

  const { active, loading } = useSaveState();

  const clickSave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (active) create_module();
    },
    [active, create_module],
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
