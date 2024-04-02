import Home from '@modules/Home';
import ScrollTop from '@modules/ScrollTop';
import Push from '@modules/Push';
import { memo } from 'react';

const HomePage = () => {
  return (
    <>
      <Home />
      <ScrollTop />
      <Push />
    </>
  );
};

export default memo(HomePage);
