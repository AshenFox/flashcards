import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useRef } from "react";

import s from "./styles.module.scss";

type EndGameProps = {
  active: boolean;
  cardsStudied: number;
};

const EndGame = ({ active, cardsStudied }: EndGameProps) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";
  const finishHref = isSR ? "/home/sr" : `/module/${_id}`;

  const isEndRef = useRef(active);
  isEndRef.current = active;

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && isEndRef.current) {
      router.replace(finishHref);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [finishHref]);

  return (
    <div className={clsx(s.card, !active && s.transparent)}>
      <div
        className={clsx(
          s.front,
          s.unmovable,
          !active && clsx(s.next, s.transparent),
        )}
      >
        <h1 className={s.message}>Nice work!</h1>
        <p
          className={s.message_info}
        >{`You've just studied ${cardsStudied} term${
          cardsStudied !== 1 ? "s" : ""
        }!`}</p>
        <Link href={finishHref}>
          <button className={s.finish_up}>Return</button>
        </Link>
      </div>
      <div
        className={clsx(
          s.back,
          s.unmovable,
          s.rear_side,
          !active && clsx(s.next, s.transparent),
        )}
      ></div>
    </div>
  );
};

export default memo(EndGame);
