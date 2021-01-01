import PropTypes from 'prop-types';

const Error = ({ errObj, single }) => {
  const { ok, errors } = errObj;
  return (
    <div className='modal__username-error'>
      {!ok && (
        <ul className='modal__error-list'>
          {single ? (
            <li>{errors[0]}</li>
          ) : (
            errors.map((error, i) => <li key={i}>{error}</li>)
          )}
        </ul>
      )}
    </div>
  );
};

Error.propTypes = {
  errObj: PropTypes.object.isRequired,
  single: PropTypes.bool,
};

export default Error;
