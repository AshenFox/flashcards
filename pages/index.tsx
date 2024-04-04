import { memo } from 'react';
import Modal from '@modules/Modal';
import Start from '@modules/Start';

const StartPage = () => {
  return (
    <>
      <Start />
      <Modal />
    </>
  );
};

export default memo(StartPage);
