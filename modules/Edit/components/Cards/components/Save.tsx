import Container from "@components/Container";
import { useActions, useAppSelector } from "@store/hooks";
import LoadingBtn from "@ui/LoadingBtn";
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
          <LoadingBtn
            active={active || !draft ? true : false}
            loading={module_loading}
            onClickHandler={draft ? clickSave : clickLink}
            classStr="btn bcc-lightblue pad30-70 brr15 white fz20 fw-bold h-grey h-bcc-yellow"
          >
            {draft ? "Save" : "Return"}
          </LoadingBtn>
        </div>
      </Container>
    </div>
  );
};

export default memo(Save);
