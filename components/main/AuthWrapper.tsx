import { FC, ReactNode, useEffect } from 'react';
import { authenticate } from '../../store/actions/authActions';
import { set_is_server } from '../../store/actions/mainActions';
import { useAppDispatch } from '../../store/store';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const AuthWrapper: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(set_is_server());
    dispatch(authenticate());
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
