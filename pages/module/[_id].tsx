import Modal from '@modules/Modal';
import Module from '@modules/Module';
import ScrollTop from '@modules/ScrollTop';
import { memo } from 'react';

const ModulePage = () => {
  return (
    <>
      <Module />
      <Modal />
      <ScrollTop />
    </>
  );
};

export default memo(ModulePage);
