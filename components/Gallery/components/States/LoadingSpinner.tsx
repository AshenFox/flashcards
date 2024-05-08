import Spinner from "@ui/Spinner";
import { clsx } from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

type SpinnerProps = {
  active: boolean;
};

const LoadingSpinner = ({ active }: SpinnerProps) => (
  <div className={clsx(s.spinner_container, !active && s.hide)}>
    <Spinner small />
  </div>
);

export default memo(LoadingSpinner);
