import type { CardDto } from "@flashcards/common";
import { useCardsUIStore, useScrapeDictionary } from "@zustand/cards";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { memo, MouseEvent, useCallback } from "react";

import s from "./styles.module.scss";

type ScrapeProps = {
  data: CardDto;
};

const Scrape = ({ data }: ScrapeProps) => {
  const scrapeDictionary = useScrapeDictionary();

  const { _id } = data || {};

  const loading = useCardsUIStore(s => s.get(_id).scrape.loading);

  const clickScrapeButton = useCallback(
    (value: "cod" | "urban") => (e: MouseEvent<HTMLDivElement>) => {
      scrapeDictionary(_id, value);
    },
    [_id, scrapeDictionary],
  );

  const cambridgeId = `scrape-cambridge-${_id}`;
  const urbanId = `scrape-urban-${_id}`;

  return (
    <div
      className={clsx(s.scrape, {
        [s.loading]: loading,
      })}
    >
      <div
        className={clsx(s.button, s.cod)}
        onClick={clickScrapeButton("cod")}
        data-tooltip-id={cambridgeId}
      >
        <div className={s.background}></div>
        <Tooltip id={cambridgeId}>
          Search in Cambridge Online Dictionary
        </Tooltip>
      </div>
      <div
        className={clsx(s.button, s.urban)}
        onClick={clickScrapeButton("urban")}
        data-tooltip-id={urbanId}
      >
        <div className={s.background}></div>
        <Tooltip id={urbanId}>Search in Urban Dictionary</Tooltip>
      </div>
    </div>
  );
};

export default memo(Scrape);
