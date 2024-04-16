import { MouseEvent, KeyboardEvent, ChangeEvent, useState, memo } from 'react';
import Error from './Error';
import LoadingBtn from '@ui/LoadingBtn';
import { useActions, useAppSelector } from '@store/hooks';
import TextLabel from '@ui/TextLabel';
import Input from '@ui/Input';
import Svg from '@ui/Svg';

const LogIn = () => {
  const { change_modal, control_field, enter } = useActions();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const username = useAppSelector(s => s.modal.log_in.username);
  const password = useAppSelector(s => s.modal.log_in.password);
  const userErr = useAppSelector(s => s.modal.log_in_errors.username);
  const passErr = useAppSelector(s => s.modal.log_in_errors.password);
  const loading = useAppSelector(s => s.modal.loading);

  const onPasswordVisibleButton = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    setIsPasswordVisible(v => !v);
  };

  const onClickChangeModal = (value: 'sign_up') => (e: MouseEvent<HTMLButtonElement>) => {
    change_modal(value);
  };

  const onCLickLoadingButton =
    (value: 'log_in') => (e: MouseEvent<HTMLButtonElement>) => {
      enter(value);
    };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const target = e.target;
    const { value, name } = e.target;

    control_field('log_in', name, value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') enter('log_in');
  };

  return (
    <>
      <Error errObj={userErr} single={true} />
      <Input
        name='username'
        id='username'
        className='modal__input-login'
        placeholder='Type your username'
        value={username}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <TextLabel htmlFor='username' className='modal__label'>
        USERNAME
      </TextLabel>

      {userErr.ok && <Error errObj={passErr} single={true} />}
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        name='password'
        id='password'
        className='modal__input-login'
        placeholder='Type your password'
        value={password}
        onChange={onChange}
        onKeyDown={onKeyDown}
        after={
          <Svg
            onClick={onPasswordVisibleButton}
            icon={isPasswordVisible ? 'eye' : 'eye-closed'}
          />
        }
      />
      <TextLabel htmlFor='password' className='modal__label'>
        PASSWORD
      </TextLabel>

      <LoadingBtn
        active={true}
        loading={loading}
        onClickHandler={onCLickLoadingButton('log_in')}
        //helpers-delete
        classStr={'width100 bcc-lightblue pad15-30 brr15 fz175 white h-grey h-bcc-yellow'}
      >
        Log in
      </LoadingBtn>

      <div className='modal__options'>
        <p>
          Don&apos;t have an account?{' '}
          <button
            //helpers-delete
            className='white fz15 inline-block black h-yellow'
            onClick={onClickChangeModal('sign_up')}
          >
            Sign up!
          </button>
        </p>
      </div>
    </>
  );
};

export default memo(LogIn);
