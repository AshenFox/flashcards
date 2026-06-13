import { useAuthSession } from "@store/auth";
import Spinner from "@ui/Spinner";
import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

const AuthSpinner = () => {
  const { isPending } = useAuthSession();

  return (
    <div className={clsx(s.container, !isPending && s.hidden)}>
      <Spinner />
    </div>
  );
};

export default memo(AuthSpinner);
