import HomeContainer from '../../components/home/HomeContainer';
import ScrollTop from '@modules/ScrollTop';
import Push from '@modules/Push';
import { memo } from 'react';

const Home = () => {
  return (
    <>
      <HomeContainer />
      <ScrollTop />
      <Push />
    </>
  );
};

export default memo(Home);
