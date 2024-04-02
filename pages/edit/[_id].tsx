import Edit from '@modules/Edit';
import ScrollTop from '@modules/ScrollTop';
import { memo } from 'react';

const EditPage = () => {
  return (
    <>
      <Edit />
      <ScrollTop />
    </>
  );
};

export default memo(EditPage);
