import PropTypes from 'prop-types';

const GalleryError = ({ active }) => {
  return (
    <div
      className={`edit__error-container ${
        active ? '' : 'edit__error-container--hide'
      }`}
    >
      <span>The service is currently unavailable. Please try later...</span>
    </div>
  );
};

GalleryError.propTypes = { active: PropTypes.bool.isRequired };

export default GalleryError;
