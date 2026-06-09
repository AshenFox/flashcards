import { memo } from "react";

import s from "./styles.module.scss";

type ErrorProps = {
  message?: string;
};

const Error = ({ message }: ErrorProps) => {
  if (!message) return null;

  return (
    <div>
      <ul className={s.errors}>
        <li>{message}</li>
      </ul>
    </div>
  );
};

export default memo(Error);
