import { useAppSelector } from "@store/hooks";
import { CardsIcon, WriteIcon } from "@ui/Icons";
import Link from "next/link";
import { FC, memo } from "react";
import Skeleton from "react-loading-skeleton";

import SrCounter from "./components/Counter/Counter";
import InTime from "./components/InTime";
import s from "./styles.module.scss";

interface OwnProps {}

type Props = OwnProps;

const StudyRegime: FC<Props> = () => {
  const all_num = useAppSelector(s => s.sr.all_num);
  const repeat_num = useAppSelector(s => s.sr.repeat_num);
  const counter = useAppSelector(s => s.sr.counter);
  const loading = useAppSelector(s => s.main.loading);

  return (
    <div className={s.study_regime}>
      <div className={s.description}>
        <div className={s.title}>Study Regime</div>
        <ul className={s.info}>
          <li>
            <span>
              {loading ? <Skeleton width={25} /> : all_num} card
              {all_num > 1 || all_num < 1 ? "s" : ""}
            </span>{" "}
            in the regime.
          </li>
          <li>
            <InTime />
          </li>
        </ul>
      </div>

      <div className={s.repeat}>
        <p>
          Currently you have{" "}
          <span>
            {loading ? <Skeleton width={30} /> : repeat_num} card
            {repeat_num > 1 || repeat_num < 1 ? "s" : ""}
          </span>{" "}
          to repeat.
        </p>
        {!!repeat_num && (
          <>
            <p>Repeat with:</p>
            <div className={s.methods}>
              <SrCounter />
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
