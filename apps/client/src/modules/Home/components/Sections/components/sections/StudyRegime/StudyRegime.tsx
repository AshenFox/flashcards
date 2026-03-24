import { CardsIcon, WriteIcon } from "@ui/Icons";
import Skeleton from "@ui/Skeleton";
import { useSRStore } from "@zustand/sr";
import Link from "next/link";
import { memo, useEffect } from "react";

import Counter from "./components/Counter/Counter";
import InTime from "./components/InTime";
import { useSRCountQuery } from "./hooks";
import s from "./styles.module.scss";

const StudyRegime = () => {
  const { data, isLoading } = useSRCountQuery();

  const setInitialCounter = useSRStore(s => s.setInitialCounter);
  const initialized = useSRStore(s => s.initialized);
  const counter = useSRStore(s => s.counter);

  useEffect(() => {
    if (typeof data?.repeat_num === "number" && !initialized)
      setInitialCounter(data.repeat_num);
  }, [data?.repeat_num, initialized, setInitialCounter]);

  return (
    <div className={s.study_regime}>
      <div className={s.description}>
        <div className={s.title}>Study Regime</div>
        <ul className={s.info}>
          <li>
            {typeof data?.all_num === "undefined" || isLoading ? (
              <Skeleton width={"15rem"} />
            ) : (
              <>
                <span>
                  {data?.all_num} card
                  {(data?.all_num ?? 0) > 1 || (data?.all_num ?? 0) < 1
                    ? "s"
                    : ""}
                </span>{" "}
                in the regime.
              </>
            )}
          </li>
          <li>
            <InTime
              nextNum={data?.next_num}
              nextDate={data?.next_date}
              loading={isLoading}
            />
          </li>
        </ul>
      </div>

      <div className={s.repeat}>
        <p>
          {typeof data?.repeat_num === "undefined" || isLoading ? (
            <Skeleton width={"20rem"} />
          ) : (
            <>
              Currently you have{" "}
              <span>
                {data?.repeat_num} card
                {(data?.repeat_num ?? 0) > 1 || (data?.repeat_num ?? 0) < 1
                  ? "s"
                  : ""}
              </span>{" "}
              to repeat.
            </>
          )}
        </p>
        {!!data?.repeat_num && !isLoading && (
          <>
            <p>Repeat with:</p>
            <div className={s.methods}>
              <Counter repeatNum={data.repeat_num} />
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
