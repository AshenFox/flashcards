import { CSSProperties, FC } from 'react';
import { useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const Progress: FC<Props> = () => {
  const {
    main: { cards },
    game: {
      flashcards: { progress },
    },
  } = useAppSelector((state) => state);

  const cards_arr = Object.keys(cards);

  const barFillStyle: CSSProperties = {
    width: `${(progress / cards_arr.length) * 100}%`,
  };

  return (
    <div className='game__progress'>
      <div className='game__progress-bar'>
        <div className='game__bar-fill' style={barFillStyle}></div>
      </div>
      <div className='game__progress-info'>
        <div className='game__progress-title'>
          <span>progress</span>
        </div>

        <div className='game__progress-count'>
          <span>{progress}</span>
          <span>{`/${cards_arr.length}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
