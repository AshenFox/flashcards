import PropTypes from 'prop-types';

const ScrollLoading = ({ loading }) => {
  return (
    <div
      className={`home__loading-container ${
        loading ? 'home__loading-container--active' : ''
      }`}
    >
      <div className='home__loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

ScrollLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ScrollLoading;
