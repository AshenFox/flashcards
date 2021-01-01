import PropTypes from 'prop-types';
import GalleryControl from './GalleryControl';
import GalleryItem from './GalleryItem';

const GalleryContainer = ({ data, game = false }) => {
  const { _id, gallery } = data;
  const { imgurl_obj, position, width, loading, error } = gallery;

  const imgurl_arr = Object.values(imgurl_obj);

  const windowStyles = {
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
      <div
        className={`edit__gallery-window ${
          game ? 'edit__gallery-window--game' : ''
        }`}
      >
        <div
          className='edit__gallery'
          data-animated='false'
          style={windowStyles}
        >
          {imgurl_arr.map((item, i) => {
            return <GalleryItem key={i} index={i} data={item} _id={_id} />;
          })}
        </div>
      </div>
      <GalleryControl _id={_id} direction={'right'} />
    </div>
  );
};

GalleryContainer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GalleryContainer;
