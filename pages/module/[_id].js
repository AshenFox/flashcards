import Header from '../../components/header/Header';
import Spinner from '../../components/main/Spinner';
import Modal from '../../components/modal/Modal';
import ModuleContainer from '../../components/module/ModuleContainer';
import ScrollTop from '../../components/main/ScrollTop';

export default function Module() {
  return (
    <>
      <Header />
      <main>
        <ModuleContainer />
      </main>
      <Spinner />
      <ScrollTop />
      <Modal />
    </>
  );
}
