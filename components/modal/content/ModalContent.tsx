import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';
import Delete from './Delete';
import LogIn from './LogIn';
import SignUp from './SignUp';

interface OwnProps {}

type Props = OwnProps;

const ModalContent: FC<Props> = () => {
  const { active_modal } = useAppSelector(({ modal }) => modal);

  return (
    <div className='modal__content'>
      {active_modal === 'log_in' && <LogIn />}
      {active_modal === 'sign_up' && <SignUp />}
      {active_modal === 'delete' && <Delete />}
    </div>
  );
};

export default ModalContent;
