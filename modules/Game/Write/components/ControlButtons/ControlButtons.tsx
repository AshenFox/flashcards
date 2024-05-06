import { ControlButtons as DefaultControlButtons } from '@modules/Game/components/Controls';
import React, { memo } from 'react';
import StartOver from './components/StartOver';
import { useRouter } from 'next/router';

const ControlButtons = () => {
  const router = useRouter();
  const _id = router.query._id;

  const isSR = _id === 'sr';

  return <DefaultControlButtons>{!isSR && <StartOver />}</DefaultControlButtons>;
};

export default memo(ControlButtons);
