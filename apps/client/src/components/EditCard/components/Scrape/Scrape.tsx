import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import Tooltip, { tooltipContainer } from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";

type ScrapeProps = {
  data: Card;
};

const Scrape = ({ data }: ScrapeProps) => {
  const { scrapeDictionary } = useActions();
  const { _id, scrape } = data || {};

  const { loading } = scrape || {};

  const clickScrapeButton = useCallback(
    (value: "cod" | "urban") => (e: MouseEvent<HTMLDivElement>) => {
      scrapeDictionary(_id, value);
    },
    [_id, scrapeDictionary],
  );

  return (
    <div
      className={clsx(s.scrape, {
        [s.loading]: loading,
      })}
    >
      <div
        className={clsx(s.button, s.cod, tooltipContainer)}
        onClick={clickScrapeButton("cod")}
      >
        <div className={s.background}></div>
        <Tooltip>Search in Cambridge Online Dictionary</Tooltip>
      </div>
      <div
        className={clsx(s.button, s.urban, tooltipContainer)}
        onClick={clickScrapeButton("urban")}
      >
        <div className={s.background}></div>
        <Tooltip>Search in Urban Dictionary</Tooltip>
      </div>
    </div>
  );
};

export default memo(Scrape);
