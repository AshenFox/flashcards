import Spinner from '../../components/main/Spinner';
import FlashcardsContainer from '../../components/flashcards/FlashcardsContainer';

interface OwnProps {}

type Props = OwnProps;

const Flashcards: React.FC<Props> = () => {
  return (
    <>
      <FlashcardsContainer />
      <Spinner />
    </>
  );
};

export default Flashcards;
