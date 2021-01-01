import Header from '../../components/header/Header';
import Spinner from '../../components/main/Spinner';
import HomeContainer from '../../components/home/HomeContainer';
import ScrollTop from '../../components/main/ScrollTop';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeContainer />
      </main>
      <Spinner />
      <ScrollTop />
    </>
  );
}
