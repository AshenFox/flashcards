import { clsx } from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

type ErrorProps = {
  isError: boolean;
  error: Error | null;
};

const Error = ({ isError, error }: ErrorProps) => (
  <div className={clsx(s.error_container, !isError && s.hide)}>
    <span>{error?.message}</span>
  </div>
);

export default memo(Error);
