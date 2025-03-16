import { useActions } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const Start = () => {
  const { changeModal, toggleModal } = useActions();

  const click = (value: "log_in") => (e: MouseEvent<HTMLButtonElement>) => {
    changeModal({ active_modal: value });
    toggleModal();
  };

  return (
    <main className={s.start}>
      <div className={s.content}>
        <div className={s.intro}>
          <div className={s.welcome}>
            <h2>Welcome to</h2>
            <h1>Flash Cards</h1>
            <p>
              Web application for memorizing information via spaced repetition
              and interactive and engaging games.
            </p>
          </div>

          <Button onClick={click("log_in")} className={s.get_started}>
            Get started
          </Button>
        </div>
      </div>
    </main>
  );
};

export default memo(Start);
