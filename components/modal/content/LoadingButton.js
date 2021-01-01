import PropTypes from 'prop-types';

const LoadingButton = ({ active, loading, children, onClickHandler }) => {
  const logError = () => {
    console.error('Button has been deactivated.');
  };

  return (
    <div
      className='loading-btn'
      data-loading={loading && active ? 'true' : 'false'}
    >
      <button
        className={`btn width100 bcc-lightblue pad15-30 brr5 fz175 white h-grey h-bcc-yellow ${
          !active ? 'inactive' : ''
        }`}
        onClick={active ? onClickHandler : logError}
      >
        <span>{children}</span>
      </button>
      <div className='loading-btn__spinner'></div>
    </div>
  );
};

LoadingButton.propTypes = {
  active: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default LoadingButton;
