import Header from '../../components/header/Header';
import Spinner from '../../components/main/Spinner';
import FlashcardsContainer from '../../components/flashcards/FlashcardsContainer';

export default function Flashcards() {
  return (
    <>
      <Header />
      <main>
        <FlashcardsContainer />
      </main>
      <Spinner />
    </>
  );
}
