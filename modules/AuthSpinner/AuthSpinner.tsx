import { useAppSelector } from "@store/store";
import Spinner from "@ui/Spinner";
import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

const AuthSpinner = () => {
  const loading = useAppSelector((s) => s.auth.loading);

  return (
    <div className={clsx(s.container, !loading && "hidden")}>
      <Spinner />
    </div>
  );
};

export default memo(AuthSpinner);
