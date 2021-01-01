import PropTypes from 'prop-types';

const GallerySpinner = ({ active }) => {
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

GallerySpinner.propTypes = { active: PropTypes.bool.isRequired };

export default GallerySpinner;
