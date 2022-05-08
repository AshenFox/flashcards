import { FC, ReactNode, useEffect } from 'react';
import { useActions } from '../../store/hooks';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const AuthWrapper: FC<Props> = ({ children }) => {
  const { authenticate, set_is_server } = useActions();

  useEffect(() => {
    set_is_server();
    authenticate();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
