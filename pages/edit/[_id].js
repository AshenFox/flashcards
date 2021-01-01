import Header from '../../components/header/Header';
import Spinner from '../../components/main/Spinner';
import EditContainer from '../../components/edit/EditContainer';
import ScrollTop from '../../components/main/ScrollTop';

export default function Edit() {
  return (
    <>
      <Header />
      <main>
        <EditContainer />
      </main>
      <Spinner />
      <ScrollTop />
    </>
  );
}
