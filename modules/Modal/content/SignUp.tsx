import { ChangeEvent, MouseEvent, memo, useRef } from 'react';
import Error from './Error';
import LoadingBtn from '@ui/LoadingBtn';
import { useActions, useAppSelector } from '@store/hooks';
import TextLabel from '@ui/TextLabel';
import Input from '@ui/Input';
import clsx from 'clsx';

const SignUp = () => {
  const { change_modal, control_field, enter, check_field } = useActions();

  const username = useAppSelector(s => s.modal.sign_up.username);
  const password = useAppSelector(s => s.modal.sign_up.password);
  const email = useAppSelector(s => s.modal.sign_up.email);
  const userErr = useAppSelector(s => s.modal.sign_up_errors.username);
  const passErr = useAppSelector(s => s.modal.sign_up_errors.password);
  const emailErr = useAppSelector(s => s.modal.sign_up_errors.email);
  const ok = useAppSelector(s => s.modal.sign_up_errors.ok);
  const loading = useAppSelector(s => s.modal.loading);

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
      <TextLabel htmlFor='username'>USERNAME:</TextLabel>
      <Input
        name='username'
        type='text'
        className={clsx(
          'modal__input-signup',
          !!username && userErr.ok && !timers.current.username && 'success'
        )}
        id='username'
        placeholder='Enter a user name'
        value={username}
        onChange={onChange}
      />

      <Error errObj={emailErr} />
      <TextLabel htmlFor='email'>EMAIL:</TextLabel>
      <Input
        name='email'
        type='email'
        className={clsx(
          'modal__input-signup',
          !!email && emailErr.ok && !timers.current.email && 'success'
        )}
        id='email'
        placeholder='Enter an email'
        value={email}
        onChange={onChange}
      />

      <Error errObj={passErr} />
      <TextLabel htmlFor='password'>PASSWORD:</TextLabel>
      <Input
        name='password'
        type='password'
        className={clsx(
          'modal__input-signup',
          !!password && passErr.ok && !timers.current.password && 'success'
        )}
        id='password'
        placeholder='Enter a password'
        value={password}
        onChange={onChange}
      />

      <LoadingBtn
        active={ok}
        loading={loading}
        onClickHandler={onCLickLoadingButton('sign_up')}
        //helpers-delete
        classStr={'width100 bcc-lightblue pad15-30 brr15 fz175 white h-grey h-bcc-yellow'}
      >
        Sign up
      </LoadingBtn>

      <div className='modal__options'>
        <p>
          Already have an account?{' '}
          <button
            //helpers-delete
            className='white fz15 inline-block black h-yellow'
            onClick={onClickChangeModal('log_in')}
          >
            Log in!
          </button>
        </p>
      </div>
    </>
  );
};

export default memo(SignUp);
