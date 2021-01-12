import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  change_modal,
  control_field,
} from '../../../store/actions/modalActions';
import { enter } from '../../../store/actions/authActions';
import Error from './Error';
import LoadingButton from '../../main/LoadingButton';

const LogIn = ({ modal, change_modal, control_field, enter }) => {
  const {
    log_in: { username, password },
    log_in_errors: { username: userErr, password: passErr },
    loading,
  } = modal;

  const onClickChangeModal = (value) => (e) => {
    change_modal(value);
  };

  const onCLickLoadingButton = (value) => (e) => {
    enter(value);
  };

  const onChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    control_field('log_in', name, value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') enter('log_in');
  };

  return (
    <>
      <Error errObj={userErr} single={true} />
      <input
        name='username'
        type='text'
        className='input pad5 fz17 height4r br-bottom2 bcc-whiteblue brc-grey f-brc-yellow username'
        id='username'
        placeholder='Type your username'
        value={username}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <label htmlFor='username' className='label modal__label'>
        USERNAME
      </label>

      {userErr.ok && <Error errObj={passErr} single={true} />}
      <input
        name='password'
        type='password'
        className='input pad5 fz17 height4r br-bottom2 bcc-whiteblue brc-grey f-brc-yellow password'
        id='password'
        placeholder='Type your password'
        value={password}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <label htmlFor='password' className='label modal__label'>
        PASSWORD
      </label>

      <LoadingButton
        active={true}
        loading={loading}
        onClickHandler={onCLickLoadingButton('log_in')}
        classStr={
          'btn width100 bcc-lightblue pad15-30 brr15 fz175 white h-grey h-bcc-yellow'
        }
      >
        Log in
      </LoadingButton>

      <div className='modal__options'>
        <p>
          Don't have an account?{' '}
          <button
            className='btn white fz15 inline-block black h-yellow'
            onClick={onClickChangeModal('sign_up')}
          >
            Sign up!
          </button>
        </p>
      </div>
    </>
  );
};

LogIn.propTypes = {
  modal: PropTypes.object.isRequired,
  change_modal: PropTypes.func.isRequired,
  control_field: PropTypes.func.isRequired,
  enter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, {
  change_modal,
  control_field,
  enter,
})(LogIn);
