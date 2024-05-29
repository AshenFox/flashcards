import { useAppSelector } from "@store/hooks";
import DateStr from "@ui/DateStr";
import { CloseIcon, TickIcon } from "@ui/Icons";
import Img from "@ui/Img";
import TextArea from "@ui/TextArea";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo } from "react";

import s from "./styles.module.scss";

type ResultItemProps = {
  data: {
    id: string;
    answer: false | "correct" | "incorrect";
  };
  number: number;
  showHeader?: boolean;
};

const ResultItem = ({ data, number, showHeader = true }: ResultItemProps) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const cards = useAppSelector(s => s.main.cards);

  const { term, defenition, imgurl, stage, nextRep, prevStage } =
    cards[data.id] ?? {};

  return (
    <div className={s.body_item}>
      {isSR && showHeader && (
        <div className={clsx(s.body_header, data.answer && s[data.answer])}>
          <p>SR Stage: {stage}</p>
          <p>
            Next repeat: <DateStr date={nextRep} />
          </p>
          <p>
            Drop stage: <DateStr date={prevStage} />
          </p>
        </div>
      )}

      <div className={s.body_main}>
        <div className={s.body_left}>
          <div className={clsx(s.icon, data.answer && s[data.answer])}>
            {data.answer === "correct" ? (
              <TickIcon width={20} />
            ) : (
              <CloseIcon width={20} />
            )}
          </div>
          <div className={clsx(s.term, data.answer && s[data.answer])}>
            <span>{number}.</span>
            <TextArea html={term} />
          </div>
        </div>

        <div className={s.body_right}>
          <div>
            <TextArea html={defenition} />
            <Img imgClass={s.img} url={imgurl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ResultItem);
