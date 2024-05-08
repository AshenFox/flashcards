import clsx from "clsx";
import { memo } from "react";

import s from "./styles.module.scss";

type SpinnerProps = {
  small?: boolean;
};

const Spinner = ({ small }: SpinnerProps) => (
  <div className={clsx(s.spinner, small && s.small)} />
);

export default memo(Spinner);
