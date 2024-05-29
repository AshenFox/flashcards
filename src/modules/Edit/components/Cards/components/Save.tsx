import Container from "@components/Container";
import { useActions, useAppSelector } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { useRouter } from "next/router";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";

const Save = () => {
  const { create_module } = useActions();

  const currentModule = useAppSelector(s => s.main.module);
  const cards = useAppSelector(s => s.main.cards);

  const { _id, draft, title, module_loading } = currentModule || {};

  const router = useRouter();

  const cardsArr = Object.values(cards);

  let twoSaved = false;
  let counter = 0;

  for (const card of cardsArr) {
    if (card.save === true) {
      ++counter;
      if (counter >= 2) {
        twoSaved = true;
        break;
      }
    }
  }

  const active = !!(twoSaved && title);

  const clickSave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (active) create_module();
    },
    [active, create_module],
  );

  const clickLink = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      router.replace(`/module/${_id}`);
    },
    [_id, router],
  );

  return (
    <div className={s.save}>
      <Container>
        <div className={s.save_module}>
          <Button
            active={active || !draft ? true : false}
            loading={module_loading}
            onClick={draft ? clickSave : clickLink}
          >
            {draft ? "Save" : "Return"}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default memo(Save);
