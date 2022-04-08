import Spinner from '../../components/main/Spinner';
import HomeContainer from '../../components/home/HomeContainer';
import ScrollTop from '../../components/main/ScrollTop';

interface OwnProps {}

type Props = OwnProps;

const Home: React.FC<Props> = () => {
  return (
    <>
      <HomeContainer />
      <Spinner />
      <ScrollTop />
    </>
  );
};

export default Home;
