import { useActions } from "@store/hooks";
import { memo, ReactNode, useEffect } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { authenticate, setIsServer } = useActions();

  useEffect(() => {
    setIsServer();
    authenticate();
  }, []);

  return <>{children}</>;
};

export default memo(AuthWrapper);
