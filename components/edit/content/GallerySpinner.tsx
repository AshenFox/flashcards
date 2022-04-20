import { FC } from 'react';

interface OwnProps {
  active: boolean;
}

type Props = OwnProps;

const GallerySpinner: FC<Props> = ({ active }) => {
  return (
    <div
      className={`edit__spinner-container ${
        active ? '' : 'edit__spinner-container--hide'
      }`}
    >
      <div className='spinner spinner--small'></div>
    </div>
  );
};

export default GallerySpinner;
