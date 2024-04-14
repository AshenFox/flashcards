import { FC, MouseEvent, KeyboardEvent, ChangeEvent, useState } from 'react';
import Error from './Error';
import LoadingBtn from '@ui/LoadingBtn';
import { useActions, useAppSelector } from '@store/hooks';
import TextLabel from '@ui/TextLabel';

interface OwnProps {}

type Props = OwnProps;

const LogIn: FC<Props> = () => {
  const { change_modal, control_field, enter } = useActions();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    log_in: { username, password },
    log_in_errors: { username: userErr, password: passErr },
    loading,
  } = useAppSelector(({ modal }) => modal);

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
      <div
        //helpers-delete
        className='modal__input-container pad5 height4r br-bottom2 bcc-whiteblue brc-grey f-brc-yellow username'
      >
        <input
          name='username'
          type='text'
          //helpers-delete
          className='fz17'
          id='username'
          placeholder='Type your username'
          value={username}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <TextLabel htmlFor='username' className='modal__label'>
        USERNAME
      </TextLabel>

      {userErr.ok && <Error errObj={passErr} single={true} />}
      <div
        //helpers-delete
        className='modal__input-container pad5 height4r br-bottom2 bcc-whiteblue brc-grey f-brc-yellow password'
      >
        <input
          name='password'
          type={isPasswordVisible ? 'text' : 'password'}
          //helpers-delete
          className='fz17'
          id='password'
          placeholder='Type your password'
          value={password}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {isPasswordVisible ? (
          <svg onClick={onPasswordVisibleButton}>
            <use href={'../img/sprite.svg#icon__eye'}></use>
          </svg>
        ) : (
          <svg onClick={onPasswordVisibleButton}>
            <use href={'../img/sprite.svg#icon__eye-closed'}></use>
          </svg>
        )}
      </div>
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

export default LogIn;
