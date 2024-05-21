import { useActions, useAppSelector } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { CSSProperties, memo, MouseEvent } from "react";

import s from "./styles.module.scss";

const Start = () => {
  const { change_modal, toggle_modal } = useActions();

  const header_height = useAppSelector(s => s.dimen.header_height);
  const is_server = useAppSelector(s => s.main.is_server);

  const click = (value: "log_in") => (e: MouseEvent<HTMLButtonElement>) => {
    change_modal(value);
    toggle_modal();
  };

  const startStyles: CSSProperties = {
    minHeight: `${
      !is_server
        ? 0.1 + document.documentElement.clientHeight - header_height
        : 0
    }px`,
  };

  return (
    <main className={s.start}>
      <div className={s.content}>
        <div className={s.intro} style={startStyles}>
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
