import { FC } from 'react';

interface OwnProps {
  loading: boolean;
}

type Props = OwnProps;

const ScrollLoading: FC<Props> = ({ loading }) => {
  return (
    <div
      className={`home__loading-container ${
        loading ? 'home__loading-container--active' : ''
      }`}
    >
      <div className='home__loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ScrollLoading;
