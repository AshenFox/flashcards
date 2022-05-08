import { ChangeEvent, FC, MouseEvent, useRef } from 'react';
import Error from './Error';
import LoadingButton from '../../main/LoadingButton';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const SignUp: FC<Props> = () => {
  const { change_modal, control_field, enter, check_field } = useActions();

  const {
    sign_up: { username, password, email },
    sign_up_errors: { username: userErr, password: passErr, email: emailErr, ok },
    loading,
  } = useAppSelector(({ modal }) => modal);

  const onClickChangeModal = (value: 'log_in') => (e: MouseEvent<HTMLButtonElement>) => {
    change_modal(value);
  };

  const onCLickLoadingButton =
    (value: 'sign_up') => (e: MouseEvent<HTMLButtonElement>) => {
      enter(value);
    };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    control_field('sign_up', name, value);

    // Timer control
    let timer = timers.current[name];

    if (timer) clearTimeout(timer);
    timers.current[name] = setTimeout(() => {
      check_field(name);
      timers.current[name] = null;
    }, 500);
  };

  const timers = useRef<{
    username: ReturnType<typeof setTimeout>;
    email: ReturnType<typeof setTimeout>;
    password: ReturnType<typeof setTimeout>;
  }>({
    username: null,
    email: null,
    password: null,
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
          username && userErr.ok && !timers.current.username ? 'border-green' : ''
        }`}
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
          password && passErr.ok && !timers.current.password ? 'border-green' : ''
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
        classStr={
          'btn width100 bcc-lightblue pad15-30 brr15 fz175 white h-grey h-bcc-yellow'
        }
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

export default SignUp;
