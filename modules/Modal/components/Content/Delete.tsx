import { useActions, useAppSelector } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { clsx } from "clsx";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const Delete = () => {
  const { delete_module, toggle_modal } = useActions();

  const currentModule = useAppSelector(s => s.main.module);

  const { _id, module_loading, title } = currentModule || {};

  const clickDelete = (e: MouseEvent<HTMLButtonElement>) => delete_module(_id);

  const close = (e: MouseEvent<HTMLButtonElement>) => toggle_modal();

  return (
    <>
      <div className={s.module_title}>
        <h2>{title}</h2>
      </div>

      <div className={s.warning}>
        <p>
          You are about to delete this module and all of its data. You
          won&apos;t be able to access this set ever again.
        </p>
      </div>

      <div className={s.question}>
        <p>Are you absolutely positive? There&apos;s no undo.</p>
      </div>

      <div className={s.choice}>
        <div className={clsx(s.choice_item, s.cancel)}>
          <Button onClick={close}>Cancel</Button>
        </div>

        <div className={s.choice_item}>
          <Button loading={module_loading} onClick={clickDelete}>
            Yes, delete set
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(Delete);
