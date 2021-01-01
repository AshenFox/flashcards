import { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  change_modal,
  control_field,
} from '../../../store/actions/modalActions';
import { enter, check_field } from '../../../store/actions/authActions';
import Error from './Error';
import LoadingButton from './LoadingButton';

const SignUp = ({ modal, change_modal, control_field, check_field, enter }) => {
  const {
    sign_up: { username, password, email },
    sign_up_errors: {
      username: userErr,
      password: passErr,
      email: emailErr,
      ok,
    },
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

    control_field('sign_up', name, value);

    // Timer control
    let timer = timers.current[name];
    if (timer) clearTimeout(timer);
    timers.current[name] = setTimeout(() => {
      check_field(name);
      timers.current[name] = false;
    }, 500);
  };

  const timers = useRef({
    username: false,
    email: false,
    password: false,
  });

  return (
    <>
      <Error errObj={userErr} />
      <label htmlFor='username' className='label'>
        USERNAME:
      </label>
      <input
        name='username'
        type='text'
        className={`pad20-15 fz17 height4r br2 bc-none brc-grey f-brc-yellow mar-bottom20 username ${
          username && userErr.ok && !timers.current.username
            ? 'border-green'
            : ''
        }`}
        /* border-green */
        id='username'
        placeholder='Enter a user name'
        value={username}
        onChange={onChange}
      />
      <Error errObj={emailErr} />
      <label htmlFor='email' className='label'>
        EMAIL:
      </label>
      <input
        name='email'
        type='email'
        className={`pad20-15 fz17 height4r br2 bc-none brc-grey f-brc-yellow mar-bottom20 email ${
          email && emailErr.ok && !timers.current.email ? 'border-green' : ''
        }`}
        id='email'
        placeholder='Enter an email'
        value={email}
        onChange={onChange}
      />
      <Error errObj={passErr} />
      <label htmlFor='password' className='label'>
        PASSWORD:
      </label>
      <input
        name='password'
        type='password'
        className={`pad20-15 fz17 height4r br2 bc-none brc-grey f-brc-yellow mar-bottom20 password ${
          password && passErr.ok && !timers.current.password
            ? 'border-green'
            : ''
        }`}
        id='password'
        placeholder='Enter a password'
        value={password}
        onChange={onChange}
      />

      <LoadingButton
        active={ok}
        loading={loading}
        onClickHandler={onCLickLoadingButton('sign_up')}
      >
        Sign up
      </LoadingButton>

      <div className='modal__options'>
        <p>
          Already have an account?{' '}
          <button
            className='btn white fz15 inline-block black h-yellow'
            onClick={onClickChangeModal('log_in')}
          >
            Log in!
          </button>
        </p>
      </div>
    </>
  );
};

SignUp.propTypes = {
  modal: PropTypes.object.isRequired,
  change_modal: PropTypes.func.isRequired,
  control_field: PropTypes.func.isRequired,
  check_field: PropTypes.func.isRequired,
  enter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, {
  change_modal,
  control_field,
  check_field,
  enter,
})(SignUp);
