import { useActions } from "@store/hooks";
import { memo, ReactNode, useEffect } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { authenticate, set_is_server } = useActions();

  useEffect(() => {
    set_is_server();
    authenticate();
  }, []);

  return <>{children}</>;
};

export default memo(AuthWrapper);
