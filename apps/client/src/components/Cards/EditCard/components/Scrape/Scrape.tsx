import type { CardDto } from "@flashcards/common";
import { Tooltip } from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent, useCallback } from "react";

import { useScrapeDictionary } from "../../../state/actions";
import s from "./styles.module.scss";

type ScrapeProps = {
  data: CardDto;
};

const Scrape = ({ data }: ScrapeProps) => {
  const { _id } = data;

  const { scrape, isPending } = useScrapeDictionary(_id);
  const loading = isPending;

  const clickScrapeButton = useCallback(
    (value: "cod" | "urban") => (_e: MouseEvent<HTMLDivElement>) => {
      scrape(value);
    },
    [scrape],
  );

  return (
    <div
      className={clsx(s.scrape, {
        [s.loading]: loading,
      })}
    >
      <Tooltip content="Search in Cambridge Online Dictionary">
        <div
          className={clsx(s.button, s.cod)}
          onClick={clickScrapeButton("cod")}
        >
          <div className={s.background}></div>
        </div>
      </Tooltip>
      <Tooltip content="Search in Urban Dictionary">
        <div
          className={clsx(s.button, s.urban)}
          onClick={clickScrapeButton("urban")}
        >
          <div className={s.background}></div>
        </div>
      </Tooltip>
    </div>
  );
};

export default memo(Scrape);
