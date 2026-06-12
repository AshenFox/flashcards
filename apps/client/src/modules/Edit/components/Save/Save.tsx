import { useEditContext } from "@modules/Edit/context";
import { useEditPublishDraftMutation } from "@modules/Edit/hooks";
import { Button } from "@ui/InteractiveElement";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";
import { useSaveState } from "./useSaveActive";

const Save = () => {
  const { selectionActive } = useEditContext();

  const publishMut = useEditPublishDraftMutation();
  const { active, loading: pageLoading } = useSaveState();

  const clickSave = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => {
      if (!active) return;
      publishMut.mutate({ saveAllCards: !selectionActive });
    },
    [active, publishMut, selectionActive],
  );

  const loading = pageLoading || publishMut.isPending;

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
