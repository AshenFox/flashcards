import { useAppSelector } from "@store/hooks";
import { CardsIcon, WriteIcon } from "@ui/Icons";
import Skeleton from "@ui/Skeleton";
import Link from "next/link";
import { memo } from "react";

import Counter from "./components/Counter/Counter";
import InTime from "./components/InTime";
import s from "./styles.module.scss";

const StudyRegime = () => {
  const all_num = useAppSelector(s => s.sr.all_num);
  const repeat_num = useAppSelector(s => s.sr.repeat_num);
  const counter = useAppSelector(s => s.sr.counter);
  const loading = useAppSelector(s => s.sr.loading);

  return (
    <div className={s.study_regime}>
      <div className={s.description}>
        <div className={s.title}>Study Regime</div>
        <ul className={s.info}>
          <li>
            {typeof all_num === "undefined" || loading ? (
              <Skeleton width={"15rem"} />
            ) : (
              <>
                <span>
                  {all_num} card
                  {all_num > 1 || all_num < 1 ? "s" : ""}
                </span>{" "}
                in the regime.
              </>
            )}
          </li>
          <li>
            <InTime />
          </li>
        </ul>
      </div>

      <div className={s.repeat}>
        <p>
          {typeof repeat_num === "undefined" || loading ? (
            <Skeleton width={"20rem"} />
          ) : (
            <>
              Currently you have{" "}
              <span>
                {repeat_num} card
                {repeat_num > 1 || repeat_num < 1 ? "s" : ""}
              </span>{" "}
              to repeat.
            </>
          )}
        </p>
        {!!repeat_num && !loading && (
          <>
            <p>Repeat with:</p>
            <div className={s.methods}>
              <Counter />
              <Link
                href={"/flashcards/sr" + (counter ? `?number=${counter}` : "")}
              >
                <div className={s.item}>
                  <CardsIcon height="35" width="35" />
                </div>
              </Link>
              <Link href={"/write/sr" + (counter ? `?number=${counter}` : "")}>
                <div className={s.item}>
                  <WriteIcon height="35" width="35" />
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(StudyRegime);
