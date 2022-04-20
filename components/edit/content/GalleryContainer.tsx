import { CSSProperties, FC } from 'react';
import { Card } from '../../../store/reducers/main/mainInitState';
import GalleryControl from './GalleryControl';
import GalleryItem from './GalleryItem';

interface OwnProps {
  data: Card;
  game: boolean;
}

type Props = OwnProps;

const GalleryContainer: FC<Props> = ({ data, game = false }) => {
  const { _id, gallery } = data;
  const { imgurl_obj, position, width, loading, error } = gallery;

  const imgurl_arr = Object.values(imgurl_obj);

  const windowStyles: CSSProperties = {
    width: `${width}rem`,
    transform: `translateX(${position}rem)`,
  };

  return (
    <div
      className={`edit__gallery-container ${
        loading || error ? 'edit__gallery-container--hide' : ''
      }`}
    >
      <GalleryControl _id={_id} direction={'left'} />
      <div className={`edit__gallery-window ${game ? 'edit__gallery-window--game' : ''}`}>
        <div className='edit__gallery' data-animated='false' style={windowStyles}>
          {imgurl_arr.map((item, i) => {
            return <GalleryItem key={i} index={`${i}`} data={item} _id={_id} />;
          })}
        </div>
      </div>
      <GalleryControl _id={_id} direction={'right'} />
    </div>
  );
};

export default GalleryContainer;
