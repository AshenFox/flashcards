import { useAuthSession } from "@store/auth";
import { memo, ReactNode } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  // Kicks off the session bootstrap query so all child components can
  // subscribe to isPending / data via useAuthSession without triggering
  // a separate fetch. Children are rendered immediately; individual
  // components gate their UI on isPending as needed.
  useAuthSession();

  return <>{children}</>;
};

export default memo(AuthWrapper);
