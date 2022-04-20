import { FC } from 'react';

interface OwnProps {
  active: boolean;
}

type Props = OwnProps;

const GalleryError: FC<Props> = ({ active }) => {
  return (
    <div
      className={`edit__error-container ${active ? '' : 'edit__error-container--hide'}`}
    >
      <span>The service is currently unavailable. Please try later...</span>
    </div>
  );
};

export default GalleryError;
