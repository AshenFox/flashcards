import { MouseEvent } from 'react';
import { useActions } from '@store/hooks';
import { Card } from '@store/reducers/main/mainInitState';
import s from '../styles.module.scss';
import clsx from 'clsx';

type ScrapeProps = {
  data: Card;
};

const Scrape = ({ data }: ScrapeProps) => {
  const { scrape_dictionary } = useActions();
  const { _id, scrape } = data || {};

  const { loading } = scrape || {};

  const clickScrapeButton =
    (value: 'cod' | 'urban') => (e: MouseEvent<HTMLDivElement>) => {
      scrape_dictionary(_id, value);
    };

  return (
    <div className={s.scrape_panel} data-loading={loading}>
      <div className={clsx(s.scrape_button, s.cod)} onClick={clickScrapeButton('cod')}>
        <div className={s.scrape_background}></div>
        <span>Search in Cambridge Online Dictionary</span>
      </div>
      <div
        className={clsx(s.scrape_button, s.urban)}
        onClick={clickScrapeButton('urban')}
      >
        <div className={s.scrape_background}></div>
        <span>Search in Urban Dictionary</span>
      </div>
    </div>
  );
};

export default Scrape;
