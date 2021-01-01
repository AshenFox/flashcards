import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate } from '../../store/actions/authActions';

const AuthWrapper = ({ auth, children, authenticate }) => {
  useEffect(() => {
    authenticate();
  }, []);

  return <>{children}</>;
};

AuthWrapper.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { authenticate })(AuthWrapper);
