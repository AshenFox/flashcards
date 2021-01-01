import Header from '../components/header/Header';
import StartContainer from '../components/start/StartContainer';
import Modal from '../components/modal/Modal';
import Spinner from '../components/main/Spinner';

export default function Start() {
  return (
    <>
      <Header />
      <main>
        <StartContainer />
      </main>
      <Modal />
      <Spinner />
    </>
  );
}
