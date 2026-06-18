import LogIn from "@modules/Modal/components/Content/LogIn";
import { useModalStore } from "@modules/Modal/store";
import { Button } from "@ui/InteractiveElement";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const Start = () => {
  const open = useModalStore(state => state.open);

  const click = (_e: MouseEvent<HTMLButtonElement>) => {
    open({ title: "Log in", content: <LogIn /> });
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

          <Button onClick={click} className={s.get_started}>
            Get started
          </Button>
        </div>
      </div>
    </main>
  );
};

export default memo(Start);
