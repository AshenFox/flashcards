import Header from '../../components/header/Header';
import Spinner from '../../components/main/Spinner';
import WriteContainer from '../../components/write/WriteContainer';

export default function Write() {
  return (
    <>
      <Header />
      <main>
        <WriteContainer />
      </main>
      <Spinner />
    </>
  );
}
