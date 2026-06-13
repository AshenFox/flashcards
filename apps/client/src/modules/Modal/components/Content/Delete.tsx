import { useModalStore } from "@modules/Modal/store";
import { useDeleteModuleMutation, useModuleQuery } from "@modules/Module/hooks";
import { Button } from "@ui/InteractiveElement";
import { clsx } from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const Delete = () => {
  const close = useModalStore(state => state.close);
  const { data } = useModuleQuery();
  const deleteMutation = useDeleteModuleMutation();

  const title = data?.module?.title;

  const clickDelete = (_e: MouseEvent<HTMLButtonElement>) =>
    deleteMutation.mutate();

  const onClose = (_e: MouseEvent<HTMLButtonElement>) => close();

  return (
    <>
      <div className={s.module_title}>
        <h2>{title}</h2>
      </div>

      <div className={s.warning}>
        <p>
          You are about to delete this module and all of its data. You
          won&apos;t be able to access this module ever again.
        </p>
      </div>

      <div className={s.question}>
        <p>Are you absolutely positive? There&apos;s no undo.</p>
      </div>

      <div className={s.choice}>
        <div className={clsx(s.choice_item, s.cancel)}>
          <Button onClick={onClose}>Cancel</Button>
        </div>

        <div className={s.choice_item}>
          <Button loading={deleteMutation.isPending} onClick={clickDelete}>
            Yes, delete set
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(Delete);
