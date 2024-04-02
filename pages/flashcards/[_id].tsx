import FlashcardsContainer from '../../components/flashcards/FlashcardsContainer';

interface OwnProps {}

type Props = OwnProps;

const Flashcards: React.FC<Props> = () => {
  return (
    <>
      <FlashcardsContainer />
    </>
  );
};

export default Flashcards;
