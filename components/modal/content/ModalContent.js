import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Delete from './Delete';
import LogIn from './LogIn';
import SignUp from './SignUp';

const ModalContent = ({ modal }) => {
  const { active_modal } = modal;

  return (
    <div className='modal__content'>
      {active_modal === 'log_in' && <LogIn />}
      {active_modal === 'sign_up' && <SignUp />}
      {active_modal === 'delete' && <Delete />}
    </div>
  );
};

ModalContent.propTypes = {
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(ModalContent);
