import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate } from '../../store/actions/authActions';
import { set_is_server } from '../../store/actions/mainActions';

const AuthWrapper = ({ children, authenticate, set_is_server }) => {
  useEffect(() => {
    set_is_server();
    authenticate();
  }, []);

  return <>{children}</>;
};

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  authenticate: PropTypes.func.isRequired,
  set_is_server: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { authenticate, set_is_server })(AuthWrapper);
