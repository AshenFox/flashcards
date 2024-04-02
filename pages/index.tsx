import { memo } from 'react';
import Modal from '../components/modal/Modal';
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
