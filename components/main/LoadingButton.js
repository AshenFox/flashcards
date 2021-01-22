import PropTypes from 'prop-types';

const LoadingButton = ({ active, loading, children, classStr, onClickHandler }) => {
  const logError = () => {
    console.error('Button has been deactivated.');
  };

  return (
    <div className='loading-btn' data-loading={loading && active ? 'true' : 'false'}>
      <button
        className={`${classStr} ${!active ? 'inactive' : ''}`}
        {...{
          onClick: active && onClickHandler ? onClickHandler : logError,
        }}
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
  classStr: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default LoadingButton;
