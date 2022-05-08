import { FC, MouseEvent } from 'react';
import { useActions } from '../../../store/hooks';
import { Card } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const Scrape: FC<Props> = ({ data }) => {
  const { scrape_dictionary } = useActions();
  const { _id, scrape } = data || {};

  const { loading } = scrape || {};

  const clickScrapeButton =
    (value: 'cod' | 'urban') => (e: MouseEvent<HTMLDivElement>) => {
      scrape_dictionary(_id, value);
    };

  return (
    <div className='edit__scrape-panel' data-loading={loading}>
      <div
        className='edit__scrape-button edit__scrape-button--cod'
        onClick={clickScrapeButton('cod')}
      >
        <div className='edit__scrape-background'></div>
        <span>Search in Cambridge Online Dictionary</span>
      </div>
      <div
        className='edit__scrape-button edit__scrape-button--urban'
        onClick={clickScrapeButton('urban')}
      >
        <div className='edit__scrape-background'></div>
        <span>Search in Urban Dictionary</span>
      </div>
    </div>
  );
};

export default Scrape;
