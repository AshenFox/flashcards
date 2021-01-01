import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Spinner = ({ auth }) => {
  const { loading } = auth;

  return (
    <div className={`spinner__container ${!loading ? 'hidden' : ''}`}>
      <div className='spinner'></div>
    </div>
  );
};

Spinner.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Spinner);
