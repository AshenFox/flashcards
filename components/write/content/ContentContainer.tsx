import Question from './Question';
import Answer from './Answer';
import Round from './Round';
import Finish from './Finish';
import EditCard from '../../edit/content/EditCard';
import { useAppSelector } from '../../../store/store';
import { FC, ReactNode } from 'react';

interface OwnProps {}

type Props = OwnProps;

const ContentContainer: FC<Props> = () => {
  const {
    dimen: { header_height, game_controls_height },
    main: { cards, is_server, loading },
    game: {
      write: { is_init, remaining, answered, rounds },
    },
  } = useAppSelector((state) => state);

  const writeStyles = {
    height: `${
      !is_server
        ? document.documentElement.clientHeight -
          header_height -
          (document.documentElement.clientWidth < 991 ? game_controls_height : 0)
        : 0
    }px`,
  };

  const activeCard = remaining[remaining.length - 1];
  const isAnswered = activeCard ? !!activeCard.answer : false;
  const activeCardData = activeCard ? cards[activeCard.id] : null;

  const isRoundFinished = !remaining.length && is_init;
  const isGameFinished =
    !remaining.length &&
    !answered.filter((item) => item.answer === 'incorrect').length &&
    is_init;

  let components: ReactNode = null;

  if (isGameFinished) {
    components = <Finish />;
  } else if (isRoundFinished) {
    components = <Round />;
  } else if (activeCard) {
    if (isAnswered) {
      if (activeCardData.edit) {
        components = <EditCard key={activeCardData._id} toggle={true} game={true} />;
      } else {
        components = <Answer data={activeCardData} />;
      }
    } else {
      components = <Question data={activeCardData} />;
    }
  }

  return (
    <main
      className='game__content-container game__content-container--scrollable'
      style={writeStyles}
    >
      <div className='game__components game__components--scrollable'>
        {is_init && !loading ? components : <div className='game__loading-spinner' />}
      </div>
    </main>
  );
};

export default ContentContainer;
