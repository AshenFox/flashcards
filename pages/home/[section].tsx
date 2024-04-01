import Spinner from '../../components/main/Spinner';
import HomeContainer from '../../components/home/HomeContainer';
import ScrollTop from '../../components/main/ScrollTop';
import Push from '@modules/Push';
import { memo } from 'react';

const Home = () => {
  return (
    <>
      <HomeContainer />
      <Spinner />
      <ScrollTop />
      <Push />
    </>
  );
};

export default memo(Home);
